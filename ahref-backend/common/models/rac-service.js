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
