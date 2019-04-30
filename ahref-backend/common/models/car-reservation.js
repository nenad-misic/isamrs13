'use strict';

module.exports = function(Carreservation) {
  Carreservation.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Carreservation remote method: ' + ctx.method.name);
    next();
  });
};
