/*
    Nodejs - Node.js is a cross-platform, open-source JavaScript runtime environment that 
    can run on Windows, Linux, Unix, macOS, and more. Node.js runs on the V8 JavaScript 
    engine, and executes JavaScript code outside a web browser. Node.js lets developers 
    use JavaScript to write command line tools and for server-side scripting.

    Express.js - Express.js, or simply Express, is a back end web application framework 
    for building RESTful APIs with Node.js, released as free and open-source software 
    under the MIT License. It is designed for building web applications and APIs.
*/

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

