var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;
ds.automigrate('sCar', function(err){
  if (err) throw err;

  app.models.Car.find(function(err, model){
    if(err) throw err;

    model.forEach(function(car){
      app.models.sCar.create({mongoId: car.id}, function(err, a){
        if(err) throw err;
        console.log('Created: ', a);
      })
    });

    ds.automigrate('CarReservation', function(err) {
      if (err) throw err;

      var cr = [
        {
          timeStamp: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          scarid: 1,
        },
      ];
      var count = cr.length;
      cr.forEach(function(r) {
        app.models.CarReservation.create(r, function(err, model) {
          if (err) throw err;

          console.log('Created:', model);

        });
      });


    });


  });
})
ds.automigrate('sRoom', function(err){
  if (err) throw err;

  app.models.Room.find(function(err, model) {
    if(err) throw err;
    
    model.forEach(function(room) {
      app.models.sRoom.create({mongoId: room.id}, function(err, a){
        if(err) throw err;
        console.log('Created: ', a);
      })
    });

    ds.automigrate('roomReservation', function(err) {
      if(err) throw err;
      
      var rr = [
        {
          timeStamp: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          sroomid: 1,
        },
      ];
      
      rr.forEach(function(r) {
        app.models.RoomReservation.create(r, function(err, model) {
          if (err) throw err;

          console.log('Created: ', model);
        });
      });
    });
  });
})
