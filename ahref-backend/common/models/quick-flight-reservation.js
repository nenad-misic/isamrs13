'use strict';
var flag = true;

module.exports = function(Quickflightreservation) {
	
	Quickflightreservation.afterRemote('**', function(ctx, model, next)  {
    console.log('Quickflightreservation remote method: ' + ctx.method.name);
    next();
  });
  
  Quickflightreservation.afterRemote('*.__create__mFlightReservations', function(ctx, model, next) {
		
    flag = true;
      doReservation(Quickflightreservation, ctx, model, next, function(e) {
        flag = false;
        next(e);
	  
      });
   
  });
};


function doReservation(Quickflightreservation, ctx, model, next, errorCallback) {
  // models
  var sqlFlightReservation = Quickflightreservation.app.models.FlightReservation;
  
  var sFlight = Quickflightreservation.app.models.sFlight;
  var sSeat = Quickflightreservation.app.models.sSeat;
  // data source
  var postgres = sFlight.app.dataSources.postgres;
  // begin transaction
  sqlFlightReservation.beginTransaction({
	  isolationLevel: sqlFlightReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
	  if (err) errorCallback(err);
	  postgres.connector.execute(
      'SELECT * FROM sFlight WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.body.flightId], function(err, data) {
		sFlight.findOne({where: {mongoId: ctx.req.body.flightId}}).then((flight)=>{
		sSeat.findOne({where: {mongoId: ctx.req.body.seatId}}).then((seat)=>{
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
