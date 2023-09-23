 const Questions  = require( "../models/questionSchema.js");
 const Results  = require( "../models/resultSchema.js");
 const { answers }  = require( '../database/data.js');
 const questions = require( '../database/data.js')

 const ErrorHandler  = require( '../utils/errorHandler.js');
 const catchAsyncError  = require( "../middleware/catchAsyncError.js");
 const User  = require( "../models/userModel.js");
 const sendToken  = require( '../utils/jwtToken.js');
 const sendEmail  = require( '../utils/sendEmail.js');
 const crypto  = require( 'crypto');


/** get all questions */
exports.getQuestions = async(req, res) => {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** get all questions for a particular unique id*/
exports.getUserQuestions= async(req, res)=>{
    try {
        const q = await Questions.find({uniqueId: req.body.uniqueId});
        if(!q){
            return next(new ErrorHandler(`invalid Id`))
        }
        res.json(q);
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
exports.insertQuestions = async(req, res) => {
    try {
        if((req.body.uniqueId).length > 6 || (req.body.uniqueId).length < 6){
            return next(new ErrorHandler("Quiz Id's length must be of 6"));
        }
        // req.body.email = req.user.email;
        // console.log(req.body.email)
        const data = await Questions.create(req.body);

        res.json({
            success: true,
            questions: data,
            msg: "Data saved Successfully"
        })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
exports.dropQuestions = async(req, res) => {
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** get all result */
exports.getResult = async(req, res) => {
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** get all result of a particular Unique Id */
exports.getResultsForTecher = async(req, res) => {
    try {

        const data = await Questions.findOne({email: req.body.data.email})

        const r = await Results.find({uniqueId: data.uniqueId});

        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}


/** get all result of a particular student */
exports.getResultsForStudent = async(req, res) => {
    try {

        // const data = await Questions.findOne({email: req.body.data.email})

        const r = await Results.find({userEmail: req.body.data.email});

        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
exports.storeResult = async(req, res, next) => {
   try {
        // const { username, result, attempts, points, achived } = req.body;
        if(!req.body.username && !req.body.result) {
            return next(new ErrorHandler("Data is not complete"))
        }

        Results.create(req.body, function(err, data){
            res.json({ msg : "Result Saved Successfully...!"})
        })
   } catch(error){
    return next(new ErrorHandler(error))
   }
}

/** delete all result */
exports.dropResult = async(req, res) =>{
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}


//  compare unique id while student give quizz (created by teacher)
 
exports.compareUniqueId = async(req, res) => {
    try {

        const found = await Results.findOne({uniqueId: req.body.uniqueId, userEmail: req.user.email});

        if(found){
            return res.json({ msg: "You have already given the Quiz"});
        }

        const notAllowed = req.user.role == 'teacher' || req.user.role == 'admin';

        if(notAllowed){
            return res.json({ msg: "Only students allowed to give the Quiz"});
        }

        const find = await Questions.findOne({uniqueId: req.body.uniqueId});

        if(!find){
            return res.json({ msg: "Please Enter correct Quiz id"});
        } else {
            res.json({ success: true, msg: "Correct Id", uniqueId: req.body.uniqueId})
        }
    } catch (error) {
        res.json({ error })
    }
}


/** get the quiz uniqueId of a teacher  */
exports.getQuizId = async(req, res) => {
    try {
    
        const data = await Questions.findOne({email: req.user.email});
        console.log(req.user.email);

        if(!data){
            return res.json({ids: "you dont have unique id please create quiz first"});
        }
    
        res.json({ids: data.uniqueId});
    } catch (error) {
        res.json({ error })
    }
}




/////////////////////** USER AUTHENCTICATION *//////////////////////////////////////



// Register a user

exports.registerUser = catchAsyncError( async(req, res, next) =>{


    // const userData = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     class: req.
    // }


    // if (req.body.avatar !== ""){
    
    //     const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: "avatars",
    //         width: 150,
    //         crop: "scale"
    //     });
    
    //     userData.avatar = {
    //         public_id: myCloud.public_id,
    //         url: myCloud.secure_url,
    //     };

    // }
    const findUser = await User.findOne({email: req.body.email});
    if(findUser){
        return next(new ErrorHandler("User Already Exists"));
    }
    
    const user = await User.create(req.body);

    sendToken(user, 201, res);

});

// Login user
exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return next(new ErrorHandler("Email or Password is missing"));
    }

    const user = await User.findOne({email}).select("+password");
    if (!user){
        return next(new ErrorHandler("Invalid email or password"))
    }
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password"))
    }

    sendToken(user, 200, res);
});

//Logout
exports.logout = catchAsyncError(async (req, res, next) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot password

exports.forgotPassword = catchAsyncError( async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email })
    // console.log(user);

    if (!user){
        return next(new ErrorHandler("User not found"))
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false});
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;   /* ${req.get("host")} */

    const message = `Your password reset url is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then ignore it`;


    try{
        await sendEmail({
            email: user.email,
            subject: "Mustafa Quiz System Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            msg: `Email sent to ${user.email} successfully`,
            message,
        })

    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message)); /*500*/
    }
})

// Reset Password
exports.resetPassword = catchAsyncError( async(req, res, next)=>{
    // creating token hash
   
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
   
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now()},
    })

    

    if (!user){
        return next(new ErrorHandler("Reset Password token is invalid or expired")) /*400*/
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doest not match")); /*404*/
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    sendToken(user, 200, res);
})

// Get user details
exports.getUserDetails = catchAsyncError( async(req, res, next)=>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user password
exports.updateUserPassword = catchAsyncError( async(req, res, next)=>{
   
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Old password")) /*400*/
    }

    if(req.body.oldPassword === req.body.newPassword){
        return next(new ErrorHandler("Old Password and New password should be different")) /*400*/
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm-password are different")) /*400*/
    }

    user.password = req.body.newPassword;

    await user.save();


    sendToken(user, 200, res);
})

// Update user profile
exports.updateUserProfile = catchAsyncError( async(req, res, next)=>{

    await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

// Get All users
exports.getAllUser = catchAsyncError( async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    })
})

// Get Single user
exports.getSingleUser = catchAsyncError( async(req, res, next)=>{
    const user = await User.findById(req.params.id);

    if (!user){
        return next( new ErrorHandler(`User doesnt exists with id ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// Update user role --Admin
exports.updateUserRole = catchAsyncError( async(req, res, next)=>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userFindAndModify: false,
    })

    res.status(200).json({
        success: true,
    })
})

// Delete user --Admin
exports.deleteUser = catchAsyncError( async(req, res, next)=>{

    const check = await User.find();
    if(check.length == 1){
        return next(new ErrorHandler(`There must be atleast one user to operate plateform`))
    }

    if( req.user.role == 'admin'){
        return next(new ErrorHandler(`Admin can not be deleted`))
    }



    const user = await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    await user.remove();
    res.status(200).json({
        success: true,
        message: "user deleted successfully",
    })
})
