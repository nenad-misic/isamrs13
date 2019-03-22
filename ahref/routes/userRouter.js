const express = require('express');
const bodyParser = require('body-parser');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

const userController = require('../controllers/userController');

userRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        userController.getUsers((err, data) => res.json(data));
        //res.end("Returning JSON object of all users");
    })
    .post((req,res) => {
        var username = req.body.username;
        var password = req.body.password;
        var user = {
            username: username,
            password: password
        };
        userController.addUser(user, (err, data) => res.json(data));
        //res.end(`User ${username} at ${password} saved in database`);
    })
    .put((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method PUT not allowed");
    })
    .delete((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method DELETE not allowed");
    });

userRouter.route('/:userId')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        var id = req.params.userId;
        userController.getUser(id, (err, data) => res.json(data));
        //res.end(`Returning JSON object of user ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var id = req.params.userId;
        var username = req.body.username;
        var password = req.body.password;
        userController.editUser(id, changes, (err, data) => res.json(data));
        //res.end(`User ${id} changed to ${username}, ${password} and saved to database.`)
    })
    .delete((req,res) => {
        var id = req.params.userId;
        userController.deleteUser(id, (err, data) => res.json(data));
        //res.end(`User ${id} removed from database.`)
    });

module.exports = userRouter;
