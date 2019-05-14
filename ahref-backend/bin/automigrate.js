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

ds.automigrate('sFlight', function(err){
  if (err) throw err;

  app.models.Flight.find(function(err, model){
    if(err) throw err;
	var br = 0;
    model.forEach(function(flight){
      app.models.sFlight.create({mongoId: flight.id}, function(err, a){
		  
        if(err) throw err;
        console.log('Created: ', a);
		
		
		ds.automigrate('sSeat', function(err){
	
	
		app.models.Seat.find(function(err,model2){
			
			model2.forEach(function(seat){
			if(model.id == model2.flightId){
			app.models.sSeat.create({mongoId: seat.id, sFlightId: br}, function(err,a){
				
				if(err) throw err;
				console.log('Created: ',a);
			});
			}
			});
		
		
		});

		});
		
      });
	  br = br+1;
    });
	
	
		
		ds.automigrate('FlightReservation',function(err){
	
		var cr = [
			{
			  timeStamp: new Date(),
			  sseatid: 1,
			  sflightid: 1,
			},]
      
	  
		var count = cr.length;
			cr.forEach(function(r) {
				
			app.models.FlightReservation.create(r, function(err, model) {
			  if (err) throw err;

			  console.log('Created:', model);

			});
		  });
	  
		});
	


  });
});

