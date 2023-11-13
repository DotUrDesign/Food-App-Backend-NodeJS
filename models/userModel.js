const mongoose = require('mongoose');
const DB_LINK = require('../secrets.js');

mongoose.connect(DB_LINK)
.then(function(db){
    console.log("db connected");
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function(){
            return this.confirmPassword === this.password;
        }
    }
});

userSchema.pre('save', function(){
    this.confirmPassword = undefined;
})

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;