const userModel = require('../models/userModel.js');

module.exports.signup = async function(req, res){
    try {
        let user = req.body;
        if(user)
        {
            let userData = await userModel.create(user);
            res.json({
                message: "User has been created",
                userData: userData
            })
        }
        else{
            res.json({
                message: "Fill all the credentials"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.login = async function(req, res){
    try {
        let {email, password} = req.body;
        if(email)
        {
            let userData = await userModel.find({email : email});
            if(userData)
            {
                if(password == userData[0].password)
                {
                    // generate a cookie - yet to be done
                    res.json({
                        message: "User logged in successfully",
                        userData: userData
                    })
                }
                else{
                    res.json({
                        message: "Incorrect password"
                    })
                }
            }
            else{
                res.json({
                    message: "User not found"
                })
            }
        }
        else{
            res.json({
                message: "Enter your email first"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}