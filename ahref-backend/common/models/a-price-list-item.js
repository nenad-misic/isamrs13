'use strict';

module.exports = function(Apricelistitem) {
  Apricelistitem.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Apricelistitem remote method: ' + ctx.method.name);
    next();
  });
};
