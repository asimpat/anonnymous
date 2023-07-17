const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/:id').get(authController.userGetMessage);

router.route('/:userId/message').post(messageController.createMessage);

module.exports = router;
