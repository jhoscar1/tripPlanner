const express = require('express');
const router = express.Router();
var Promise = require('bluebird');
var models = require('../models');
var db = models.db;
var Place = models.Place;
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

router.get('/', function(req, res, next) {
    const findingHotels = Hotel.findAll({});
    const findingRestaurants = Restaurant.findAll({});
    const findingActivities = Activity.findAll({});
    
    Promise.all([findingHotels, findingActivities, findingRestaurants])
    .spread(function(hotels, activities, restaurants) {
        res.render('index', {hotels: hotels, activities: activities, restaurants: restaurants});
        next();
    })
    .catch(next)
});



module.exports = router;