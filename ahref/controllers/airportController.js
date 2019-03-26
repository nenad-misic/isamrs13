var dummyAirport = [
    {
        id: '1',
        name: 'Airport number one',
        description: 'The best airport in Novi Sad',
        address: 'Bulevar Oslobodjenja 1, Novi Sad'
    },
    {
        id: '2',
        name: 'Airport number two',
        description: 'The best airport in Belgrade',
        address: 'Bulevar Kralja Aleksandra 2, Belgrade'
    },
    {
        id: '3',
        name: 'Airport number three',
        description: 'The best airport in New York',
        address: '123 6th Avenue, New York'
    },
    {
        id: '4',
        name: 'Airport number four',
        description: 'The best airport in Kabul',
        address: 'Alahu Akhbar 13, Kabul'
    },
    {
        id: '5',
        name: 'Airport number five',
        description: 'The second best airport in Kabul',
        address: 'Alahu Akhbar 14, Kabul'
    },
];


exports.getAirports = (callback) => {
    //Fetch all airports from MongoDB.
    //Return JSON object.
    callback("", dummyAirport);
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
    var requestedAirport = {};
    this.getAirports((err, airports) => {
        requestedAirport = airports.filter(airport => airport.id === id)[0];
    });
    callback("", requestedAirport);
};

exports.editAirport = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch airport with that id from mongoDB.
    //Change it's attributes to new ones
    //Save it to database
    //Return changed airport

    this.getAirport(id, (err,data) =>{
        if(err)
            callback(err, "");
        else{
            data.description = changes.description;
            data.address = changes.address;
            data.name = changes.name;
            callback("", true);
        }
    });
};

exports.deleteAirport = (id, callback) => {
    //Remove airport with id airportID from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};
