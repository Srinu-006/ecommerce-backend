const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');

exports.protect = async (req, res, next) =>{
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({
                status: 'Failed',
                message: 'You are not logged in'
            });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentuser = await User.findById(decoded.id);
        if(!currentuser){
            return res.status(401).json({
                status : 'Failed',
                message: 'User no longer exists'
            });
        };
        req.user = currentuser;
        next();
    } catch(err){
        res.status(401).json({
            status: 'Failed',
            message: err.message
        });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                status: 'Failed',
                message: 'You are not allowed to access this'
            });
        }
        next();
    };
};