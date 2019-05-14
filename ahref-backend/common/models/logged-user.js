'use strict';
var config = require('../../server/config.json');
var path = require('path');

var flag = true;

module.exports = function(Loggeduser) {
  Loggeduser.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Loggeduser remote method: ' + ctx.method.name);
    next();
  });

  Loggeduser.beforeRemote('*.__create__mCarReservations', function(ctx,model,next) {
    console.log('here');
    flag = true;
    var Mcarreservation = Loggeduser.app.models.MCarReservation;
    doReservation(Mcarreservation, ctx, model, next, function(e) {
      flag = false;
      next(e);
    });
  });

  
function doReservation(Mcarreservation, ctx, model, next, errorCallback) {
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
                  if (flag) {
                    var start1 = element.startDate.getTime();
                    var end1 = element.endDate.getTime();
                    var start2 = ctx.req.body.startDate;
                    var end2 = ctx.req.body.endDate;
                    if ((start1 >= start2 && start1 <= end2) ||
                      (start2 >= start1 && start2 <= end1)) {
                      tx.rollback(function(err) {
                        if (err && flag) errorCallback(err);
  
                        var error = new Error('Car is already reserved');
                        error.statusCode = error.status = 404;
                        if (flag)
                          errorCallback(error);
                      });
                    }
                  }
                });
  
                if (err && flag) {
                  tx.rollback(function(err) {
                    if (err && flag) errorCallback(err);
                  });
                  errorCallback(err);
                }
                // fetch car from sql
                if (flag) {
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
                          if (err && flag) {
                            tx.rollback(function(err) {
                              if (err && flag)  errorCallback(err);
                            });
                            errorCallback(err);
                          }
                          // commit and end before-hook
                          if (flag) {
                            tx.commit(function(err) {
                              if (err && flag)  errorCallback(err);
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
                if (err) return next(err);

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






