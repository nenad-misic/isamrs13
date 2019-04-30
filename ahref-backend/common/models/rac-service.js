'use strict';

module.exports = function(Racservice) {
  Racservice.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Racservice remote method: ' + ctx.method.name);
    next();
  });
};
