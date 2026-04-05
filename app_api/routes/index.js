const express = require('express');
const router  = express.Router();
const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET a single trip by trip code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
