'use strict';

module.exports = function(Apricelist) {
  Apricelist.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Apricelist remote method: ' + ctx.method.name);
    next();
  });

};
