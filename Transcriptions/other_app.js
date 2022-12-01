/*Udemy-Q&A
Secrets - Security Flaw - Passport.js, Cookies and Sessions
Richard · Lecture 386 · 1 year ago
*/

//Set up express session
app.use(session({
  //js object with a number of properties (secret, resave, saveUninitialized)
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));


Now my code for your review and thoughts:



//jshint esversion:6

//Create some constants to require packages/modules

/*
It is important to put (require("dotenv").config();) on the top otherwise
you may not be able to access it if it is not configured
*/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
//We don't need to require passport-local because it's one of those dependencies that will be needed by passport-local-mongoose
const passportLocalMongoose = require("passport-local-mongoose");

//Create a new app instance using express
const app = express();

//Tell the app to use EJS as its view engine as the templating engine
app.set("view engine", "ejs");

//Require body-parser module to parser the requests
app.use(bodyParser.urlencoded({
  extended: true
}));

//Tell the app to use all the statics files inside the public folder
app.use(express.static("public"));


//Set up express session
app.use(session({
  //js object with a number of properties (secret, resave, saveUninitialized)
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

//Initialize and start using passport.js
app.use(passport.initialize());
//Tell the app to use passport to also setup the sessions
app.use(passport.session());

//Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*
Fix the below error after running nodemon app.js
DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
*/
mongoose.set("useCreateIndex", true);

/*Replace the simple version of the schema above to the below one
The userSchema is no longer a simple javascript object,
it is now an object created from the mongoose.Schema class
*/
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

/*
In order to set up the passport-local-mongoose, it needs to be added to
the mongoose schema as a plugin
That is what we will use now to hash and salt the passwords
and to save the users into the mongoDB database
*/
userSchema.plugin(passportLocalMongoose);

//Setup a new User model and specify the name of the collection User
const User = new mongoose.model("User", userSchema);

/*
passport-local Configuration
Create a strategy which is going to be the local strategy to
authenticate users using their username and password and also to
serialize and deserialize the user
Serialize the user is to basically create the cookie and add inside the
message, namely the user's identification into the cookie
Deserialize the user is to basically allow passport to be able to crumble
the cookie and discover the message inside which is who the user is all of the user's
identification so that we can authenticate the user on the server
*/
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Add some GETs to view the EJS files/websites
//Target the home/root route to render the home page
app.get("/", function(req, res) {
  res.render("home");
});

//Target the login route to render the login page
app.get("/login", function(req, res) {
  res.render("login");
});

//Target the register route to render the register page
app.get("/register", function(req, res) {
  res.render("register");
});

//Target the secrets route to render the secrets page
app.get("/secrets", function(req, res) {

  /*
  Course code was allowing the user to go back to the secrets page after loggin out,
  that is because when we access a page, it is cached by the browser, so when the user is accessing a cached page (like the secrets one)
  you can go back by pressing the back button on the browser, the code to fix it is the one below so the page will not be cached
  */


  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stal   e=0, post-check=0, pre-check=0');

  /*
  Check if the user is authenticated and this is where we are relying on
  passport.js, session, passport-local and passport-local-mongoose to make sure
  that if the user is already logged in then we should simply render the secrets page
  but if the user is not logged in then we are going to redirect the user to the login page
  */
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.render("login");
  }
});

//Target the logout route
app.get("/logout", function(req, res) {
  //deauthenticate the user and end the user session
  req.logout();
  //redirect the user to the root route (home page)
  res.redirect("/");
});

//POST request (register route) to post the username and password the user enter when registering
app.post("/register", function(req, res) {

  //  Now we will incorporate hashing and salting and authentication using passport.js and the packages just added (passport passport-local passport-local-mongoose express-session)

  /*
  Tap into the User model and call the register method, this method comes from
  passport-local-mongoose package which will act as a middle-man to create and save the new user
  and to interact with mongoose directly
  js object -> {username: req.body.username}
  */
  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      consolo.log(err);
      //Redirect the user back to the register page if there are any error
      res.redirect("/register");
    } else {
      /*
      Authentica the user using passport if there are no errors
      the callback (function()) below is only triggered if the authentication
      is successfull and we managed to successfully setup a cookie that saved
      their current logged in session
      */
      passport.authenticate("local")(req, res, function() {
        /*
        As we are authenticating the user and setting up a logged in session for him
        then the user can go directly to the secret page, they should automatically
        be able to view it if they are still logged in - so now we need to create a secrets route
        */
        res.redirect("/secrets");
      });
    }
  });
});

//POST request (login route) to login the user

/*
passport.authenticate("local")
Course code was allowing the user to enter the right username (email) and wrong password
and go to the secrets page by typing in http://localhost:3000/secrets in the browser after getting the Unauthorized page message,
now the addition of passport.authenticate("local")to the app.post... route fixes this issue
*/

app.post("/login", passport.authenticate("local"), function(req, res) {

  //Now we will incorporate hashing and salting and authentication using passport.js and the packages just added (passport passport-local passport-local-mongoose express-session)

  //Create a new user from the mongoose model with its two properties (username, password)
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  //Now use passport to login the user and authenticate him - take the user created from above
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      //Authenticate the user if there are no errors
      passport.authenticate("local")(req, res, function() {
        res.redirect("/secrets");
      });
    }
  });
});

//Set up the server to listen to port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000!!!");
});
