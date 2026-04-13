const express = require('express');
const router  = express.Router();
const tripsController = require('../controllers/trips');

// GET all trips
router.get('/trips', tripsController.tripsList);

// GET a single trip by trip code
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// POST a new trip
router.post('/trips', tripsController.tripsAddTrip);

// PUT update a trip by trip code
router.put('/trips/:tripCode', tripsController.tripsUpdateTrip);

module.exports = router;