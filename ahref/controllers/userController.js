var loggedUser = {
    username : "username",
    password : "password",
    name : "Nikola Ignjatovic",
    email : "imejl@gmail.com"
}

exports.getUsers = (callback) => {
    //Fetch all users from MongoDB.
    //Return JSON object.
    callback("", []);
};

exports.addUser = (RAC, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Create user object if okay, otherwise report error
    //Write object to SQL DB (only ID,USERNAME and PASSWORD are kept in SQL)
    //On success, write whole object in mongodb
    //Return True/False

    callback("", true);
};

exports.getUser = (id, callback) => {
    //Fetch user with id userId from MongoDB.
    //Return JSON object.
    callback("", {});
};

exports.editUser = (id, changes, callback) => {
    //Attributes will fit model once it's implemented

    //Do form validation on backend
    //Fetch user with that id from mongoDB.
    //Change it's attributes to new ones (username and password changes go to SQL)
    //Save it to database
    //Return True/False

    this.getUser(id, (err, data) =>{
        if(err)
            callback(err, "");
        else{
            var user = data;
            user.username = changes.username;
            user.password = changes.password;
            callback("", user);
        }
    })
};

exports.deleteUser = (id, callback) => {
    //Remove user with id userId from MongoDB and SQL
    //Do backend user authentication and validation

    callback("", true);
};

exports.getLoggedUser = (callback)=>{
    callback("",loggedUser);
};

exports.editLoggedUser = (changes,callback) => {

    loggedUser.name = changes.name;
    loggedUser.email = changes.email;
    loggedUser.password = changes.password;
    loggedUser.username = changes.username;

    callback("",loggedUser);

};
