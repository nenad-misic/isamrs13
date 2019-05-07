'use strict';

module.exports = function(Seat) {
  Seat.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Seat remote method: ' + ctx.method.name);
    next();
  });
};
