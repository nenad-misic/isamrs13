'use strict';

// SQL car reservation before-hook
module.exports = function(Mcarreservation) {
  Mcarreservation.beforeRemote('create', function(ctx, model, next) {
    // models
    var sqlCarReservation = Mcarreservation.app.models.CarReservation;
    var sCar = Mcarreservation.app.models.sCar;
    // data source
    var postgres = sCar.app.dataSources.postgres;
    // begin transaction
    sqlCarReservation.beginTransaction({
      isolationLevel: sqlCarReservation.Transaction.READ_COMMITTED,
    }, function(err, tx) {
      if (err) throw err;
      // lock car for update
      postgres.connector.execute(
        'SELECT * FROM sCar WHERE mongoId = $1 FOR UPDATE;'
        , [ctx.req.body.carId], function(err, data) {
          sCar.findOne({where: {mongoId: ctx.req.body.carId}}).then((car)=>{
            sqlCarReservation.find(
              {
                where: {scarid: car.id},
              }).then((data)=> {
                data.forEach((element) => {
                  var start1 = element.startDate.getTime();
                  var end1 = element.endDate.getTime();
                  var start2 =  ctx.req.body.startDate;
                  var end2 = ctx.req.body.endDate;
                  console.log((start1 > start2 && start1 < end2));
                  console.log((start2 > start1 && start2 < end1));
                  if ((start1 >=  start2 && start1 <= end2) ||
                    (start2 >= start1 && start2 <= end1)) {
                    tx.rollback(function(err) {
                      if (err) throw err;
                    });
                    throw 'Invalid date';
                  }
                });

                if (err) {
                  tx.rollback(function(err) {
                    if (err) throw err;
                  });
                  throw err;
                }
              // fetch car from sql
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
                      if (err) {
                        tx.rollback(function(err) {
                          if (err) throw err;
                        });
                        throw err;
                      }
                      // commit and end before-hook
                      tx.commit(function(err) {
                        if (err) throw err;
                        next();
                      });
                    });
                  });
              });
          });
        });
    });
  });
};
