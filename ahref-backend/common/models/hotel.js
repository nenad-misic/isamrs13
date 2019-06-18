'use strict';

var TIMEOUT = 3000;

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

  
  Hotel.getAvailableRooms = function(startDate, endDate, hotelId, cb) {
    let retval = []
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    Hotel.app.models.Room.find({where: {hotelId: hotelId}}).then((rooms) => {
      let cnt = rooms.length;
      if (cnt === 0) {
        cb(null, retval);
      }

      rooms.forEach((room) => {
        let append = true;
        Hotel.app.models.mRoomReservation.find({where: {roomId: room.id}}).then((reservations) => {
          let rcnt = reservations.length;
          if (rcnt === 0) {
            cnt--;
            if (cnt === 0) {
              cb(null, retval);
            }
          }
          reservations.forEach((reservation) => {
            const rstart = reservation.startDate.getTime();
            const rend = reservation.endDate.getTime();
            if ((rstart >= start && rstart <= end) ||
                (start >= rstart && start <= rend)) {
              append = false;
            }
            rcnt --;
            if (rcnt === 0) {
              if (append) retval.push(room.id);
              cnt--;
              if (cnt === 0) {
                cb(null, retval);
              }
            }
          })
        })
      })
    })
  }

  Hotel.remoteMethod('getAvailableRooms', {
    accepts: [
      {arg: 'startDate', type: 'string', required: true},
      {arg: 'endDate', type: 'string', required: true},
      {arg: 'hotelId', type: 'string', required: true},
    ],
    http: {path: '/getAvailableRooms', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });

  
  Hotel.updateConcurrentSafe = function(new_hotel, cb) {
    // TODO
    let timeout = TIMEOUT;
      let sqlRac = Racservice.app.models.sRac;
      sqlRac.beginTransaction({
        isolationLevel: sqlRac.Transaction.READ_COMMITTED,
      }, function(err, tx) {
        if (err) cb(null,{res:false});
        setTimeout(()=>{
          var old_version = new_rac.version++;
          Racservice.upsertWithWhere({'id':new_rac.id, 'version':old_version}, new_rac).then((succ)=>{
            tx.commit(function(err) {
              if (err && flagCar)  cb(false);
              else cb(null,{res:true});
            });
          }, (err)=>{
            tx.rollback(function(err) {
              cb(null,{res:false});
            });
          });       
        },timeout);
      });      
  }


  Hotel.remoteMethod('updateConcurrentSafe', {
    accepts: [
      {arg: 'new_hotel', type: 'object', http: { source: 'body' }}
    ],
    http: {path: '/updateHotelConcurrentSafe', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });

};



