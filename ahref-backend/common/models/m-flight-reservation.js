'use strict';

var flag = true;
module.exports = function(Mflightreservation) {
	
Mflightreservation.beforeRemote('create',
    function(ctx, model, next) {
      flag = true;
      doReservation(Mflightreservation, ctx, model, next, function(e) {
        flag = false;
        next(e);
	  
      });
	  
	  
		var Flight = Mflightreservation.app.models.Flight;
		var Seat = Mflightreservation.app.models.Seat;
		var User = Mflightreservation.app.models.LoggedUser;
		
		Flight.findOne({where: {id: ctx.req.body.flightId}}).then((flight)=>{
		Seat.findOne({where: {id: ctx.req.body.seatId}}).then((seat)=>{
			User.findOne({where: {id: ctx.req.body.userId}}).then((user)=>{
			
			Mflightreservation.app.models.Email.send({
			  to: user.email,
			  from: 'noreply@gmail.com',
			  subject: 'Rezervacija',
			  text: 'Test',
			  html: '<h1>Uspesna rezervacija karte leta '+ flight.id +' sa brojem sedista ' + seat.row+'/' + seat.column + '</h1>'
		  },function(err,res){
			  console.log('email sent!');
		  });
		  
		 }); 
	  });
	  });
	  
	  
    });

	
Mflightreservation.afterRemote('replaceById',
    function(ctx, model, next) {
		var Flight = Mflightreservation.app.models.Flight;
		var Seat = Mflightreservation.app.models.Seat;
		var User = Mflightreservation.app.models.LoggedUser;
		
		Flight.findOne({where: {id: ctx.req.body.flightId}}).then((flight)=>{
		Seat.findOne({where: {id: ctx.req.body.seatId}}).then((seat)=>{
			User.findOne({where: {id: ctx.req.body.userId}}).then((user)=>{
			
			Mflightreservation.app.models.Email.send({
			  to: user.email,
			  from: 'noreply@gmail.com',
			  subject: 'Rezervacija',
			  text: 'Test',
			  html: '<h1>Uspesna rezervacija karte leta '+ flight.id +' sa brojem sedista ' + seat.row+'/' + seat.column + '</h1>'
		  },function(err,res){
			  console.log('updated email sent!');
		  });
		  
		 }); 
	  });
	  });
		next();
	});
	
Mflightreservation.beforeRemote('deleteById',
      function(ctx, model, next) {
		  
        var FlightRes = Mflightreservation.app.models.FlightReservation;
		var Seat = Mflightreservation.app.models.sSeat;
		var mFlightRes = Mflightreservation.app.models.mFlightReservation;
		
		mFlightRes.findOne({where: {id: ctx.req.body.id}}).then((mflajt)=>{
			
				Seat.findOne({where: {mongoId: mflajt.seatId}}).then((seat)=>{
					console.log('Sediste ',seat);
					FlightRes.findOne({where: {sSeatId:seat.id}}).then((flajt)=>{
						
						FlightRes.deleteById(flajt.id);
						
					});
					
				});
		});
        next();
      });
	
};


function doReservation(Mflightreservation, ctx, model, next, errorCallback) {
  // models
  console.log(95)
  var sqlFlightReservation = Mflightreservation.app.models.FlightReservation;
  
  var sFlight = Mflightreservation.app.models.sFlight;
  var sSeat = Mflightreservation.app.models.sSeat;
  // data source
  var postgres = sFlight.app.dataSources.postgres;
  // begin transaction
  sqlFlightReservation.beginTransaction({
	  isolationLevel: sqlFlightReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
	  if (err) errorCallback(err);
    console.log(107)
	  postgres.connector.execute(
      'SELECT * FROM sflight WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.body.flightId], function(err, data) {
        console.log(111)
		sFlight.findOne({where: {mongoId: ctx.req.body.flightId}}).then((flight)=>{
      console.log(113)
		sSeat.findOne({where: {mongoId: ctx.req.body.seatId}}).then((seat)=>{
      console.log(115)
          console.log(seat);
          sqlFlightReservation.find({where: {sSeatId: seat.id}}).then((data)=> {
				
                if ((data.length > 0 || err) && flag) {
                tx.rollback(function(err) {
                  if (err && flag) errorCallback(err);
                });
                errorCallback(err);
              }
			  
              if (flag) {
				sFlight.find({where: {mongoId: ctx.req.body.flightId}}).then((flight)=>{
                sSeat.findOne({where: {mongoId: ctx.req.body.seatId}}).then((seat)=>{
                    // create reservation
                    sqlFlightReservation.create(
                      {
                        timeStamp: new Date(),
                        sSeat: seat,
						sFlight: flight,
                      },
                      {transaction: tx},
                      function(err, cr) {
                        if (err && flag) {
                          tx.rollback(function(err) {
                            if (err && flag)  errorCallback(err);
                          });
                          errorCallback(err);
                        }
                        // commit and end before-hook
                        if (flag) {
                          tx.commit(function(err) {
                            if (err && flag)  errorCallback(err);
                            next();
                          });
                        }
                      });
                  });
				  });
              }
            });
        });
			
		});
      });
  });
  
}
