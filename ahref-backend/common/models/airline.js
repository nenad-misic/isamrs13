'use strict';

module.exports = function(Airline) {
  Airline.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Airline remote method: ' + ctx.method.name);
    next();
  });
  Airline.afterRemote('*.__create__flights', function(ctx, modelInstance, next) {
    var sqlFlight = Airline.app.models.sFlight;
    sqlFlight.create({mongoId: modelInstance.id}).then((succ) => {
		console.log('Flight kreiran je');
      next();
    });
  });
};
