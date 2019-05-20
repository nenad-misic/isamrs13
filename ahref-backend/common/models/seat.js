'use strict';
var flag = true;
var flagUpdate = true;

module.exports = function(Seat) {
/*
*/
 Seat.beforeRemote('deleteById',
      function(ctx, model, next) {
        flag = true;
        doDelete(Seat, ctx, model, next, function(e) {
          flag = false;
          next(e);
        });
      });
  Seat.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Seat remote method: ' + ctx.method.name);
    next();
  });
  
};

function doDelete(Seat, ctx, model, next, errorCallback) {
  // models
  var sqlFlightReservation = Seat.app.models.FlightReservation;
  
  var sFlight = Seat.app.models.sFlight;
  var sSeat = Seat.app.models.sSeat;
  // data source
  var postgres = sSeat.app.dataSources.postgres;
  // begin transaction
  sqlFlightReservation.beginTransaction({
    isolationLevel: sqlFlightReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
    if (err) errorCallback(err);
    // lock seat for update
    postgres.connector.execute(
      'SELECT * FROM sSeat WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.params.id], function(err, data) {
        sSeat.findOne({where: {mongoId: ctx.req.params.id}}).then((s)=>{
		sFlight.findOne({where: {id: s.sFlightId}}).then((flight)=>{
			sSeat.find({where: {sFlightId: flight.id}}).then((seats)=> {
			var del = seats.length;
			seats.forEach((seat)=>{
			
          sqlFlightReservation.find({
            where: {sSeatId: seat.id},
          }).then((data)=> {
			  
            var cnt = data.length;
            if ((cnt > 0 || err) && flag) {
                flag = false;
                  tx.rollback(function(err) {
                    if (err && flag) errorCallback(err);

                    var error = new Error('Flight has pending reservation' +
                      ' and cannot be deleted');
                    error.statusCode = error.status = 404;
                    errorCallback(error);
                  });
			}
			del--;  
			  
			if (del == 0 && flag) {
              sSeat.deleteById(s.id)
                .then((res) => {
                  tx.commit(function(err) {
                    if (err && flag)  errorCallback(err);
                    flag = false;
                    next();
                  });
                });
            }
            
          });
		  });
		  
		  
		  
        });
		});
        });
		});
  });
}
