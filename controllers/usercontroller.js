const User = require('./../models/usermodel');

exports.getallusers = (req, res) => {
    res.status(500).json({
        status: "Failed",
        message: "Not build yet"
    })
};

exports.getuser = (req, res) => {
    res.status(500).json({
        status: "Failed",
        message: "Not build yet"
    })
};

exports.createuser = async (req, res) => {
    res.status(400).json({
            status: "Failed",
            message: err.message
    })
};

exports.updateuser = (req, res) => {
    res.status(500).json({
        status: "Failed",
        message: "Not build yet"
    })
};

exports.deleteuser = (req, res) => {
    res.status(500).json({
        status: "Failed",
        message: "Not build yet"
    })
};

exports.getme = (req, res) => {
    res.status(200).json({
        status: "Success",
        data : req.user
    });
};
