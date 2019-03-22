const express = require('express');
const bodyParser = require('body-parser');

const reservationRouter = express.Router();
reservationRouter.use(bodyParser.json());

const reservationsController = require('../controllers/reservationsController');

reservationRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        reservationsController.getReservations((err, data) => res.json(data));
        //res.end("Returning JSON object of all reservations");
    })
    .post((req,res) => {
        reservation = { };

        reservationsController.addReservation(reservation, (err, data) => res.json(data));
        //res.end(`Reservation saved in database.`);
    })
    .put((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method PUT not allowed");
    })
    .delete((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method DELETE not allowed.");
    });

reservationRouter.route('/:reservationId')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        var id = req.params.reservationId;
        reservationsController.getReservation(id, (err, data) => res.json(data));
        res.end(`Returning JSON object of reservation ${id}`);
    })
    .post((req,res) => {
        //Method not allowed
        res.statusCode = 403;
        res.end("Method POST not allowed.");
    })
    .put((req,res) => {
        var id = req.params.reservationId;
        changes = { };
        reservationsController.editReservation(id, changes, (err, data) => res.json(data));
        //res.end("Reservation changed");

    })
    .delete((req,res) => {
        var id = req.params.reservationId;
        reservationsController.deleteReservation(id, (err, data) => res.json(data));
        //res.end(`Reservation ${id} removed from database.`)
    });


module.exports = reservationRouter;
