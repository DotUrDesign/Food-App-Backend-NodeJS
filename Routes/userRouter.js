const express = require('express');
const userModel = require('../models/userModel.js');
const userRouter = express.Router();
const {signup, login, protectRoute, isAuthorized, forgotPassword, resetPassword, logout} = require('../controllers/authController.js');
const {updateUser, deleteUser, userProfile, getAllUsers} = require('../controllers/userController.js');


userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/signup')
.post(signup);

userRouter
.route('/login')
.post(login);

userRouter
.route('/forgotPassword')
.post(forgotPassword);

userRouter
.route('/resetPassword')
.post(resetPassword);

userRouter
.route('/logout')
.get(logout);

userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(userProfile);

userRouter.use(isAuthorized(['admin']));
userRouter
.route('/getAllUsers')
.get(getAllUsers);


module.exports = userRouter;