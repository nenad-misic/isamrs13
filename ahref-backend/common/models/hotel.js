'use strict';

module.exports = function(Hotel) {
  Hotel.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Hotel remote method: ' + ctx.method.name);
    next();
  });

  Hotel.afterRemote('*.__create__rooms', function(ctx, modelInstance, next) {
    var sqlRoom = Hotel.app.models.sRoom;
    sqlRoom.create({mongoId: modelInstance.id}).then((succ) => {
      next();
    });
  })
};
