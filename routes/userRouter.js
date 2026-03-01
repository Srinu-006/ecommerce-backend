const express = require('express');

const router = express.Router();
const usercontroller = require('./../controllers/usercontroller');
const authmiddleware = require('./../middlewares/auth');


router.route('/me').get(authmiddleware.protect, usercontroller.getme);
router.route('/').get(usercontroller.getallusers).post(usercontroller.createuser);
router.route('/:id').get(usercontroller.getuser).patch(usercontroller.updateuser).delete(usercontroller.deleteuser);

module.exports = router;

