const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET /api/trips - returns all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean();
    if (!trips) {
      return res
        .status(404)
        .json({ message: 'No trips found' });
    }
    return res
      .status(200)
      .json(trips);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

// GET /api/trips/:tripCode - returns a single trip by code
const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip
      .findOne({ code: req.params.tripCode })
      .lean();
    if (!trip) {
      return res
        .status(404)
        .json({ message: 'Trip not found' });
    }
    return res
      .status(200)
      .json(trip);
  } catch (err) {
    return res
      .status(500)
      .json({ message: err.message });
  }
};

module.exports = { tripsList, tripsFindByCode };