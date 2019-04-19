'use strict';
var flag = true;
var flagUpdate = true;
module.exports = function(Car) {
  Car.beforeRemote('deleteById',
      function(ctx, model, next) {
        flag = true;
        doDelete(Car, ctx, model, next, function(e) {
          if (!flag) {
            flag = false;
            next(e);
          }
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
                  console.log(results);
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
          console.log(ctx.req.params.id);
          sqlCarReservation.find({
            where: {sCarId: car.id},
          }).then((data)=> {
            var cnt = data.length;
            console.log('Broj rezervacija na tom: ' + cnt);
            data.forEach((element) => {
              if (flag) {
                var end1 = element.endDate.getTime();
                console.log(end1);
                var today = new Date().getTime();
                console.log(today);
                if (end1 > today) {
                  tx.rollback(function(err) {
                    if (err && flag) errorCallback(err);

                    var error = new Error('Car has pending reservation' +
                      ' and cannot be deleted');
                    error.statusCode = error.status = 404;
                    if (flag) {
                      console.log('prijavljujem!');
                      flag = false;
                      errorCallback(error);
                    }
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
                    console.log('commiteddown');
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
