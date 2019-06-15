'use strict';

module.exports = function(Hotel) {
  Hotel.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Hotel remote method: ' + ctx.method.name);
    next();
  });

  Hotel.beforeRemote('create', (ctx, model, next) => {
    var luid = ctx.req.body.loggedUserId;
    
    Hotel.app.models.LoggedUser.findById(luid).then((user) => {
      if(user.type != 'hotelAdmin') {
        let e = new Error();
        e.status = "User is not hotel admin";
        e.statusCode = "305";
        next(e);
      } else if (user.hotelId) {
        let e = new Error();
        e.status = "User already has a hotel";
        e.statusCode = "305";
        next(e);
      } else {
        Hotel.app.models.HPriceList.create({}).then((hpr) => {
          ctx.req.body.hPriceListId = hpr.id;
          next();
        })
      }
    })
  })

  Hotel.afterRemote('create', (ctx, model, next) => {
    var luid = ctx.req.body.loggedUserId;
    var hid = model.id;
    Hotel.app.models.LoggedUser.findById(luid).then((obj) =>
      {
      console.log(obj);
      obj.hotelId = hid;
      Hotel.app.models.LoggedUser.upsert(obj).then((succ)=>{
        next()
      })
    })
   
  })
  Hotel.afterRemote('*.__create__rooms', function(ctx, modelInstance, next) {
    var sqlRoom = Hotel.app.models.sRoom;
    sqlRoom.create({mongoId: modelInstance.id}).then((succ) => {
      next();
    });
  })
};
