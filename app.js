const express = require('express');
const app = express();
const userRouter = require('./Routes/userRouter.js');
app.use(express.json());

app.listen(3000, function(){
    console.log("Server is running at port 3000.")
})

app.use('/user', userRouter);