exports.getReservations = (callback) => {
    //Fetch all reservations from SQL.
    //Return JSON object.
    callback("", []);
};

exports.addReservation = (reservation, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create reservation object (containing 3 little reservation objects) if okay, otherwise report error
    //Write object to SQL DB
    //On success, reduce counter in MongoDB for flight
    //Return True/False

    callback("", true);
};

exports.getReservation = (id, callback) => {
    //Fetch reservation with id reservationId from SQL.
    //Return JSON object.
    callback("", {});
};

exports.editReservation = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch reservation with that id from SQL.
    //Change it's attributes to new ones
    //Save it to database
    //Return True/False

    this.getReservation(id, (err, data) =>{
        if(err)
            callback(err, "");
        else{
            var reservation = {};
            callback("", reservation);
        }
    })
};

exports.deleteReservation = (id, callback) => {
    //Remove reservation with id reservationId from SQL (if dates are correct).
    //Counter++ in MongoDB
    //Do backend user authentication and validation

    callback("", true);
};
