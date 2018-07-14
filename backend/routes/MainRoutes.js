
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');

// get req
router.route('/').get(mainController.home);
router.route('/login').get(mainController.login);
router.route('/signup').get(mainController.signup);

// post req


//reg
router.route('/login').post(mainController.loginPost);
router.route('/signup').post(mainController.signupPost);

module.exports = router;
