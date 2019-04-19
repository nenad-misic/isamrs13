'use strict';
var flag = true;
var flagUpdate = true;
module.exports = function(Car) {
  Car.beforeRemote('deleteById',
      function(ctx, model, next) {
        flag = true;
        doDelete(Car, ctx, model, next, function(e) {
          flag = false;
          next(e);
        });
      });

  Car.beforeRemote('replaceById',
    function(ctx, model, next) {
      console.log('dammnson');
      flagUpdate = true;
      doUpdate(Car, ctx, model, next, function(e) {
        console.log('tusi')
        flagUpdate = false;
        next(e);
      });
    });

  Car.getMatching = function(racid, startDate, endDate, startDestination, endDestination, numOfSeats, carType, cb) {
    var results = [];
    Car.app.models.RACService.findOne({where: {id: racid}, include: 'cars'})
      .then((rac) => {
        // check if rac has branch offices in start and end destination :)
        // not implemented yet
        var cars = rac.cars;
        cars.find().then((carz => {
          var len = carz.length;
          carz.forEach((car) => {
            var appendere = true;
            if ((car.carType.toLowerCase() === carType.toLowerCase()) && (car.numOfSeats >= numOfSeats)) {
              Car.app.models.mCarReservation.find({where: {carId: car.id}}).then((reservations) => {
                len--;
                reservations.forEach((reservation) => {
                  var start1 = reservation.startDate.getTime();
                  var end1 = reservation.endDate.getTime();
                  var start2 = new Date(startDate).getTime();
                  var end2 = new Date(endDate).getTime();
                  if ((start1 >= start2 && start1 <= end2) ||
                    (start2 >= start1 && start2 <= end1)) {
                    appendere = false;
                  }
                });
                if (appendere) {
                  results.push(car);
                }

                if (len === 0) {
                  cb(null, results);
                }
              });
            } else {
              len--;
            }
          });
        }));
      });
  };

  Car.remoteMethod('getMatching', {
    accepts: [
      {arg: 'racid', type: 'string', required: true},
      {arg: 'startDate', type: 'string', required: true},
      {arg: 'endDate', type: 'string', required: true},
      {arg: 'startDestination', type: 'string', required: true},
      {arg: 'endDestination', type: 'string', required: true},
      {arg: 'numOfSeats', type: 'string', required: true},
      {arg: 'carType', type: 'string', required: true},
    ],
    http: {path: '/getMatching', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });
};

function doDelete(Car, ctx, model, next, errorCallback) {
  // models
  var sqlCarReservation = Car.app.models.CarReservation;
  var sCar = Car.app.models.sCar;
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
        sCar.findOne({where: {mongoId: ctx.req.params.id}}).then((car)=>{
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
function doUpdate(Car, ctx, model, next, errorCallbackUpdate) {
  // models
  var sqlCarReservation = Car.app.models.CarReservation;
  var sCar = Car.app.models.sCar;
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
        sCar.findOne({where: {mongoId: ctx.req.params.id}}).then((car)=>{
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
