const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['HS256']
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Auth routes — no JWT required
router.post('/register', authController.register);
router.post('/login', authController.login);

// Public trips routes — no JWT required
router.get('/trips', tripsController.tripsList);
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Protected routes — JWT required
router.post('/trips', auth, tripsController.tripsAddTrip);
router.put('/trips/:tripCode', auth, tripsController.tripsUpdateTrip);
router.delete('/trips/:tripCode', auth, tripsController.tripsDeleteTrip);

module.exports = router;