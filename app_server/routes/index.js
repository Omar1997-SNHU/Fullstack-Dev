const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

/* GET home page. */
router.get('/', mainController.index);

module.exports = router;