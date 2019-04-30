'use strict';
var flag = true;
var flagUpdate = true;

module.exports = function(Room) {
  Room.afterRemote('**', function(ctx, modelInstance, next)  {
    console.log('Room remote method: ' + ctx.method.name);
    next();
  });

    Room.beforeRemote('deleteById',
      function(ctx, model, next) {
        flag = true;
        doDelete(Room, ctx, model, next, function(e) {
          flag = false;
          next(e);
        });
      });

  Room.beforeRemote('replaceById',
    function(ctx, model, next) {
      flagUpdate = true;
      doUpdate(Room, ctx, model, next, function(e) {
        flagUpdate = false;
        next(e);
      });
    });

  Room.getMatching = function(roomid, startDate, endDate, numberOfGuests, requiredRooms, lowPrice, hightPrice, cb) {
    var totalBeds = 0;
    requiredRooms = [numberOfGuests];
    console.log(requiredRooms);
    for (let value of requiredRooms) {
      totalBeds += value;
    }
    if (numberOfGuests != totalBeds) {
      console.log("Wrong number of guests")
      console.log(numberOfGuests);
      console.log(totalBeds);
      //cb(null, []);
      //return;
    }
    var results = [];
    Room.app.models.Hotel.findOne({where: {id: roomid}, include: 'rooms'})
      .then((hotel) => {
        // check price range
        // not implemented yet
        var rooms = hotel.rooms;
        rooms.find().then((roomz => {
          var len = roomz.length;
          roomz.forEach((room) => {
            var append = true;
            if (room.numOfBeds in requiredRooms) {
              Room.app.models.mRoomReservation.find({where: {roomId: room.id}}).then((reservations) => {
                len--;
                reservations.forEach((reservation) => {
                  var start1 = reservation.startDate.getTime();
                  var end1 = reservation.endDate.getTime();
                  var start2 = new Date(startDate).getTime();
                  var end2 = new Date(endDate).getTime();
                  if ((start1 >= start2 && start1 <= end2) ||
                    (start2 >= start1 && start2 <= end1)) {
                    append = false;
                  }
                });
                if(append) results.push(room);

                if (len === 0) cb(null, results);
              })
            } else len--;
          });
        }));
      });
  };

  Room.remoteMethod('getMatching', {
    accepts: [
      {arg: 'roomid', type: 'string', required: true},
      {arg: 'startDate', type: 'string', required: true},
      {arg: 'endDate', type: 'string', required: true},
      {arg: 'numberOfGuests', type: 'number', required: true},
      {arg: 'lowPrice', type: 'string', required: false},
      {arg: 'hightPrice', type: 'string', required: false},
      {arg: 'requiredRooms', type: 'array', required: true},
    ],
    http: {path: '/getMatching', verb: 'post'},
    returns: {type: 'object', arg: 'retval'},
  });
};


function doDelete(Room, ctx, model, next, errorCallback) {
    // models
    var sqlRoomReservation = Room.app.models.RoomReservation;
    var sRoom = Room.app.models.sRoom;
    // data source
    var postgres = sRoom.app.dataSources.postgres;
    // begin transaction
    sqlRoomReservation.beginTransaction({
      isolationLevel: sqlRoomReservation.Transaction.READ_COMMITTED,
    }, function(err, tx) {
      if (err) errorCallback(err);
      // lock room for update
      postgres.connector.execute(
        'SELECT * FROM sRoom WHERE mongoId = $1 FOR UPDATE;'
        , [ctx.req.params.id], function(err, data) {
          sRoom.findOne({where: {mongoId: ctx.req.params.id}}).then((room)=>{
            sqlRoomReservation.find({
              where: {sRoomid: room.id},
            }).then((data)=> {
              var cnt = data.length;
              data.forEach((element) => {
                  console.log(element);
                if (flag) {
                  var end1 = element.endDate.getTime();
                  var today = new Date().getTime();
                  if (end1 > today) {
                    flag = false;
                    tx.rollback(function(err) {
                      if (err && flag) errorCallback(err);

                      var error = new Error('Room has pending reservation' +
                        ' and cannot be deleted');
                      error.statusCode = error.status = 404;
                      errorCallback(error);
                    });
                  }
                }

                cnt--;
              });
              if (cnt === 0 && flag) {
                sRoom.deleteById(room.id)
                  .then((res) => {
                    tx.commit(function(err) {
                      if (err && flag)  errorCallback(err);
                      flag = false;
                      next();
                    });
                  });
              }
            });
          });
        });
    });
  }
  function doUpdate(Room, ctx, model, next, errorCallbackUpdate) {
    // models
    var sqlRoomReservation = Room.app.models.RoomReservation;
    var sRoom = Room.app.models.sRoom;
    // data source
    var postgres = sRoom.app.dataSources.postgres;
    // begin transaction
    sqlRoomReservation.beginTransaction({
        isolationLevel: sqlRoomReservation.Transaction.READ_COMMITTED,
      }, function(err, tx) {
      if (err) errorCallbackUpdate(err);
      // lock room for update
      postgres.connector.execute(
        'SELECT * FROM sRoom WHERE mongoId = $1 FOR UPDATE;'
        , [ctx.req.params.id], function(err, data) {
          sRoom.findOne({where: {mongoId: ctx.req.params.id}}).then((room)=>{
            sqlRoomReservation.find({
              where: {sRoomid: room.id},
            }).then((data)=> {
              var cnt = data.length;
              data.forEach((element) => {
                if (flagUpdate) {
                  var end1 = element.endDate.getTime();
                  var today = new Date().getTime();
                  if (end1 > today) {
                    flagUpdate = false;
                    tx.rollback(function(err) {
                      if (err && flagUpdate) errorCallback(err);

                      var error = new Error('Room has pending reservation' +
                        ' and cannot be modified');
                      error.statusCode = error.status = 404;
                      errorCallbackUpdate(error);
                    });
                  }
                }

                cnt--;
              });
              if (cnt === 0 && flagUpdate) {
                flagUpdate = false;
                next();
              }
            });
          });
        });
    });
  }
