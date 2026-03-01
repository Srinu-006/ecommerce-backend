const express = require('express');

const router = express.Router();
const ordercontroller = require('./../controllers/ordercontroller');
const authmiddleware = require('./../middlewares/auth');


router.route('/myOrders').get(authmiddleware.protect, ordercontroller.getMyOrders);
router.route('/').post(authmiddleware.protect, ordercontroller.createorder)
router.route('/').get(authmiddleware.protect, authmiddleware.restrictTo('admin'), ordercontroller.getallorders);
router.route('/:id')
.get(authmiddleware.protect, authmiddleware.restrictTo('admin'), ordercontroller.getorder)
.delete(authmiddleware.protect,authmiddleware.restrictTo('admin'), ordercontroller.deleteorder)
.patch(authmiddleware.protect, authmiddleware.restrictTo('admin'), ordercontroller.updateOrderStatus);

module.exports = router;

