'use strict';
var config = require('../../server/config.json');
var path = require('path');

var flagCar = true;
var flagCarDelete = true;
var flagRoomDelete = true;
var flagFlightDelete = true;
var flagRoom = true;


module.exports = function(Loggeduser) {

  Loggeduser.bindQuick = function(luid, qrid, mcrid, cb) {
    Loggeduser.findById(luid).then((user) => {
      Loggeduser.app.models.quickCarReservation.findById(qrid).then((qr) => {
        Loggeduser.app.models.MCarReservation.findById(mcrid).then((mr) => {
          var mrc = mr;
          Loggeduser.app.models.quickCarReservation.deleteById(qrid).then((del) => {
            Loggeduser.app.models.MCarReservation.updateAll({id: mcrid}, {loggedUserId: luid}).then(() => {
              cb(null, true);
            });
          })
        })
      })
    });
  };
  
  Loggeduser.remoteMethod('bindQuick', {
    accepts: [
      {arg: 'luid', type: 'string', required: true},
      {arg: 'qrid', type: 'string', required: true},
      {arg: 'mcrid', type: 'string', required: true},
    ],
    http: {path: '/bindQuick', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });


  Loggeduser.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Loggeduser remote method: ' + ctx.method.name);
    next();
  });

  Loggeduser.beforeRemote('*.__create__mCarReservations', function(ctx,model,next) {
    console.log('here');
    flagCar = true;
    var Mcarreservation = Loggeduser.app.models.MCarReservation;
    doCarReservation(Mcarreservation, ctx, model, next, function(e) {
      flagCar = false;
      next(e);
    });
  });

  Loggeduser.beforeRemote('*.__destroyById__mCarReservations', function(ctx,model,next) {
    flagCarDelete = true;
    var Mcarreservation = Loggeduser.app.models.MCarReservation;
    undoCarReservation(Mcarreservation, ctx, model, next, function(e) {
      flagCarDelete = false;
      next(e);
    })
    
  });


  function undoCarReservation(Mcarreservation, ctx, model, next, errorCallback) {
    var sqlCarReservation = Mcarreservation.app.models.CarReservation;
    Mcarreservation.findById(ctx.req.params.fk).then((obj) => {
      console.log(obj);
      if(obj){
        sqlCarReservation.deleteById(obj.sid);
        next();
      }
    })
  }

  Loggeduser.beforeRemote('*.__destroyById__mRoomReservations', function(ctx,model,next) {
    flagRoomDelete = true;
    var Mroomreservation = Loggeduser.app.models.MRoomReservation;
    undoRoomReservation(Mroomreservation, ctx, model, next, function(e) {
      flagRoomDelete = false;
      next(e);
    })
    
  });


  function undoRoomReservation(Mroomreservation, ctx, model, next, errorCallback) {
    var sqlRoomReservation = Mroomreservation.app.models.RoomReservation;
    Mroomreservation.findById(ctx.req.params.fk).then((obj) => {
      if(obj){
        sqlRoomReservation.deleteById(obj.sid);
        next();
      }
    })
  }


  Loggeduser.beforeRemote('*.__destroyById__mFlightReservations', function(ctx,model,next) {
    flagFlightDelete = true;
    var Mflightreservation = Loggeduser.app.models.MFlightReservation;
    undoFlightReservation(Mflightreservation, ctx, model, next, function(e) {
      flagFlightDelete = false;
      next(e);
    })
    
  });


  function undoFlightReservation(Mflightreservation, ctx, model, next, errorCallback) {
    var sqlFlightReservation = Mflightreservation.app.models.FlightReservation;
    Mflightreservation.findById(ctx.req.params.fk).then((obj) => {
      if(obj){
        sqlFlightReservation.deleteById(obj.sid);
        next();
      }
    })
  }

  Loggeduser.beforeRemote('*.__create__mRoomReservations', function(ctx,model,next) {
    console.log('here in mroom');
    flagRoom = true;
    var Mroomreservation = Loggeduser.app.models.MRoomReservation;
    doRoomReservation(Mroomreservation, ctx, model, next, function(e) {
      flagRoom = false;
      next(e);
    });
  });

  Loggeduser.remoteMethod('createQuickRoomReservation', {
    accepts: [
      {arg: 'userId', type: 'string', required: true},
      {arg: 'quickRoomReservationId', type:  'string', required: true}
    ],
    http: {path: '/quickReservation', verb: 'post'},
    returns: {type: 'object', arg: 'mRoomReservation'},
  })

  Loggeduser.createQuickRoomReservation = function(userId, quickRoomReservationId, cb) {
    var models = Loggeduser.app.models;

    Loggeduser.findOne({id: userId}).then((user) => {
      models.QuickRoomReservation.findOne({id: quickRoomReservationId}).then((quickReservation) => {
        models.MRoomReservation.findOne({id: quickReservation.mRoomReservationId}).then((reservation) => {
          var r = reservation;models.MRoomReservation.updateAll({id: r.id}, {loggedUserId: userId}).then(() => {
            models.QuickRoomReservation.deleteById(quickReservation.id).then(() => {
              cb();
            })
          })
        })
      })
    })
  }

  
function doCarReservation(Mcarreservation, ctx, model, next, errorCallback) {
    // models
    var num = 24000;
    
    if(ctx.req.body.startDate != 1559865600000){
      num = 10;
      console.log('brao');
    }

    var sqlCarReservation = Mcarreservation.app.models.CarReservation;
    var sCar = Mcarreservation.app.models.sCar;
    // data source
    var postgres = sCar.app.dataSources.postgres;
    // begin transaction
    sqlCarReservation.beginTransaction({
      isolationLevel: sqlCarReservation.Transaction.READ_COMMITTED,
    }, function(err, tx) {
      if (err) errorCallback(err);
      // lock car for update
      postgres.connector.execute(
        'SELECT * FROM sCar WHERE mongoid = $1 FOR UPDATE;',
          [ctx.req.body.carId], {transaction: tx},
          function(err, data) {
            console.log("data");
            console.log(data);
            sCar.findOne({where: {mongoId: ctx.req.body.carId}}).then(
              (car)=>{
              sqlCarReservation.find(
                {
                  where: {sCarId: car.id},
                }).then((data)=> {
                  data.forEach((element) => {
                    if (flagCar) {
                      var start1 = element.startDate.getTime();
                      var end1 = element.endDate.getTime();
                      var start2 = ctx.req.body.startDate;
                      var end2 = ctx.req.body.endDate;
                      if ((start1 >= start2 && start1 <= end2) ||
                        (start2 >= start1 && start2 <= end1)) {
                        tx.rollback(function(err) {
                          if (err && flagCar) errorCallback(err);
    
                          var error = new Error('Car is already reserved');
                          error.statusCode = error.status = 404;
                          if (flagCar)
                            errorCallback(error);
                        });
                      }
                    }
                  });
    
                  if (err && flagCar) {
                    tx.rollback(function(err) {
                      if (err && flagCar) errorCallback(err);
                    });
                    errorCallback(err);
                  }
                  // fetch car from sql
                  if (flagCar) {
                    sCar.findOne({where: {mongoId: ctx.req.body.carId}})
                      .then((car)=>{
                        Mcarreservation.app.models.LoggedUser.findById(ctx.req.params.id).then((obj) =>
                                  {
                                    obj.points = obj.points + 1;
                                    Mcarreservation.app.models.LoggedUser.replaceById(obj.id, obj).then((o) => console.log('o'));
                                  })
                        // create reservation
                        sqlCarReservation.create(
                          {
                            timeStamp: ctx.req.body.timeStamp,
                            sCar: car,
                            startDate: ctx.req.body.startDate,
                            endDate: ctx.req.body.endDate,
                          },
                          {transaction: tx},
                          function(err, cr) {
                            ctx.req.body.sid = cr.id;
                            if (err && flagCar) {
                              tx.rollback(function(err) {
                                if (err && flagCar)  errorCallback(err);
                              });
                              errorCallback(err);
                            }
                            // commit and end before-hook
                            if (flagCar) {
                              setTimeout(()=>{
                                tx.commit(function(err) {
                                if (err && flagCar)  errorCallback(err);
                                
                                calculateCarPrice(Loggeduser, ctx, next)
                              });
                              }, num)
                              
                            }
                          });
                      });
                  }
                });
            });
          });
        });
    }


  function doRoomReservation(Mroomreservation, ctx, model, next, errorCallback) {
    // models
    var sqlRoomReservation = Mroomreservation.app.models.RoomReservation;
    var sRoom = Mroomreservation.app.models.sRoom;
    // data source
    var postgres = sRoom.app.dataSources.postgres;
    // begin transaction
    sqlRoomReservation.beginTransaction({
        isolationLevel: sqlRoomReservation.Transaction.READ_COMMITTED,
    }, function(err, tx) {
        if (err) errorCallback(err);
        // lock room for update
        postgres.connector.execute(
            'SELECT * FROM sRoom WHERE mongoId = $1 FOR UPDATE;',
            [ctx.req.body.roomId], function(err, data) {
                sRoom.findOne({where: {mongoId: ctx.req.body.roomId}}).then((room) => {
                    sqlRoomReservation.find({where: {sRoomId: room.id}}).then((data) => {
                        var foundOne = false;
                        data.forEach((element) => {
                            if (flagRoom) {
                                // check if room is available during time period
                                var start1 = element.startDate.getTime();
                                var end1 = element.endDate.getTime();
                                var start2 = new Date(ctx.req.body.startDate).getTime();
                                var end2 = new Date(ctx.req.body.endDate).getTime();
                                if ((start1 >= start2 && start1 <= end2) ||
                                    (start2 >= start1 && start2 <= end1)) {
                                    foundOne = true;
                                }
                            }
                        })
                        if (foundOne) {
                            tx.rollback(function(err) {
                                if (err && flagRoom) errorCallback(err);

                                var error = new Error('Room is not available');
                                error.statusCode = error.status = 404;
                                if (flagRoom) errorCallback(error);
                            });
                        }

                        if (err && flagRoom) {
                            tx.rollback(function(err) {
                              if (err && flagRoom) errorCallback(err);
                            });
                            errorCallback(err);
                        }

                        if (flagRoom) {
                            sRoom.findOne({where: {mongoId: ctx.req.body.roomId}}).then((room)=>{
                                // create reservation
                                Mroomreservation.app.models.LoggedUser.findById(ctx.req.params.id).then((obj) =>
                                {
                                  obj.points = obj.points + 1;
                                  Mroomreservation.app.models.LoggedUser.replaceById(obj.id, obj).then((o) => console.log(o));
                                })
                                sqlRoomReservation.create(
                                  {
                                    timeStamp: ctx.req.body.timeStamp,
                                    sRoom: room,
                                    startDate: ctx.req.body.startDate,
                                    endDate: ctx.req.body.endDate,
                                  },
                                  {transaction: tx},
                                  function(err, rr) {
                                    
                                    ctx.req.body.sid = rr.id;
                                    if (err && flagRoom) {
                                      tx.rollback(function(err) {
                                        if (err && flagRoom)  errorCallback(err);
                                      });
                                      errorCallback(err);
                                    }
                                    // commit and end before-hook
                                    if (flagRoom) {
                                      tx.commit(function(err) {
                                        if (err && flagRoom)  errorCallback(err);
                                        next();
                                      });
                                    }
                                  });
                              });
                          }

                    })
                })
            }
        )
    })
}

  
    Loggeduser.afterRemote('create', function(ctx, modelInstance, next) {
        var Role = Loggeduser.app.models.Role;
        var RoleMapping = Loggeduser.app.models.RoleMapping;
        if(ctx.result.type === "regUser"){
            Role.findOne({where: {name: 'regUser'}}, (err, role) => {
                if(!role){
                    Role.create({
                        name: 'regUser'
                    }, (err,role) => {
                        if (err) throw(err);
                        console.log("New Role: ", role);
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.result.id
                        }, (err, principal) => {
                            if (err) throw(err);
                        });
                    })
                }else{
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                    });
                }
            })
            var options = {
                type: 'email',
                to: modelInstance.email,
                from: 'ahref.noreply@gmail.com',
                subject: 'Thanks for registering on ahref.',
                template: path.resolve(__dirname, '../../server/views/verify.ejs'),
                redirect: 'http://localhost:4200',
                user: modelInstance
              };

              modelInstance.verify(options, function(err, response) {
                if (err)  {
                    return next(err);
                }

                console.log('> verification email sent:', response);
                next()
              });

        } else if (ctx.result.type === "hotelAdmin") {
            Role.findOne({where: {name: "hotelAdmin"}}, (err, role) => {
                if (!role) {
                    Role.create({name: "hotelAdmin"}, (err, role) => {
                        if (err) throw(err);
                        console.log("New Role: ", role);
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.result.id
                        }, (err, principal) => {
                            if (err) throw(err);
                            next()
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                        next()
                    });
                }
            })
        } else if (ctx.result.type === "racAdmin") {
            Role.findOne({where: {name: "racAdmin"}}, (err, role) => {
                if (!role) {
                    Role.create({name: "racAdmin"}, (err, role) => {
                        if (err) throw(err);
                        console.log("New Role: ", role);
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.result.id
                        }, (err, principal) => {
                            if (err) throw(err);
                            next()
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                        next()
                    });
                }
            })

        } else if (ctx.result.type === "airlineAdmin") {
            Role.findOne({where: {name: "airlineAdmin"}}, (err, role) => {
                if (!role) {
                    Role.create({name: "airlineAdmin"}, (err, role) => {
                        if (err) throw(err);
                        console.log("New Role: ", role);
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.result.id
                        }, (err, principal) => {
                            if (err) throw(err);
                            next()
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                        next()
                    });
                }
            })

        } else if (ctx.result.type === "sysAdmin") {
            Role.findOne({where: {name: "sysAdmin"}}, (err, role) => {
                if (!role) {
                    Role.create({name: "sysAdmin"}, (err, role) => {
                        if (err) throw(err);
                        console.log("New Role: ", role);
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: ctx.result.id
                        }, (err, principal) => {
                            if (err) throw(err);
                            next()
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                        next()
                    });
                }
            })

        }
    });
}

function calculateCarPrice(Loggeduser, ctx, callback) {
  var models = Loggeduser.app.models;
  var start = ctx.req.body.startDate;
  var end = ctx.req.body.endDate;
  var days = (end - start)/(24*60*60*1000)

  models.Car.findOne({where: {id: ctx.req.body.carId}}).then((car) => {
    //console.log(car);
    models.RACService.findOne({where: {id: car.rACServiceId}}).then((racService) => {
      //console.log(racService);
      models.RPriceList.findOne({where: {rACServiceId: racService.id}}).then((priceList) => {
        models.RPriceListItem.find({where: {rPriceListId: priceList.id}}).then((items) => {
          if (items == []) {
            var error = new Error('Car has no price defined');
            error.statusCode = error.status = 404;
            callback(error);
          }
          items.forEach((item) => {
            console.log(item);
            console.log(car);
            if (item.price != 0) {
              if (item.carType === car.carType) {
                ctx.req.body.price = item.price * days;
                callback();
              }
            }
          })
        })
      })
    })
  })
}




