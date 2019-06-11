'use strict';


var flag = true;
module.exports = function(Mroomreservation) {
    Mroomreservation.afterRemote('**', function(ctx, modelInstance, next)  {
      console.log('Mroomreservation remote method: ' + ctx.method.name);
      next();
    });

    Mroomreservation.afterRemote('create', function(ctx, modelInstance, next) {
        var models = Mroomreservation.app.models;
        models.Room.findOne({where: {id: modelInstance.roomId}}).then((room)=>{
            models.Hotel.findOne({where: {id: room.hotelId}}).then((hotel) => {
                /*models.Hotel.__create__quickRoomReservations(hotel.id, {mRoomReservationId: modelInstance.id}).then(()=>{
                    next();
                })*/
                
                models.QuickRoomReservation.create({mRoomReservationId: modelInstance.id, hotelId: hotel.id}).then((quickReservation) => {
                    next();
                })
            })
        })
    })

    Mroomreservation.beforeRemote('create',
        function(ctx, model, next) {
            flag = true;
            calculateRoomPrice(Mroomreservation, ctx, model, next, doReservation, function(e) {
                flag = false;
                next(e);
              })
        })
};

function calculateRoomPrice(Mroomreservation, ctx, model, next, doNext , errorCallback) {
    var models = Mroomreservation.app.models;
  
    models.DatePrice.find({roodId: ctx.req.body.roomId}).then((prices) => {
      if (prices == null) {
        errorCallback(new Error("room has no defined price"));
      }
      prices = prices instanceof Array ? prices : [prices];
      var startPrice = prices[0];
      for (let price of prices) {
        if (price.startDate > ctx.req.body.startDate) continue;
        if (price.startDate > startPrice.startDate) startPrice = price;
      }
      var days = (ctx.req.body.endDate - ctx.req.body.startDate)/(24*60*60*1000);
      ctx.req.body.price = days * startPrice.price;
      doNext(Mroomreservation, ctx, model, next, errorCallback);
    })
  }

function doReservation(Mroomreservation, ctx, model, next, errorCallback) {
    // models
    var sqlRoomReservation = Mroomreservation.app.models.RoomReservation;
    var sRoom = Mroomreservation.app.models.sRoom;
    // data source
    var postgres = sRoom.app.dataSources.postgres;
    // begin transaction
    sqlRoomReservation.beginTransaction({
        isolationLevel: sqlRoomReservation.Transaction.READ_COMMITTED,
    }, function(err, tx) {
        if (err) errorCallback(err);
        // lock room for update
        postgres.connector.execute(
            'SELECT * FROM sRoom WHERE mongoId = $1 FOR UPDATE;',
            [ctx.req.body.roomId], function(err, data) {
                sRoom.findOne({where: {mongoId: ctx.req.body.roomId}}).then((room) => {
                    sqlRoomReservation.find({where: {sRoomId: room.id}}).then((data) => {
                        var foundOne = false;
                        data.forEach((element) => {
                            if (flag) {
                                // check if room is available during time period
                                console.log(element);
                                var start1 = element.startDate.getTime();
                                var end1 = element.endDate.getTime();
                                var start2 = new Date(ctx.req.body.startDate).getTime();
                                var end2 = new Date(ctx.req.body.endDate).getTime();
                                console.log({
                                    start1: start1,
                                    end1: end1,
                                    start2: start2,
                                    end2: end2
                                });
                                if ((start1 >= start2 && start1 <= end2) ||
                                    (start2 >= start1 && start2 <= end1)) {
                                    foundOne = true;
                                }
                            }
                        })
                        if (foundOne) {
                            tx.rollback(function(err) {
                                if (err && flag) errorCallback(err);

                                var error = new Error('Room is not available');
                                error.statusCode = error.status = 404;
                                if (flag) errorCallback(error);
                            });
                        }

                        if (err && flag) {
                            tx.rollback(function(err) {
                              if (err && flag) errorCallback(err);
                            });
                            errorCallback(err);
                        }

                        if (flag) {
                            sRoom.findOne({where: {mongoId: ctx.req.body.roomId}}).then((room)=>{
                                // create reservation
                                sqlRoomReservation.create(
                                  {
                                    timeStamp: ctx.req.body.timeStamp,
                                    sRoom: room,
                                    startDate: ctx.req.body.startDate,
                                    endDate: ctx.req.body.endDate,
                                  },
                                  {transaction: tx},
                                  function(err, rr) {
                                    if (err && flag) {
                                      tx.rollback(function(err) {
                                        if (err && flag)  errorCallback(err);
                                      });
                                      errorCallback(err);
                                    }
                                    // commit and end before-hook
                                    if (flag) {
                                      tx.commit(function(err) {
                                        if (err && flag)  errorCallback(err);
                                        next();
                                      });
                                    }
                                  });
                              });
                          }

                    })
                })
            }
        )
    })
}
