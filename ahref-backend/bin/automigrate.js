var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.postgres;

/*ds.automigrate('carreservation', function(err) {
	app.models.CarReservation.create({
		timeStamp:"2019-06-18 16:13:11.792+02",
		startDate: "2019-06-29 02:00:00+02",
		endDate: "2019-07-01 02:00:00+02",
		sCarId: 382
	}).then((suc)=>{
		console.log('sucr');
	})
})

ds.automigrate('roomreservation', function(err) {
	app.models.roomReservation.create({
		timeStamp:"2019-06-18 16:13:11.792+02",
		startDate: "2019-06-29 02:00:00+02",
		endDate: "2019-07-01 02:00:00+02",
		sRoomId: 59
	}).then((suc)=>{
		console.log('such');
	})
})
ds.automigrate('flightreservation', function(err) {
	app.models.FlightReservation.create({
		timeStamp:"2019-06-18 16:13:11.792+02",
		sSeatId: 638
	}).then((suc)=>{
		console.log('sucf');
	})
})
ds.automigrate('sRoom', function(err){
	app.models.Room.find(function(err,model2){
		model2.forEach(function(room){
			app.models.sRoom.create({mongoId: room.id}, function(err,a){
				if(err) throw err;
					console.log('Created: ',a);
			});
		});
	});
});
ds.automigrate('sRac', function(err){
	app.models.RACService.find(function(err,model2){
		model2.forEach(function(rac){
			app.models.sRac.create({mongoId: rac.id}, function(err,a){
				if(err) throw err;
					console.log('Created: ',a);
			});
		});
	});
});	

ds.automigrate('sCar', function(err){
	app.models.Car.find(function(err,model2){
		model2.forEach(function(car){
			app.models.sCar.create({mongoId: car.id}, function(err,a){
				if(err) throw err;
					console.log('Created: ',a);
			});
		});
	});
});	


ds.automigrate('sFlight', function(err) {
	app.models.Flight.find(function(err, model2) {
		model2.forEach(function(flight){
			app.models.sFlight.create({mongoId: flight.id}, function(err, a){
				if(err) throw err;
				console.log('Created: ', a);
			})
		})
	})
})

ds.automigrate('sSeat', function(err) {
	app.models.Seat.find(function(err, model2) {
		model2.forEach(function(seat) {
			app.models.sSeat.create({mongoId: seat.id}, function(err, a){
				if(err) throw err;
				console.log('Created: ', a);
			})
		})
	})
})*/


