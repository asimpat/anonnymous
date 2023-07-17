const express = require('express');
const messageController = require('../controllers/messageController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').get(messageController.getAllMessage);

router.route('/').post(messageController.createMessage);

module.exports = router;
