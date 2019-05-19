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


    function daLiSeUklapaRac(models, rac, startDate, endDate, cb){
      var cntUkupno;
      rac.cars.count({}).then((count) => {
        cntUkupno = count.count;
        return  rac.cars.find();
      })
      .then((cars) => {
        var okej = false;
        cars.forEach((car) => {
          models.mCarReservation.count({carId: car.id, startDate: {lte: endDate}, endDate: {gte: startDate}}).then((cnt) => {
              if(cnt == 0) {
                okej = true;
              }
          });
        })
      });
    }
    function obradiSledecuDestinaciju(destanation, startDate, endDate, name, country, obradjeno, result){
      var trazeniBroj = 10;
      destination.rACServices.find({include: 'cars'}).then((racservices) => {
        racservices.cars.find((cars) => {
          cars.forEach((car) => {
            // proveriti da li se uklapa
            // if uklapa
            result.push()
          });
        })
      })
    }
    
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
