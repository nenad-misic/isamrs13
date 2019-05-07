'use strict';

module.exports = function(Hpricelistitem) {
  Hpricelistitem.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Hpricelistitem remote method: ' + ctx.method.name);
    next();
  });
};
