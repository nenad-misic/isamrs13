exports.getRACServices = (callback) => {
    //Fetch all RAC from MongoDB.
    //Return JSON object.
    var dummyData = [
        {
            id: '1',
            name: 'Rent a car service number one',
            description: 'The best rent a car service in Novi Sad',
            address: 'Bulevar Oslobodjenja 1, Novi Sad'
        },
        {
            id: '2',
            name: 'Rent a car service number two',
            description: 'The best rent a car service in Belgrade',
            address: 'Bulevar Kralja Aleksandra 2, Belgrade'
        },
        {
            id: '3',
            name: 'Rent a car service number three',
            description: 'The best rent a car service in New York',
            address: '123 6th Avenue, New York'
        },
        {
            id: '4',
            name: 'Rent a car service number four',
            description: 'The best rent a car service in Kabul',
            address: 'Alahu Akhbar 13, Kabul'
        },
    ];
    callback("", dummyData);
};

exports.addRACService = (RAC, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create RAC object if okay, otherwise report error
    //Write object to SQL DB (only ID is kept in SQL)
    //On success, write whole object in mongodb
    //Return True/False

    callback("", true);
};

exports.deleteRACServices = (callback) => {
    //Truncate table in SQL and MongoDB
    //This should be available only to SysAdmin, or not be available at all
    //Return True/False

    callback("", true);
};

exports.getRACService = (id, callback) => {
    //Fetch RAC with id id from MongoDB.
    //Return JSON object.
    callback("", {});
};

exports.editRACService = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch RAC with that id from mongoDB.
    //Change it's attributes to new ones
    //Save it to database
    //Return True/False

    this.getRACService(id, (err, data) =>{
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

exports.deleteRACService = (id, callback) => {
    //Remove RAC with id id from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};

exports.getCars = (callback) => {
    var dummy = [
        {
            carId: 0,
            model: 'Golf 7',
            brand: 'VolksWagen',
            carType: 'hatchback'
        },
        {
            carId: 1,
            model: 'RX7',
            brand: 'Mazda',
            carType: 'cabrio'
        }
    ];
    callback("", dummy);
};
