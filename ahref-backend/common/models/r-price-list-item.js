'use strict';

module.exports = function(Rpricelistitem) {
  Rpricelistitem.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Rpricelistitem remote method: ' + ctx.method.name);
    next();
  });
};
