exports.getHotels = (callback) => {
    //Fetch all hotels from MongoDB.
    //Return JSON object.
    callback("", []);
};

exports.addHotel = (hotel, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create hotel object if okay, otherwise report error
    //Write object to SQL DB (only ID is kept in SQL)
    //On success, write whole object in mongodb
    //Return True/False

    callback("", true);
};

exports.deleteHotels = (callback) => {
    //Truncate table in SQL and MongoDB
    //This should be available only to SysAdmin, or not be available at all
    //Return True/False

    callback("", true);
};

exports.getHotel = (id, callback) => {
    //Fetch hotel with id hotelId from MongoDB.
    //Return JSON object.
    callback("", {});
};

exports.editHotel = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch hotel with that id from mongoDB.
    //Change it's attributes to new ones
    //Save it to database
    //Return True/False

    this.getHotel(id, (err, data) =>{
        if(err)
            callback(err, "");
        else{
            var hotel = data;
            hotel.name = changes.name;
            hotel.description = changes.description;
            hotel.address = changes.address;
            callback("", hotel);
        }
    })
};

exports.deleteHotel = (id, callback) => {
    //Remove hotel with id hotelId from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};
