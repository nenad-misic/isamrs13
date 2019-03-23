const express = require('express');
const bodyParser = require('body-parser');

const carRouter = express.Router();
carRouter.use(bodyParser.json());

const rentacarController = require('../controllers/rentacarController');

carRouter.route('/')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .get((req,res) => {
        rentacarController.getCars((err, data) => res.json(data));
    });

carRouter.route('/search')
    .all((req,res, next)=>{
        res.statusCode = 200;
        res.contentType = "text/plain";
        next();
    })
    .post((req,res) => {
        var id = req.body.carId;
        var brand = req.body.brand;
        var model = req.body.model;
        var carType = req.body.carType;

        var array = [];
        rentacarController.getCars((err,data) => array = data);

        if(id !== undefined)
            array.filter((elem)=> {return elem.carId===id});
        if(brand !== undefined)
            array.filter((elem)=> {return elem.brand===brand});
        if(model !== undefined)
            array.filter((elem)=> {return elem.model===model});
        if(carType !== undefined)
            array.filter((elem)=> {return elem.carType===carType});

        res.json(array);
    });

module.exports = carRouter;
