'use strict';

module.exports = function(Dateprice) {
  Dateprice.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Dateprice remote method: ' + ctx.method.name);
    next();
  });
};
