const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../secrets.js');

module.exports.signup = async function signup(req, res){
    try {
        let data = req.body;
        if(data){
            let userData = await userModel.create(data);
            res.json({
                message: "Signed up successfully.",
                data: userData
            })
        }
        else{
            res.json({
                message: "Fill your credentials correctly."
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.login = async function login(req, res){
    try {
        let {email, password} = req.body;
        if(email)
        {
            let user = await userModel.find({email : email});
            if(user)
            {
                if(user[0].password === password)
                {
                    // forming a cookie referring that user has been logged in
                    /*
                        Cookies are small pieces of data that the server sends to the user's 
                        web browser. The browser stores these cookies and sends it to the
                        server for every subsequent request.

                        Used for 
                        - Session management => When you log into a website, the server sends a 
                        cookie within which sessionId is stored. Now, if the user navigates to 
                        different pages of the same website, the user don't have to login again 
                        for every new page. This ID helps the server remember who you are as you
                        navigate through different pages.

                        - Personalization => Cookies also stores user preferences like language settings, 
                        or theme choices. When you return to a website, the server can use these cookies
                        to present the site according to your preferences. 

                    */
                    let id = user['id'];
                    let token = await jwt.sign({payload: id}, JWT_KEY);
                    res.cookie("isLoggedIn", token);
    
                    res.json({
                        message: "User has been logged in",
                        userInfo : user
                    })
                }
                else{
                    res.json({
                        message: "Wrong credentials"
                    })
                }
            }
            else{
                res.json({
                    message: "User not found."
                })
            }
        }
        else{
            res.json({
                message: "Fill all the credentials."
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

// need some debugging
module.exports.protectRoute = async function protectRoute(req, res, next){
    try {
        if(req.cookies.isLoggedIn)
        {
            let token = req.cookies.isLoggedIn; 
            console.log(`token:${token}`);
            let payload = await jwt.verify(token, JWT_KEY);
            if(payload)
            {
                console.log('payload',payload);
                const user = await userModel.findById(payload.payload);
                console.log(user);
                req.id = user.id;
                req.role = user.role;
                next();
            }
            else{
                res.json({
                    message: "Please login again"
                })
            }
        }
        else{
            res.json({
                message: "Please login first"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.isAuthorized = function isAuthorized(roles){
    try {
        return async function(req, res, next){
            let token = req.cookies.isLoggedIn;
            if(token)
            {
                let payload = await jwt.verify(token, JWT_KEY);
                let user = await userModel.findById(payload.payload);
                console.log(user);
                if(roles.include(user[0].role))
                    next();
                else{
                    res.json({
                        message: "You are not the admin"
                    })
                }
            }
            else{
                res.json({
                    message: "Login first"
                })
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.forgotPassword = async function forgotPassword(req, res){
    try {
        let {email} = req.body;
        if(email)
        {
            let user = await userModel.find({email : email});
            if(user)
            {
                // generate the token
                let resetToken = user.createResetToken();  // UserSchema method
    
                // link -> https://abc.com/resetPassword/resetToken
                let resetLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
    
                // send the link to the user's mail
                // -> nodemailer
            }
            else{
                res.json({
                    message: "Please sign up first"
                })
            }
        }
        else{
            res.json({
                message: "Fill the email first"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.resetPassword = async function resetPassword(req, res){
    let {password, confirmPassword} = req.body;
    let token = req.params.token;
    let user = await userModel.find({resetToken : token});
    if(user)
    {
        user.resetPasswordHandler(password, confirmPassword);  // UserSchema method

        await user.save();
        res.json({
            message: "Password has been reset",
            userData : user
        })
    }
    else{
        res.json({
            message: "User not found"
        })
    }
}

module.exports.logout = async function logout(req, res){
    res.cookie('isLoggedIn', ' ', {maxAge: 1});   // cookie expires in 1 millisec.
    res.json({
        message: "User has been successfully logged out."
    })
}