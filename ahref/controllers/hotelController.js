var dummyData = [
    {
        id: "0",
        name: "Hotel0",
        description: "Opis0",
        address: "Zmaj Jovina 0"
    },
    {
        id: "1",
        name: "Hotel1",
        description: "Opis1",
        address: "Zmaj Jovina 1"
    },
    {
        id: "2",
        name: "Hotel2",
        description: "Opis2",
        address: "Zmaj Jovina 2"
    }
]

var currentId = 2;

exports.getHotels = (callback) => {
    //Fetch all hotels from MongoDB.
    //Return JSON object.
    callback("", dummyData);
};

exports.addHotel = (hotel, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create hotel object if okay, otherwise report error
    //Write object to SQL DB (only ID is kept in SQL)
    //On success, write whole object in mongodb
    //Return True/False

    if (!hotel.name) {
        callback("Hotel name missing!", false);
        return;
    }
    if (!hotel.description) {
        callback("Description missing!", false);
        return;
    }
    if (!hotel.address) {
        callback("Address missing!", false);
        return;
    }

    if ((dummyData.filter((element) => element.name === hotel.name)).length > 0) {
        callback("Name already exists", false);
        return;
    }
    currentId++;
    hotel.id = currentId.toString();
    dummyData.push(hotel);
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
    var hotel = dummyData.filter((element) => element.id === id)[0];
    callback("", hotel);
};

exports.editHotel = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch hotel with that id from mongoDB.
    //Change it's attributes to new ones
    //Save it to database
    //Return True/False

    this.getHotel(id, (err, data) => {
        if(err)
            callback(err, "");
        else{
            data.name = changes.name;
            data.description = changes.description;
            data.address = changes.address;
            callback("", true);
        }
    })
};

exports.deleteHotel = (id, callback) => {
    //Remove hotel with id hotelId from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};
