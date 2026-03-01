const express = require('express');

const router = express.Router();
const productcontroller = require('./../controllers/productcontroller');
const authmiddleware = require('./../middlewares/auth');

router.route('/').post(authmiddleware.protect, authmiddleware.restrictTo('admin'), productcontroller.createproduct);
router.route('/').get(productcontroller.getallproducts);
router.route('/:id').get(productcontroller.getproduct).patch(productcontroller.updateproduct).delete(productcontroller.deleteproduct);

module.exports = router;

