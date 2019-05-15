'use strict';


var flag = true;
// SQL car reservation before-hook
module.exports = function(Mcarreservation) {
  Mcarreservation.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Mcarreservation remote method: ' + ctx.method.name);
    next();
  });

  Mcarreservation.beforeRemote('create',
    function(ctx, model, next) {
      console.log('14');
      flag = true;
      doReservation(Mcarreservation, ctx, model, next, function(e) {
        flag = false;
        next(e);
      });
    });

    Mcarreservation.afterRemote('create',
    
    function(ctx, model, next) {
      console.log('25');
      Mcarreservation.app.models.quickCarReservation.create({mCarReservationId: model.id, carId: model.carId}).then((c) => (console.log('AAAAAAA' + c)));
      next();
    });
};

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
                            
                            console.log('100');
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
