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
        var search = req.body;

        var searchResult = [];
        rentacarController.getCars((err,data) => searchResult = data);

        if (search.id) {
            searchResult = searchResult.filter((car) => car.id === search.id);
        }
        if (search.brand) {
            searchResult = searchResult.filter((car) => car.brand === search.brand);
        }
        if (search.model) {
            searchResult = searchResult.filter((car) => car.model === search.model);
        }
        if (search.type) {
            searchResult = searchResult.filter((car) => car.type === search.type);
        }

        res.json(searchResult);
    });

module.exports = carRouter;
