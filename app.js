//jshint esversion:6
//Create some constants to require packages/modules
/* It is important to put (require("dotenv").config();) on the top
otherwise you may not be able to access it if it is not configured */

require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session'); //5.2.1
const passport = require('passport'); //5.2.2
//We don't need to require passport-local because it's one of those dependencies that will be needed by passport-local-mongoose
const passportLocalMongoose = require('passport-local-mongoose'); //5.2.3

const app = express();//Create a new app instance using express
app.use(express.static("public")); //Tell the app to use all the statics files inside the public folder
app.set('view engine', 'ejs');//Tell the app to use EJS as its view engine as the templating engine
app.use(bodyParser.urlencoded({ //Require body-parser module to parser the requests
  extended: true
}));

app.use(session({ //5.3 //Set up express session
  //js object with a number of properties (secret, resave, saveUninitialized)
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());//5.4.1  Initialize and start using passport.js
app.use(passport.session());//5.4.2  Tell the app to use passport to also setup the sessions

mongoose.connect("mongodb://127.0.0.1/userDB",{  //Connect to mongoDB
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({ email: String, password: String }); //The userSchema is no longer a simple javascript object, it is now an object created from the mongoose.Schema class

/*In order to set up the passport-local-mongoose, it needs to be added to the mongoose schema as a plugin
That is what we will use now to hash and salt the passwords and to save the users into the mongoDB database */
userSchema.plugin(passportLocalMongoose); //5.5.1

const User = new mongoose.model("USER", userSchema); //Setup a new User model and specify the name of the collection User

/*passport-local Configuration
Create a strategy which is going to be the local strategy to authenticate users using their username and password and also to serialize and deserialize the user
Serialize the user is to basically create the cookie and add inside the message, namely the user's identification into the cookie
Deserialize the user is to basically allow passport to be able to crumble the cookie and discover the message
inside which is who the user is all of the user's identification so that we can authenticate the user on the server*/
passport.use(User.createStrategy()); //5.5.2
passport.serializeUser(User.serializeUser()); //5.5.2
passport.deserializeUser(User.deserializeUser()); //5.5.2


/*----------------------------------------------------------------------------*/
/*---------------Add some GETs to view the EJS files/websites-----------------*/
app.get("/", function(req,res){ //Target the home/root route to render the home page
  res.render("home");
});

app.get("/login", function(req,res){ //Target the login route to render the login page
  res.render("login");
});

app.get("/register", function(req,res){ //Target the register route to render the register page
  res.render("register");
});

app.get("/secrets", function(req, res) { //5.6.2 //Target the secrets route to render the secrets page
  /*Course code was allowing the user to go back to the secrets page after loggin out,
  that is because when we access a page, it is cached by the browser, so when the user is accessing a cached page (like the secrets one)
  you can go back by pressing the back button on the browser, the code to fix it is the one below so the page will not be cached*/
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stal   e=0, post-check=0, pre-check=0');
  /*Check if the user is authenticated and this is where we are relying on passport.js, session, passport-local and passport-local-mongoose
  to make sure that if the user is already logged in then we should simply render the secrets page
  but if the user is not logged in then we are going to redirect the user to the login page*/

  if (req.isAuthenticated()) { //if a user is already logged in
    res.render("secrets");
  } else {
    res.render("login");
  }
});


app.get("/logout", function(req, res) { //Target the logout route
  req.logout(); //deauthenticate the user and end the user session
  res.redirect("/"); //redirect the user to the root route (home page)
});



/*----------------------------------------------------------------------------*/
/*--------------------------------post----------------------------------------*/
app.post("/register", function(req, res) { //5.6.1 POST request (register route) to post the username and password the user enter when registering

  //Now we will incorporate hashing and salting and authentication using passport.js and the packages just added (passport passport-local passport-local-mongoose express-session)
  /*Tap into the User model and call the register method, this method comes fromp assport-local-mongoose package
  which will act as a middle-man to create and save the new user and to interact with mongoose directly js object -> {username: req.body.username} */

  User.register( {username: req.body.username}, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register"); //Redirect the user back to the register page if there are any error
    }else{

      /*Authentica the user using passport if there are no errors the callback (function()) below is only triggered
      if the authentication is successfull and we managed to successfully setup a cookie that saved their current logged in session */
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
        /*As we are authenticating the user and setting up a logged in session for him then the user can go directly to the secret page,
        they should automatically be able to view it if they are still logged in - so now we need to create a secrets route*/
      });
    }
  });
});





app.post("/login", function(req, res){ //POST request (login route) to login the user
  //Now we will incorporate hashing and salting and authentication using passport.js and the packages just added (passport passport-local passport-local-mongoose express-session)

  const user = new User({ //5.7.1 Create a new user from the mongoose model with its two properties (username, password)
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) { //5.7.2 Now use passport to login the user and authenticate him - take the user created from above
    if (err) { return next(err); }
    else {
     /*passport.authenticate("local")
     Course code was allowing the user to enter the right username (email) and wrong password
     and go to the secrets page by typing in http://localhost:3000/secrets in the browser after getting the Unauthorized page message,
     now the addition of passport.authenticate("local")to the app.post... route fixes this issue*/
      passport.authenticate("local")(req, res, function(){ //Authenticate the user if there are no errors
        res.redirect("/secrets");
      });
    }
  });

});


//Set up the server to listen to port 3000
app.listen(3000, function(){ console.log("Server started on port 3000"); });
