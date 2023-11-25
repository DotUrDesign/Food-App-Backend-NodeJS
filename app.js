const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRouter.js');

app.use(express.json());
app.use(cookieParser());
app.listen(3000, function(){
    console.log("Server is running at port 3000.")
});

app.use('/user', userRouter);

