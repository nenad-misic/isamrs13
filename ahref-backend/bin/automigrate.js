var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;


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

