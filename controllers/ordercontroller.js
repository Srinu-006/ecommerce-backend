const Order = require('./../models/ordermodel');
const Product = require('./../models/productmodel');

exports.getallorders = async (req, res) => {
    try{
        const order = await Order.find();
        res.status(201).json({
            status: "success",
            data: order
        });
    } catch(err){
        res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
}

exports.getorder = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({
                status: 'Failed',
                message: 'Order not found'
            })
        }
        res.status(201).json({
            status: "Success",
            data: order
        })
    } catch(err){
        res.status(500).json({
            status: "Failed",
            message: err.message
        });
    }
}

exports.createorder = async (req, res) => {
    try{
        const { orderItems } = req.body;
        if(!orderItems || orderItems.length == 0){
            return res.status(400).json({
                status: 'Failed',
                message: 'No order Items provided'
            });
        }
        let totalPrice = 0;
        const updatedOrderItems = [];

        for(const item of orderItems){
            const product = await Product.findById(item.product);
            if(!product){
                return res.status(404).json({
                    status: 'Failed',
                    message: 'Product not found'
                });
            }
            const itemprice = product.price * item.quantity;
            totalPrice += itemprice;
            updatedOrderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const order = await Order.create({
            user : req.user._id,
            orderItems : updatedOrderItems,
            totalPrice
        });

        res.status(201).json({
            status: 'Success',
            data: order
        })
    } catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
}

exports.updateorder = async (req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.parmas.id, req.body, {
            new: true
        });
        if(!order){
            return res.status(404).json({
                status: 'Failed',
                message: 'Order not found'
            });
        }
        res.status(201).json({
            status: 'Success',
            data: order
        })
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

exports.deleteorder = async (req, res) => {
    try{
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order){
            return res.status(404).json({
                status: 'Failed',
                message: 'Order not found'
            });
        }
        res.status(201).json({
            status: 'Success',
            message: 'Order Deleted'
        })
    } catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}


exports.getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({ user: req.user._id }).populate('orderItems.product', 'name price');

        res.status(200).json({
            status: 'Success',
            results: orders.length,
            data: orders
        });

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try{
        const { orderStatus} = req.body;
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(404).json({
                status: 'Failed',
                message: 'Order not found'
            });
        }
        if(orderStatus){
            order.orderstatus = orderStatus;
        }
        await order.save();
         res.status(200).json({
            status: 'Success',
            data: order
        });
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};