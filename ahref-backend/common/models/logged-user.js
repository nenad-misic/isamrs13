'use strict';
var config = require('../../server/config.json');
var path = require('path');

var flagCar = true;
var flagRoom = true;

module.exports = function(Loggeduser) {
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

  Loggeduser.beforeRemote('*.__create__mRoomReservations', function(ctx,model,next) {
    console.log('here');
    flagRoom = true;
    var Mroomreservation = Loggeduser.app.models.MRoomReservation;
    calculateRoomPrice(Mroomreservation, ctx, model, next, doRoomReservation, function(e) {
      flagRoom = false;
      next(e);
    })
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
          var r = reservation;
          models.MRoomReservation.updateAll({id: r.id}, {loggedUserId: userId}).then(() => {
            models.QuickRoomReservation.deleteById(quickReservation.id).then(() => {
              cb();
            })
          })
        })
      })
    })
  }

function calculateRoomPrice(Mroomreservation, ctx, modelInstance, next, doNext , errorCallback) {
  var models = Mroomreservation.app.models;

  models.DatePrice.find({roodId: ctx.req.body.roomId}).then((prices) => {
    if (prices == null) {
      errorCallback(new Error("room has no defined price"));
    }
    prices = prices instanceof Array ? prices : [prices];
    var startPrice = prices[0];
    for (let price of prices) {
      if (price.startDate > ctx.req.body.startDate) continue;
      if (price.startDate > startPrice.startDate) startPrice = price;
    }
    var days = (ctx.req.body.endDate - ctx.req.body.startDate)/(24*60*60*1000);
    
    var aServices = ctx.req.body.aservices;
    var additionalPrice = 0;
    var totalDiscount = 0;

    for (let as of aServices) {
      additionalPrice += as.price;
      totalDiscount += as.discount;
    }

    startPrice.price += additionalPrice;
    startPrice.price *= (100 - totalDiscount)/100;

    models.Discount.find().then((discounts) => {
      console.log(discounts);
      if (discounts != null) {
        discounts = discounts instanceof Array ? discounts : [discounts];
      

        var currentDiscount = {
          points: 0,
          percentage: 0
        };
        
        console.log(modelInstance);
        console.log(discounts);

        for (let discount of discounts) {
          if (discount.points > modelInstance.points) continue;
          if (discount.points > currentDiscount.points) {
            currentDiscount = discount;
          }
        }
      
        startPrice.price *= (100 - currentDiscount.percentage)/100;

        console.log('Discount' + currentDiscount.percentage)
      }



      ctx.req.body.price = days * startPrice.price;
      doNext(Mroomreservation, ctx, modelInstance, next, errorCallback);
    })
  })
}
  
function doCarReservation(Mcarreservation, ctx, model, next, errorCallback) {
    // models
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
        'SELECT * FROM sCar WHERE mongoId = $1 FOR UPDATE;'
        , [ctx.req.body.carId], function(err, data) {
          sCar.findOne({where: {mongoId: ctx.req.body.carId}}).then((car)=>{
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
                          if (err && flagCar) {
                            tx.rollback(function(err) {
                              if (err && flagCar)  errorCallback(err);
                            });
                            errorCallback(err);
                          }
                          // commit and end before-hook
                          if (flagCar) {
                            tx.commit(function(err) {
                              if (err && flagCar)  errorCallback(err);
                              next();
                            });
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
                                sqlRoomReservation.create(
                                  {
                                    timeStamp: ctx.req.body.timeStamp,
                                    sRoom: room,
                                    startDate: ctx.req.body.startDate,
                                    endDate: ctx.req.body.endDate,
                                  },
                                  {transaction: tx},
                                  function(err, rr) {
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
                to: ctx.result.email,
                from: 'noreply@ahref.com',
                subject: 'Thanks for registering on ahref.',
                template: path.resolve(__dirname, '../../server/views/verify.ejs'),
                redirect: 'http://localhost:4200',
                user: ctx.result
              };

              ctx.result.verify(options, function(err, response, next) {
                if (err)  {
                    return next(err);
                }

                console.log('> verification email sent:', response);
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
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
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
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
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
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
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
                        });
                    })
                } else {
                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: ctx.result.id
                    }, (err, principal) => {
                        if (err) throw(err);
                    });
                }
            })

        }


        next();
    });
}






