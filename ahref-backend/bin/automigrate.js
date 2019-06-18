var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;
/*
ds.automigrate('sRoom', function(err){
	app.models.Room.find(function(err,model2){
		model2.forEach(function(room){
			app.models.sRoom.create({mongoId: room.id}, function(err,a){
				if(err) throw err;
					console.log('Created: ',a);
			});
		});
	});
});*/
/*ds.automigrate('sRac', function(err){
	app.models.RACService.find(function(err,model2){
		model2.forEach(function(rac){
			app.models.sRac.create({mongoId: rac.id}, function(err,a){
				if(err) throw err;
					console.log('Created: ',a);
			});
		});
	});
});	*/

/*ds.automigrate('sFlight', function(err) {
	app.models.Flight.find(function(err, model2) {
		model2.forEach(function(flight){
			app.models.sFlight.create({mongoId: flight.id}, function(err, a){
				if(err) throw err;
				console.log('Created: ', a);
			})
		})
	})
})*/

ds.automigrate('sSeat', function(err) {
	app.models.Seat.find(function(err, model2) {
		model2.forEach(function(seat) {
			app.models.sSeat.create({mongoId: seat.id}, function(err, a){
				if(err) throw err;
				console.log('Created: ', a);
			})
		})
	})
})

ds.automigrate('sHotel', function(err) {
	app.models.Hotel.find(function(err, hotels){
		hotels.forEach(function(hotel) {
			app.models.sHotel.create({mongoId: hotel.id, version: 0}, function(err, a){
				if (err) throw err;
				console.log('Created: ', a);
			})
		})
	})
})
