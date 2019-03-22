exports.getAirports = (callback) => {
    //Fetch all airports from MongoDB.
    //Return JSON object.
    callback("", []);
};

exports.addAirport = (airport, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create airport object if okay, otherwise report error
    //Write object to SQL DB (only ID is kept in SQL)
    //On success, write whole object in mongodb
    //Return True/False

    callback("", true);
};

exports.deleteAirports = (callback) => {
    //Truncate table in SQL and MongoDB
    //This should be available only to SysAdmin, or not be available at all
    //Return True/False

    callback("", true);
};

exports.getAirport = (id, callback) => {
    //Fetch airport with id airportID from MongoDB.
    //Return JSON object.
    callback("", {});
};

exports.editAirport = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch airport with that id from mongoDB.
    //Change it's attributes to new ones
    //Save it to database
    //Return changed airport

    this.getAirport(id, (err, data) =>{
        if(err)
            callback(err, "");
        else{
            var airport = data;
            airport.name = changes.name;
            airport.description = changes.description;
            airport.address = changes.address;
            callback("", airport);
        }
    })
};

exports.deleteAirport = (id, callback) => {
    //Remove airport with id airportID from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};
