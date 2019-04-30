'use strict';

module.exports = function(Hotel) {
  Hotel.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Hotel remote method: ' + ctx.method.name);
    next();
  });
};
