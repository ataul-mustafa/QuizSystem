const ErrorHandler = require( '../utils/errorHandler.js');
// const ErrorHandler = require('../utils/errorHandler');
// const catchAsyncError = require('./catchAsyncError');
// const User = require('../models/userModel')
const catchAsyncError = require( './catchAsyncError.js');
const jwt = require( 'jsonwebtoken');
const User = require( '../models/userModel.js');

// class ErrorHandler extends Error{
//     constructor(message, statusCode){
//         super(message);
//         this.statusCode = statusCode;

//         Error.captureStackTrace(this, this.constructor)
//     }
// }


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{

    // console.log("started");

    // const { token } = req.cookies;
    const { headers: { cookie } } = req;
    var token;
    if(cookie){
        token = cookie.split('=')[1];
    }
    
    if (!token){
        return next(new ErrorHandler("Please Login to access this resource", 202));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
})




exports.authorizeRoles = (...roles) =>{
    return (req, res, next) => {
        if (!roles.includes(req.user.role)){
            return next (new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,
                403,
            ))
        }
        next();
    };
}