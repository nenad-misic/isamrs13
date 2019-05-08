'use strict';

module.exports = function(Sroom) {
  Sroom.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Sroom remote method: ' + ctx.method.name);
    next();
  });
};
