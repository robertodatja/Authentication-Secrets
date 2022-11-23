require('dotenv').config() //2_2
const express = require("express");//0.1.1
const bodyParser = require("body-parser");//0.1.2
const ejs = require("ejs");//0.1.3
const mongoose = require('mongoose');//0.1.4
//const encrypt = require("mongoose-encryption");//0.1.5
//const md5 = require('md5');//3.3 so delete|comment  0.1.5 & 2_5.2 && 2_5.1
const bcrypt = require('bcrypt');//4.3.1 instead of 3.3
const saltRounds = 10;//4.3.2 instead of 3.3

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

//console.log("weak paword hashh" + md5("123456")); //3.5 Hashing
//console.log("strong paword hashh" + md5("shagrf3h4mtd.lyl78;hkhkfjdnjrfjej"));

mongoose.connect("mongodb://127.0.0.1/userDB");//1.1Create a database called userDB instead //mongoose.connect("mongodb://localhost:27017/userDB");//1.1Create a database called userDB
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
/*app.post("/register", function(req,res){//1.2.2
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
});*/

//4.4
app.post("/register", function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //4.4.2 and //4.4.2
    const newUser = new USER({ //4.4.3
      email: req.body.username,
      password: hash  //4.4.4   we see  hash in database, password: 'e10ad...0f883e',
    });
    newUser.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });

});

app.post("/login", function(req, res) { //1.5
  const username = req.body.username;
  const password = req.body.password; //4.8.1 instead of md5(req.body.password;)
  USER.findOne( {email: username}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        //foundUser.password is the password when we're registered//password is the password when we're logged in.
        bcrypt.compare(password, foundUser.password, function(errori, result) { //4.8.2     //instead of if (foundUser.password === password){  res.render("secrets"); }
          if (result === true) { //4.8.3
            res.render("secrets");
            console.log("okay");
          }
          else{
              console.log(errori);
          }
        });
      }
    }
  });
});

app.listen(3000, function() { console.log("Server started on port 3000"); }); //0.2
