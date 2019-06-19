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
    /*let timeout = TIMEOUT;
      Hotel.beginTransaction({
        isolationLevel: Hotel.Transaction.READ_COMMITTED,
      }, function(err, tx) {
        if (err) cb(null,{res:false});
        setTimeout(()=>{
          let old_version = new_hotel.version++;
          Hotel.upsertWithWhere({'id':new_hotel.id, 'version':old_version}, new_hotel).then((succ)=>{
            tx.commit(function(err) {
              if (err)  cb(false);
              else cb(null,{res:true});
            });
          }, (err)=>{
            tx.rollback(function(err) {
              cb(null,{res:false});
            });
          });       
        },timeout);
      });*/   
    let old_version = new_hotel.version;
    new_hotel.version += 1;
    setTimeout(()=>{
      Hotel.upsertWithWhere({'id': new_hotel.id, 'version': old_version}, new_hotel).then((succ) => {
        cb(null, succ);
      }, (err) => {
        cb(err, new_hotel);
      }, (err) => {
        cb(err, new_hotel);
      })
    }, TIMEOUT)
  }


  Hotel.remoteMethod('updateConcurrentSafe', {
    accepts: [
      {arg: 'new_hotel', type: 'object', http: { source: 'body' }}
    ],
    http: {path: '/updateHotelConcurrentSafe', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });

};



