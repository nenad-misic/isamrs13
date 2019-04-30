'use strict';

module.exports = function(Flight) {
  Flight.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Flight remote method: ' + ctx.method.name);
    next();
  });
};
