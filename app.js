/*0 mkdir - npm init -y - npm i express body pasrser ejs mongoose mongoose-encryption
/*0.1-------------Require and Install these package in Hyperterminal----------*/
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


/////////Level 1 Encryption - Rgisters users with username and password/////////
/*And in order to do this we're going to be using Level 1 security,
so the lowest level possible of security for our website.
And this is simply just going to be creating an account for the user,
storing their email and password in our database
so that when they come back at a later date we can check their email against their password
and see if we should let them pass or not.*/
/*1.1---------------Create a database called userDB----------------------------*/
//Before make sure require&install mongoose package
//and make sure to start mongodb server:  Hyperterminal-open new tab- write mongod-press enter
mongoose.connect("mongodb://localhost:27017/userDB");
/*1.2 userSchema is just a simple Javascript object
const userSchema = {
  email: String,
  password: String
};
*/

//////////////////////Level 2 Database Encryption //////////////////////////////
/*2.1
https://www.npmjs.com/package/mongoose-encryption
https://mongoosejs.com/docs/guide.html
userSchema is actually an object that's created from the mongoose.Schema  class.*/
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

/*2.2 So there's two ways of going about encrypting your database using this Mongoose encryption package.
One way is to create an encryption key and assigning key.
https://www.npmjs.com/package/mongoose-encryption -Basic
Other way is by using the convenient method of defining a secret which is simply a long string and
then we're going to use that secret to encrypt our database:
https://www.npmjs.com/package/mongoose-encryption -Secret String Instead of Two Keys
https://mongoosejs.com/docs/plugins.html*/
var secret = "Thisisourlittlesecret";
//userSchema.plugin(encrypt, { secret: secret }); //encrypts entire the database
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] }); //https://www.npmjs.com/package/mongoose-encryption  -Encrypt Only Certain Fields
/*So now that we've added our encryption package to our userSchema, we've defined the secret that we're going to use to encrypt our password
and also the field that we actually want to encrypt, we're pretty much done.
So we don't actually have to do anything else special in the register or the login sections because
the way that Mongoose encrypt works is that
it will encrypt when you call save(), and then it will decrypt when you call find().*/

//1.3 or 2.3
const USER = new mongoose.model("USER", userSchema);

/*2.4
nodemon ap.js -localhost:3000 -  register - email a@b.com  pasword qwerty - register
and we've been taken to the secret page. So that means we've successfully saved our new user into our database.
So let's see how Mongoose encryption handles decryption.
localhost:3000 - login - email a@b.com  pasword qwerty - login
So it's taken me to the secret website and we know that on our database that password is stored encrypted.
So that means that,
when we perform that findOne step, Mongoose encrypt was successful in decrypting the password to be able to compare it at this stage.
And if you want to, you can actually log the value of foundUser.password  console.log(foundUser.password)
inside the findOne completion block and you'll see it in plain text.
So this does mean that if somebody was to hack into your website, then they probably will get access to your app.js
It's not that hard to access it. And once they do, they'll find your secret.
And once they've found your secret then they can use the same package to decrypt all of your users passwords.
So as long as we're able to recover the plain text version of our users passwords we're still kind of leaving them out to dry.
So in the next lesson I want to cover something called environment variables and we're going to learn that to enable us to store secrets
such as our encryption keys or things like API keys that are tied to credit cards, anything that you want to keep secure essentially.
*/

/*0.3------------get----------------*/
app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});
app.get("/register", function(req,res){
  res.render("register");
});

/*1.2------------post-------------------*/
app.post("/register", function(req,res){
  const newUser = new USER ({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");
      /* 1.4 And you can see it now renders the secret page and it's showing my deepest darkest secrets which is not much of a secret over here.
      So this page is only accessible once you have registered and we can verify this by going over to:
      1. Robo 3T -connecting to our MongoDB on our local host27017-click userDB-click users collection.
      2. Hyperterminal-newtab-mongosh-show dbs-show use userDB-show collections-db.users.find() */
    }
  });
});
/*1.3 Hyperterminal: nodemon app.js  -  localhost:3000 enter
1@2.com or test@email.com just to test it for now, password 123.
Click register. And we see the secret page */

/*1.5------------post-------------------*/
app.post("/login", function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err, foundUser){
    if (!err){
      console.log(err);
    }else{
      if (foundUser){
        if (foundUser.password === password){
              res.render("secrets");
        }
      }
    }
  });

});

/*1.6 Check in Terminal that ourServer is running on port 3000
localhost:3000 - login  with email&passord that we registered previously 1@2.com 123  - login
Now we see the secret page
So success right? Now there's just one problem.
If we look at our users collection and we look at the documents in there, there's only one at the moment
but we can see the user's password in plain text.
And this is really really bad because if I had millions of users say I was, I don't know, Amazon or Facebook
or Google and I had all of my users passwords saved in plain text like this
then any one of my employees can look through my database and know what everybody's password is.*/

/*0.2-----------------Port------------*/
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
