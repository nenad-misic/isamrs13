'use strict';

module.exports = function(Airline) {
  Airline.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Airline remote method: ' + ctx.method.name);
    next();
  });
};
