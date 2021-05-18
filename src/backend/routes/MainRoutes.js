const express = require('express');
const router = express.Router();

const mainController = require("../controllers/MainController");
const loginController = require("../controllers/LoginController");
const listController = require('./../controllers/ListController');
const justController = require('./../controllers/JustController');

router.route('/signin').get(mainController.signin).post(loginController.signIn);
router.route('/signup').get(mainController.signup).post(loginController.signUp);
router.route('/').get(loginController.dashboard);
router.route('/add').post(listController.add);
router.route('/logout').get(loginController.logout);

router.route('/users').get(justController.getAllUsers);
router.route('/lists').get(justController.getAllLists);


module.exports = router;