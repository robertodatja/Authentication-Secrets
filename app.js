require('dotenv').config() //2_2
const express = require("express");//0.1.1
const bodyParser = require("body-parser");//0.1.2
const ejs = require("ejs");//0.1.3
const mongoose = require('mongoose');//0.1.4
//const encrypt = require("mongoose-encryption");//0.1.5
var md5 = require('md5');//3.3 do delete|comment  0.1.5 & 2_5.2 && 2_5.1

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

console.log(md5("123456")); //3.5 Hashing

mongoose.connect("mongodb://localhost:27017/userDB");//1.1Create a database called userDB
//const userSchema = { email: String, password: String};//1.2 userSchema is just a simple Javascript object
const userSchema = new mongoose.Schema({ email: String, password: String });//2.1, so delete|comment 1.2
//var secret = "Thisisourlittlesecret";//2.2
//userSchema.plugin(encrypt, { secret: secret });//2.3 encrypts entire the database

//2_3 Create a file named .env inside route directory (in our case inAuthentication-Secrets directory)
/*2_4 Inside .env file: We define the environment variables that we want to save.
Copy code secret //2.2, and paste into .env file. And let's formatt it. Also, let's create an API there. API_KEY=ajddndjddklla*/
//2_5 Get access to our environment variables
//console.log(process.env.API_KEY);//2_5.1
//userSchema.plugin(encrypt, { requireAuthenticationCode:false, secret: process.env.SECRET, encryptedFields: ["password"] }); //2_5.2 put process.env.SECRET instead of secret in 2.2 and delete|comment 2.2 &2.3

const USER = new mongoose.model("USER", userSchema); //1.3


/*---------------get----------------------------------------------------------*/
app.get("/", function(req,res){//0.3
  res.render("home");
});

app.get("/login", function(req,res){//0.3
  res.render("login");
});
app.get("/register", function(req,res){//0.3
  res.render("register");
});

/*--------------post----------------------------------------------------------*/
app.post("/register", function(req,res){//1.2.2
  const newUser = new USER ({
    email: req.body.username,
    password: md5(req.body.password) //3.3.2 use md5()
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("secrets");//1.4
    }
  });
});

app.post("/login", function(req,res){//1.5
  const username = req.body.username;
  const password = req.body.password;
  USER.findOne({email: username}, function(err, foundUser){
    if (err){
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

app.listen(3000, function() { console.log("Server started on port 3000"); }); //0.2
