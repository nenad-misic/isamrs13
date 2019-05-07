'use strict';

module.exports = function(Branchoffice) {
  Branchoffice.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Branchoffice remote method: ' + ctx.method.name);
    next();
  });
};
