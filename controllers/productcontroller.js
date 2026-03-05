const Product = require('./../models/productmodel');

exports.getallproducts = async (req, res) => {
    try{
        //Filtering
        const filter = {};
        if(req.query.category){
            filter.category = req.query.category;
        }
        let query = Product.find(filter);

        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        //pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        
        const products = await query;
        res.status(200).json({
            status: 'Success',
            results: products.length,
            data: products
        });
    } catch(err){   
        res.status(400).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.getproduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({
                status: 'Failed',
                message: 'Product not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
};

exports.createproduct = async (req, res) => {
    try{
        const newproduct = await Product.create(req.body);
        res.status(201).json({
            status: 'Success',
            data: newproduct
        });
    } catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
};

exports.updateproduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!product) {
            return res.status(404).json({
                status: 'failed',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'Success',
            data: product
        })
    } catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
};

exports.deleteproduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'failed',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'Product Deleted'
        })
    } catch(err){
        res.status(400).json({
            status: 'Failed',
            message: err.message
        })
    }
}
