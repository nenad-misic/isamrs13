const express = require('express');
const bodyParser = require('body-parser');

const loggedUserRouter = express.Router();
loggedUserRouter.use(bodyParser.json());

const userController = require('../controllers/userController');

loggedUserRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        userController.getLoggedUser((err, data) => res.json(data));
        //res.end(`Returning JSON object of user ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var changes = req.body;
        userController.editLoggedUser(changes, (err, data) => res.json(data));
        //res.end(`User ${id} changed to ${username}, ${password} and saved to database.`)
    })
    .delete((req,res) => {
        var id = req.params.userId;
        userController.deleteUser(id, (err, data) => res.json(data));
        //res.end(`User ${id} removed from database.`)
    });

module.exports = loggedUserRouter;
