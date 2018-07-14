
var express = require('express');
var mainController = require('../controllers/MainController');
var router = express.Router();
var app = require('../../ApplicationInstance');

// get req
router.route('/').get(mainController.home);
router.route('/login').get(mainController.login);
router.route('/signup').get(mainController.signup);
router.route('/profile').get(mainController.profile);
router.route('/createAccount').post(mainController.createAccount);
router.route('/addAddress').post(mainController.addAddress);
router.route('/doTransx').post(mainController.doTransx);
// post req


//reg
router.route('/login').post(mainController.loginPost);
router.route('/signup').post(mainController.signupPost);
router.route('/getjson').get(mainController.getjson);

module.exports = router;
