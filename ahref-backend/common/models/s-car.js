'use strict';

module.exports = function(Scar) {
  Scar.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Scar remote method: ' + ctx.method.name);
    next();
  });
};
