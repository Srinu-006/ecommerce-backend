const User = require('./../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign(
        { id: id},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN}
    );
};

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                status: 'Failed',
                message: 'Please provide email and password'
            });
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user){
            return res.status(400).json({
                status: 'Failed',
                message: 'Invalid email or password'
            });
        }
        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(400).json({
                status: 'Failed',
                message: 'Invalid email or password'
            });
        }
        const token = signToken(user._id);
        user.password = undefined;
        res.status(200).json({
            status: 'Success',
            token,
            message: 'Login successfully'
        });
    } catch(err){
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
}



exports.signup = async (req, res) => {
    try{
        const user = await User.create(req.body);
        user.password = undefined;
        const token = signToken(user._id);
        res.status(201).json({
            status: "Success",
            token,
            data: user
        })
    } catch(err){
            res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
}