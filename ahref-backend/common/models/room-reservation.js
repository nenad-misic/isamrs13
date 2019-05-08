'use strict';

module.exports = function(Roomreservation) {
  Roomreservation.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Roomreservation remote method: ' + ctx.method.name);
    next();
  });
};
