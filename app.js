/*1.1-------------Require and Install these package in Hyperterminal----------*/
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


/*2---------------Create a database called userDB----------------------------*/
//Before make sure require&install mongoose package
//and make sure to start mongodb server:  Hyperterminal-open new tab- write mongod-press enter
mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = {
  email: String,
  pasword: String
};
const USER = new mongoose.model("USER", userSchema);


/*1.3------------get----------------*/
app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});
app.get("/register", function(req,res){
  res.render("register");
});

/*3------------post-------------------*/
app.post("/register", function(req,res){
  const newUser = new USER ({
    email: req.body.username,
    pasword: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");
      /* And you can see it now renders the secret page and it's showing my deepest darkest secrets which is not much of a secret over here.
      So this page is only accessible once you have registered and we can verify this by going over to:
      1. Robo 3T -connecting to our MongoDB on our local host27017-click userDB-click users collection.
      2. Hyperterminal-newtab-mongosh-show dbs-show use userDB-show collections-db.users.find() */
    }
  });
});
/*------------post-------------------*/
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


/*1.2-----------------Port------------*/
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
