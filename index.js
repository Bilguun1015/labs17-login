require("dotenv").config();
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

//cookie parser
app.use(cookieParser());

//express session
app.use(session({secret: "Shh it is a secret", resave: true, saveUninitialized: true}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.send("Welcome to this page for the first time!");
    }
 });

 const PORT = process.env.PORT || 3000;

 app.listen(PORT, console.log(`Server started on port ${PORT}`));