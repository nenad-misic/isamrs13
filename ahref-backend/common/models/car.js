'use strict';
module.exports = function(Car) {
  Car.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Car remote method: ' + ctx.method.name);
    next();
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
