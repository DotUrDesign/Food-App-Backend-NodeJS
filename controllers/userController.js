const userModel = require('../models/userModel.js');

module.exports.updateUser = async function(req, res){
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        if(user)
        {
            let dataToBeUpdated = req.body;
            let keys = [];
            for(let key in dataToBeUpdated)
                keys.push(key);
            console.log(keys);
            for(let i=0;i<keys.length;i++)
                user[keys[i]] = dataToBeUpdated[keys[i]];
            let updatedUser = await user.save();
            res.json({
                message: "Updation is successful",
                updatedUser: updatedUser
            })
        }
        else{
            res.json({
                message: "No user found in the database as per your id mentioned."
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.deleteUser = async function deleteUser(req,res){
    try {
        let id = req.params.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        if(deletedUser)
        {
            res.json({
                message: "User has been deleted",
                deletedUserDetails : deletedUser
            })
        }   
        else{
            res.json({
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

// need some debugging
module.exports.userProfile = async function userProfile(req, res){
    try {
        let id = req.id;
        let userData = await userModel.findById(id);
        if(userData)
        {
            res.json({
                message: "User found",
                userInfo: userData
            })
        }
        else{
            res.json({
                message: "No such user found"
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res){
    
}