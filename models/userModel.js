const mongoose = require('mongoose');
const {DB_LINK} = require('../secrets.js');
const crypto = require('crypto');

mongoose.connect(DB_LINK)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
});


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: function(){
            this.password === this.confirmPassword
        }
    },
    role: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    }
});

// not to save the password
userSchema.pre('save', function(){
    this.confirmPassword = undefined;
});

// userSchema method - createResetToken
userSchema.methods.createResetToken = function(){
    // token -> random 32 bits in hexadecimal form -> crypto npm package
    let resetToken = crypto.randomBytes(32).toString("hex");
    this.resetToken = resetToken;
    return resetToken;
}

// userSchema method - resetPassword
userSchema.methods.resetPasswordHandler = function(password, confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}


const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel;