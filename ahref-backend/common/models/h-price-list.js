'use strict';

module.exports = function(Hpricelist) {
  Hpricelist.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Hpricelist remote method: ' + ctx.method.name);
    next();
  });
};
