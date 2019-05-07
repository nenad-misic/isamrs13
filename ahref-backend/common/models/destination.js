'use strict';

module.exports = function(Destination) {
  Destination.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Destination remote method: ' + ctx.method.name);
    next();
  });
};
