'use strict';

module.exports = function(Combinedreservation) {
    Combinedreservation.beforeRemote('**', function(ctx, modelInstance, next)  {
        console.log('Combinedreservation remote method: ' + ctx.method.name);
        next();
      });

    Combinedreservation.beforeRemote('create', function(ctx, model, next) {
        if(ctx.req.body.loggedUserId == ctx.req.accessToken.userId){
            next();
        }else {
            var e = new Error();
            e.status = "Access denied";
            e.statusCode = 401;
            next(e);
        }
    });

    

    Combinedreservation.sendReservationInfoMail = function(luid, mCarReservationList,mRoomReservationList, cb) {
        var luid2 = luid.objekat;
        console.log(mCarReservationList.lista);
        console.log(mRoomReservationList.lista);
        var poruka = "<h2>You have just made reservation via AHREF web site</h2><br><h4>Car reservations:</h4><br>\t";
        if (mCarReservationList.lista != []){
            poruka+= "<p>"
            mCarReservationList.lista.forEach((mcar)=>{
                poruka += "<div><b>Rentacar service:</b> " + mcar.car.rACServiceId + "<br><b>Brand:</b> " + mcar.car.brand + "<br><b>Model:</b> " + mcar.car.model + "<br><b>Year:</b> " + mcar.car.year + '</div>';
                poruka += "<div><b>Start date:</b> " + new Date(mcar.startDate).toLocaleDateString() + '</div>';
                poruka += "<div><b>End date:</b> " + new Date(mcar.endDate).toLocaleDateString() + '</div>';
                poruka += '<br>'
            })
            poruka += '<br><br>' + "</p>";


        }else{
            poruka += "<p><div> No car reservations.</div></p>"
        }
        if (mRoomReservationList.lista != []){
            poruka+= "<h4>Hotel reservations:</h4><br><p>"
            mRoomReservationList.lista.forEach((mroom)=>{
                poruka += "<div><b>Hotel:</b> " + mroom.room.hotel.name + "<br><b>Floor:</b> " + mroom.room.floor + "<br><b>Number of beds:</b> " + mroom.room.numOfBeds + '</div>';
                poruka += "<div><b>Start date:</b> " + new Date(mroom.startDate).toLocaleDateString() + '</div>';
                poruka += "<div><b>End date:</b> " + new Date(mroom.endDate).toLocaleDateString() + '</div>';
                poruka += '<br>'
            })
            poruka += '<br><br>' + "</p>";

            
        }else{
            poruka += "<p><div> No hotel reservations.</div></p>"
        }

        Combinedreservation.app.models.LoggedUser.findById(luid2).then((user)=>{
            Combinedreservation.app.models.Email.send({
                to: user.email,
                from: 'noreply@gmail.com',
                subject: 'Reservation info',
                text: 'Reservation info',
                html: poruka
            },function(err,res){
                console.log('updated email sent!');
                cb(null, true);
            });
        })
        
      }

      Combinedreservation.remoteMethod('sendReservationInfoMail', {
        accepts: [
            {arg: 'luid', type: 'object'},
            {arg: 'mCarReservationList', type: 'object'},
            {arg: 'mRoomReservationList', type: 'object'},
        ],
        http: {path: '/sendReservationInfoMail', verb: 'post'},
        returns: {type: 'object', arg: 'retval'},
      });
};
