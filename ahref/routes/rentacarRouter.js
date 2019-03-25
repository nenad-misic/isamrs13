const express = require('express');
const bodyParser = require('body-parser');

const rentacarRouter = express.Router();
rentacarRouter.use(bodyParser.json());

const rentacarController = require('../controllers/rentacarController');

rentacarRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        rentacarController.getRACServices((err, data) => res.json(data));
        //res.end("Returning JSON object of all RAC services");
    })
    .post((req,res) => {
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;

        hotel = {
            name: name,
            address: address,
            description: description
        };

        rentacarController.addRACService(hotel, (err, data) => res.json(data));
        //res.end(`RAC service ${name} at ${address} saved in database.`);
    })
    .put((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method PUT not allowed.");
    })
    .delete((req,res) => {
        rentacarController.deleteRACServices((err,data) => res.json(data));
        //res.end("All RAC services deleted");
    });

rentacarRouter.route('/:id')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        var id = req.params.id;

        rentacarController.getRACService(id, (err, data) => res.json(data));
        //res.end(`Returning JSON object of RAC service ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var id = req.params.id;
        var changes = req.body;
        rentacarController.editRACService(id, changes, (err, data) => res.json(data));
        //res.end(`RAC service ${id} changed to ${name}, ${address} and saved to database.`)
    })
    .delete((req,res) => {
        var id = req.params.id;
        rentacarController.deleteRACService(id, (err, data) => res.json(data));
        //res.end(`RAC service ${id} removed from database.`)
    });

module.exports = rentacarRouter;
