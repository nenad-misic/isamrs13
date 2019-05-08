'use strict';

module.exports = function(Rpricelist) {
  Rpricelist.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Rpricelist remote method: ' + ctx.method.name);
    next();
  });
};
