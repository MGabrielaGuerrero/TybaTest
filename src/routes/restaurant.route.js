const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getRestaurants } = require('../controllers/restaurant.controller');
const restaurantValidateSchema = require('../middlewares/restaurantValidateSchema.middleware');
const router = express.Router();

router.post('/', authMiddleware, restaurantValidateSchema, getRestaurants);

module.exports = router;
