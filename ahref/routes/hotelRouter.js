const express = require('express');
const bodyParser = require('body-parser');

const hotelRouter = express.Router();
hotelRouter.use(bodyParser.json());

const hotelsController = require('../controllers/hotelController');

hotelRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        hotelsController.getHotels((err, data) => res.json(data));
        //res.end("Returning JSON object of all hotels");
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

        hotelsController.addHotel(hotel, (err, data) => res.json(data));
        //res.end(`Hotel ${name} at ${address} saved in database.`);
    })
    .put((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method PUT not allowed.");
    })
    .delete((req,res) => {
        hotelsController.deleteHotels((err,data) => res.json(data));
        //res.end("All hotels deleted");
    });

hotelRouter.route('/:airportId')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        var id = req.params.hotelId;

        hotelsController.getHotel(id, (err, data) => res.json(data));
        //res.end(`Returning JSON object of hotel ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var id = req.params.hotelId;
        var name = req.body.name;
        var address = req.body.address;
        var description = req.body.description;

        changes = {
            name: name,
            address: address,
            description: description
        };
        hotelsController.editHotel(id, changes, (err, data) => res.json(data));
        //res.end(`Hotel ${id} changed to ${name}, ${address} and saved to database.`)
    })
    .delete((req,res) => {
        var id = req.params.airportId;
        hotelsController.deleteHotel(id, (err, data) => res.json(data));
        //res.end(`Hotel ${id} removed from database.`)
    });

module.exports = hotelRouter;
