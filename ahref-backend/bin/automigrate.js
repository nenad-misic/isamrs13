var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;

ds.automigrate('sSeat', function(err){
	app.models.Seat.find(function(err,model2){
		
		model2.forEach(function(seat){
			app.models.sFlight.find({where: {mongoId: seat.flightId}}).then((fli => {

				app.models.sSeat.create({mongoId: seat.id, sFlightId: fli[0].id}, function(err,a){
			
					if(err) throw err;
					console.log('Created: ',a);
				});
			}))
		});
	
	
	});

	});



