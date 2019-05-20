'use strict';
var flag = true;
var flagUpdate = true;

module.exports = function(Flight) {
	
	Flight.afterRemote('*.__create__seats', function(ctx, modelInstance, next) {
		
    var sqlSeat = Flight.app.models.sSeat;
	var sqlFlight = Flight.app.models.sFlight;
	
	sqlFlight.find(function(err, model){
    if(err) throw err;
    model.forEach(function(flight){
		if(flight.mongoId == modelInstance.flightId){
		 sqlSeat.create({mongoId: modelInstance.id,sFlightId: flight.id}).then((succ) => {
			 console.log('Sit kreiran je');
		next();
		});
		}
		
    });
});
   
  });
  
  
 Flight.beforeRemote('deleteById',
      function(ctx, model, next) {
        flag = true;
        doDelete(Flight, ctx, model, next, function(e) {
          flag = false;
          next(e);
        });
      });

  Flight.beforeRemote('replaceById',
    function(ctx, model, next) {
      flagUpdate = true;
      doUpdate(Flight, ctx, model, next, function(e) {
        flagUpdate = false;
        next(e);
      });
    });
	
  Flight.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Flight remote method: ' + ctx.method.name);
    next();
  });
  
};

function doDelete(Flight, ctx, model, next, errorCallback) {
  // models
  var sqlFlightReservation = Flight.app.models.FlightReservation;
  
  var sFlight = Flight.app.models.sFlight;
  var sSeat = Flight.app.models.sSeat;
  // data source
  var postgres = sFlight.app.dataSources.postgres;
  // begin transaction
  sqlFlightReservation.beginTransaction({
    isolationLevel: sqlFlightReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
    if (err) errorCallback(err);
    // lock flight for update
    postgres.connector.execute(
      'SELECT * FROM sFlight WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.params.id], function(err, data) {
        sFlight.findOne({where: {mongoId: ctx.req.params.id}}).then((flight)=>{
			
		  sSeat.find({where: {sFlightId: flight.id},}).then((seats)=> {
			var del = seats.length;
			seats.forEach((seat)=>{
			
          sqlFlightReservation.find({
            where: {sSeatId: seat.id},
          }).then((data)=> {
			  
            var cnt = data.length;
			console.log('CNT je ',cnt, ' a flag ', flag)
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
				console.log('CNT je 0');
              sFlight.deleteById(flight.id)
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
}

function doUpdate(Flight, ctx, model, next, errorCallbackUpdate) {
 var sqlFlightReservation = Flight.app.models.FlightReservation;
  
  var sFlight = Flight.app.models.sFlight;
  var sSeat = Flight.app.models.sSeat;
  // data source
  var postgres = sFlight.app.dataSources.postgres;
  // begin transaction
  sqlFlightReservation.beginTransaction({
    isolationLevel: sqlFlightReservation.Transaction.READ_COMMITTED,
  }, function(err, tx) {
    if (err) errorCallback(err);
    // lock flight for update
    postgres.connector.execute(
      'SELECT * FROM sFlight WHERE mongoId = $1 FOR UPDATE;'
      , [ctx.req.params.id], function(err, data) {
        sFlight.findOne({where: {mongoId: ctx.req.params.id}}).then((flight)=>{
			
		  sSeat.find({where: {sFlightId: flight.id},}).then((seats)=> {
			
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
                      ' and cannot be modified');
                    error.statusCode = error.status = 404;
                    errorCallback(error);
                  });
              }
			  
            if (cnt === 0 && flagUpdate) {
              flagUpdate = false;
              next();
            }
			
          });
		  });
        });
		});
      });
  });
}