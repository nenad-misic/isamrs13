'use strict';

var flag = true;
var flagUpdate = true;
module.exports = function(Racservice) {

  Racservice.afterRemote('*.__create__cars', function(ctx, modelInstance, next)  {
    console.log('Racservice remote method kuraaaaclipov: ' + ctx.method.name);
    var sqlCar = Racservice.app.models.sCar;
    console.log(modelInstance);
    sqlCar.create({mongoId: modelInstance.id}).then((succ => {
      console.log('grut');
      next();
    }));
  });

  Racservice.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Racservice remote method: ' + ctx.method.name);
    next();
  });

    
  Racservice.beforeRemote('create', (ctx, model, next) => {
    var luid = ctx.req.body.loggedUserId;
    Racservice.app.models.LoggedUser.findById(luid).then((user) => {
      if(user.type != 'racAdmin') {
        let e = new Error();
        e.status = "User is not rent a car service admin";
        e.statusCode = "305";
        next(e);
      } else if (user.rACServiceId) {
        let e = new Error();
        e.status = "User already has a rent a car service";
        e.statusCode = "305";
        next(e);
      } else {
        Racservice.app.models.RPriceList.create({}).then((rpr) => {
          ctx.req.body.rPriceListId = rpr.id;
          next();
        })
      }
    })
  });

  
  Racservice.afterRemote('create', (ctx, model, next) => {
    var luid = ctx.req.body.loggedUserId;
    var rid = model.id;
    Racservice.app.models.LoggedUser.findById(luid).then((obj) => {
      obj.rACServiceId = rid;
      Racservice.app.models.LoggedUser.upsert(obj).then((succ)=>{
        Racservice.app.models.sRac.create({mongoId: model.id}).then((succ)=>{
          next()
        })
      })
    })
  });
 

  Racservice.beforeRemote('*.__destroyById__cars',
    function(ctx, model, next) {
      flag = true;
      doDelete(Racservice, ctx, model, next, function(e) {
        flag = false;
        next(e);
      });
    });

  Racservice.beforeRemote('*.__updateById__cars',
    function(ctx, model, next) {
      flagUpdate = true;
      doUpdate(Racservice, ctx, model, next, function(e) {
        console.log('tusi')
        flagUpdate = false;
        next(e);
      });
    });

    Racservice.getMatching = function(startDate, endDate, name, country, skip, cb) {
      var results = [];
      var filter = {}
      var i = 0;

      brojac = 0
     
      var callbacked = false;
      if(name) {
        filter.name = name;
      }
      if(country){
        filter.country = counrty;
      }
      Racservice.app.models.Destination.find({where: filter, include: 'rACServices'}).then((destinations) => {
        destinations.forEach((destination) => {
          if(callbacked) return;
          destination.rACServices.find({include: 'cars'}).then((racservices) => {
            racservices.forEach((racservice) => {
              if(callbacked) return;
              racservice.cars.find().then( (cars) => {
                  
                console.log('findCars')
                cars.forEach((car) => {
                    
                  if(callbacked) return;
                  Racservice.app.models.mCarReservation.count({carId: car.id}).then((cnt1) => {
                    if(cnt1 == 0){
                      Racservice.app.models.mCarReservation.count({carId: car.id}).then((cnt2) => {
                        if(cnt2 == 0){
                          if (i == skip * 10 && !callbacked){
                            cb(null, results.slice((skip - 1)*10, skip*10 + 1));
                            callbacked = true;
                            return;
                          } else {
                            if(results.indexOf(racservice) == -1){
                              results.push(racservice);
                              i++;
                            }
                          }
                        }
                      });
                    }
                  })
                })
              })
            })
          })
        })
      })
    }


    Racservice.updateConcurentSafe = function(new_rac, cb) {
      //OPTIMISTIC VERSION
      var timeout = 10;
      var sqlRac = Racservice.app.models.sRac;
      sqlRac.beginTransaction({
        isolationLevel: sqlRac.Transaction.READ_COMMITTED,
      }, function(err, tx) {
        if (err) cb(null,{res:false});
        setTimeout(()=>{
          Racservice.findById(new_rac.id).then((rac_current_state)=>{
            if(rac_current_state.version == new_rac.version){
              new_rac.version++;
              Racservice.upsert(new_rac).then((rac)=>{
                tx.commit(function(err) {
                  if (err && flagCar)  cb(false);
                  else cb(null,{res:true});
                });
              }, (err)=>{
                tx.rollback(function(err) {
                  cb(null,{res:false});
                });
              });
            }else{
              cb(null,{res:false});
            }
          })
      },timeout);
      });      

      //PESIMISTIC VERSION
      /*
      var sqlRac = Racservice.app.models.sRac;
      var postgres = sqlRac.app.dataSources.postgres;
      sqlRac.beginTransaction({
        isolationLevel: sqlRac.Transaction.READ_COMMITTED,
      }, function(err, tx) {
        if (err) cb(null,{res:false});
        // lock rac for update
        postgres.connector.execute(
          'SELECT * FROM sRac WHERE mongoid = $1 FOR UPDATE;',
            [new_rac.id], {transaction: tx},
            function(err, data) {
              Racservice.upsert(new_rac).then((rac)=>{
                tx.commit(function(err) {
                  if (err && flagCar)  cb(false);
                  else cb(null,{res:true});
                });
              }, (err)=>{
                tx.rollback(function(err) {
                  cb(null,{res:false});
                });
              });
        });
      });   
      */   
    }

    Racservice.remoteMethod('getMatching', {
      accepts: [
        {arg: 'startDate', type: 'string', required: true},
        {arg: 'endDate', type: 'string', required: true},
        {arg: 'name', type: 'string', required: false},
        {arg: 'country', type: 'string', required: false},
        {arg: 'skip', type: 'number', required: true}
      ],
      http: {path: '/getMatching', verb: 'post'},
      returns: {type: 'object', arg: 'retval'},
    });

    Racservice.remoteMethod('updateConcurentSafe', {
      accepts: [
        {arg: 'new_rac', type: 'object', http: { source: 'body' }}
      ],
      http: {path: '/updateConcurentSafe', verb: 'post'},
      returns: {type: 'object', arg: 'retval'},
    });


};

function doDelete(Racservice, ctx, model, next, errorCallback) {
  // models
  var sqlCarReservation = Racservice.app.models.CarReservation;
  var sCar = Racservice.app.models.sCar;
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
      , [ctx.req.params.id], function(err, data) {
        sCar.findOne({where: {mongoId: ctx.req.params.fk}}).then((car)=>{
          sqlCarReservation.find({
            where: {sCarId: car.id},
          }).then((data)=> {
            var cnt = data.length;
            data.forEach((element) => {
              if (flag) {
                var end1 = element.endDate.getTime();
                var today = new Date().getTime();
                if (end1 > today) {
                  flag = false;
                  tx.rollback(function(err) {
                    if (err && flag) errorCallback(err);

                    var error = new Error('Car has pending reservation' +
                      ' and cannot be deleted');
                    error.statusCode = error.status = 404;
                    errorCallback(error);
                  });
                }
              }

              cnt--;
            });
            if (cnt === 0 && flag) {
              sCar.deleteById(car.id)
                .then((res) => {
                  tx.commit(function(err) {
                    if (err && flag)  errorCallback(err);
                    flag = false;
                    next();
                  });
                });
            }
          });
        });
      });
  });

  
}
function doUpdate(Racservice, ctx, model, next, errorCallbackUpdate) {
  // models
  var sqlCarReservation = Racservice.app.models.CarReservation;
  var sCar = Racservice.app.models.sCar;
  // data source
  var postgres = sCar.app.dataSources.postgres;
  // begin transaction
  sqlCarReservation.beginTransaction({
    isolationLevel: sqlCarReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
    if (err) errorCallbackUpdate(err);
    // lock car for update
    postgres.connector.execute(
      'SELECT * FROM sCar WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.params.id], function(err, data) {
        sCar.findOne({where: {mongoId: ctx.req.params.fk}}).then((car)=>{
          sqlCarReservation.find({
            where: {sCarId: car.id},
          }).then((data)=> {
            var cnt = data.length;
            data.forEach((element) => {
              if (flagUpdate) {
                var end1 = element.endDate.getTime();
                var today = new Date().getTime();
                if (end1 > today) {
                  flagUpdate = false;
                  tx.rollback(function(err) {
                    if (err && flagUpdate) errorCallbackUpdate(err);

                    var error = new Error('Car has pending reservation' +
                      ' and cannot be modified');
                    error.statusCode = error.status = 404;
                    errorCallbackUpdate(error);
                  });
                }
              }

              cnt--;
            });
            if (cnt === 0 && flagUpdate) {
              flagUpdate = false;
              next();
            }
          });
        });
      });
  });
}
