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
    
  Room.getMatching = function(roomid, startDate, endDate, numberOfGuests, lowPrice, hightPrice, requiredRooms, cb) {
    var totalBeds = 0;
    for (let value of requiredRooms.rooms) {
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
        
        var rooms = hotel.rooms;
        rooms.find().then((roomz) => {
          var len = roomz.length;
          roomz.forEach((room) => {
            Room.app.models.DatePrice.find({where: {roomId: room.id}}).then((datePrices) => {var append = true;

              if (requiredRooms.rooms.includes(room.numOfBeds) || requiredRooms.rooms == []) {
                // check prices
                var start2 = new Date(startDate).getTime();
                var end2 = new Date(endDate).getTime();
                var difTime = end2 - start2;
                var days = Math.ceil(difTime/(1000*60*60*24))
                var currentPrice = {
                  date: 0,
                  price: 0
                };
                if (datePrices == []) {
                  append = false;
                }
                if (!(datePrices instanceof Array)) datePrices = [datePrices]
                if (room.datePrices.length == 0) { // if no prices are defined, dont show room
                  append = false;
                } else {
                  for (let price of datePrices){
                    if (price.startDate > start2) {
                      continue;
                    }
                    if (price.startDate > currentPrice.date){
                      currentPrice = price
                    }
                  }
                  if (currentPrice.price == 0) {
                    append = false
                  } else if(currentPrice.price*days < lowPrice || currentPrice.price*days > hightPrice) {
                    append = false
                  }
                }
                // check reservations
                Room.app.models.mRoomReservation.find({where: {roomId: room.id}}).then((reservations) => {
                  var rlen = reservations.length;
                  if (rlen === 0) {
                    if (append)
                      results.push(room);
                    len--;
                    if (len === 0) {
                      cb(null, results);
                    }
                  }
                  reservations.forEach((reservation) => {
                    var start1 = reservation.startDate.getTime();
                    var end1 = reservation.endDate.getTime();
                    if ((start1 >= start2 && start1 <= end2) ||
                      (start2 >= start1 && start2 <= end1)) {
                      append = false;
                    }
                    rlen--;
                    if (rlen == 0) {
                      if (append) results.push(room);
                      len--;
                      if (len === 0) {
                        cb(null, results);
                      }
                    }
                  });
                });
  
              } else {
                len--;
                if (len === 0) {
                  cb(null, results);
                }
              }

            })
            
          });
        });
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
      {arg: 'requiredRooms', type: 'object', required: true},
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
