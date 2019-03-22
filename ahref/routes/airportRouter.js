const express = require('express');
const bodyParser = require('body-parser');

const airportRouter = express.Router();
airportRouter.use(bodyParser.json());

const airportController = require('../controllers/airportController');

airportRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        airportController.getAirports((err, data) => res.json(data));
        //res.end("Returning JSON object of all airports");
    })
    .post((req,res) => {
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;

        airport = {
            name: name,
            address: address,
            description: description
        };

        airportController.addAirport(airport, (err, data) => res.json(data));
        //res.end(`Airport ${name} at ${address} saved in database.`);
    })
    .put((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method PUT not allowed.");
    })
    .delete((req,res) => {
        airportController.deleteAirports((err,data) => res.json(data));
        //res.end("All airports deleted");
    });

airportRouter.route('/:airportId')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        var id = req.params.airportId;

        airportController.getAirport(id, (err, data) => res.json(data));
        //res.end(`Returning JSON object of airport ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var id = req.params.airportId;
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;

        changes = {
            name: name,
            address: address,
            description: description
        };
        airportController.editAirport(id, changes, (err, data) => res.json(data));
        //res.end(`Airport ${id} changed to ${name}, ${address} and saved to database.`)
    })
    .delete((req,res) => {
        var id = req.params.airportId;
        airportController.deleteAirport(id, (err, data) => res.json(data));
        //res.end(`Airport ${id} removed from database.`)
    });

module.exports = airportRouter;
