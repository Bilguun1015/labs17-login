require("dotenv").config();
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();

//cookie parser
app.use(cookieParser());

//express session
app.use(session({secret: "Shh it is a secret", resave: true, saveUninitialized: true}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors())

app.post(
   '/login',
   passport.authenticate('local', {
       session: true
   }),
   (req, res) => {
       if (req.isAuthenticated()) {
           res.status(200).json({ message: 'You have successfully logged in' });
       } else {
           res.status(500).json({ message: 'Invalid credentials' });
       }
   }
);

 const PORT = process.env.PORT || 3000;

 app.listen(PORT, console.log(`Server started on port ${PORT}`));