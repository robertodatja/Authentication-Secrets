/* Intro 0
$mkdir Authentication-Secrets
$npm init -y
$npm i express body pasrser ejs mongoose mongoose-encryption
Inside the app.js:*/
const app = express(); app.use(express.static("public")); app.set('view engine', 'ejs'); app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req,res){ res.render("home"); }); app.get("/login", function(req,res){ res.render("login"); });  app.get("/register", function(req,res){ res.render("register"); });
app.listen(3000, function() { console.log("Server started on port 3000"); }); //0.2


//------------------------------------------------------------------------------
/*Level1:  Encryption - Registers users with username and password
And in order to do this we're going to be using Level 1 security, so the lowest level possible of security for our website.
And this is simply just going to be creating an account for the user,storing their email and password in our database
so that when they come back at a later date we can check their email against their password and see if we should let them pass or not.
Before make sure require&install mongoose package and  to start mongodb server:  Hyperterminal-open new tab- write mongod-press enter*/
mongoose.connect("mongodb://localhost:27017/userDB");//1.1Create a database called userDB
const userSchema = { email: String, password: String};//1.2 userSchema is just a simple Javascript object
app.post("/register", function(req,res){...}); //1.2.2
const USER = new mongoose.model("USER", userSchema);//1.3
//1.3 $nodemon app.js - localhost:3000 register - 1@2.com or test@email.com just to test it for now, password 123.-register. And we see the secret page.

/* 1.4 res.render("secrets"); And you can see it now renders the secret page
and it's showing my deepest darkest secrets which is not much of a secret over here.
So this page is only accessible once you have registered and we can verify this by going over to:
1. Robo 3T -connecting to our MongoDB on our local host27017-click userDB-click users collection.
2. Hyperterminal-newtab-mongosh-show dbs-show use userDB-show collections-db.users.find() */

//1.5 app.post("/login", function(req,res){ ...});

/*1.6 Check in Terminal that ourServer is running on port 3000
localhost:3000 - login  with email&passord that we registered previously  eamil 1@2.com  pasword 123  - login
Now we see the secret page. So success right?
Now there's just one problem.
If we look at our users collection and we look at the documents in there, there's only one at the moment
but we can see the user's password in plain text.
And this is really really bad because if I had millions of users say I was, I don't know, Amazon or Facebook
or Google and I had all of my users passwords saved in plain text like this
then any one of my employees can look through my database and know what everybody's password is.*/

//Hyperterminal
$git log
$git config --global user.email "robert.datja@gmail.com"
$git config --global user.name "Roberto Datja"
$git init
$git add .
$git commit -m "Level 1 - Username and Password Only"


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*Level 2: Database Encryption
https://www.npmjs.com/package/mongoose-encryption  https://mongoosejs.com/docs/guide.html
userSchema is actually an object that's created from the mongoose.Schema  class.*/
const userSchema = new mongoose.Schema({ email: String, password: String });//2.1, so delete|comment 1.2

/*So there's two ways of going about encrypting your database using this Mongoose encryption package.
One way is to create an encryption key and assigning key. https://www.npmjs.com/package/mongoose-encryption -Basic
Other way is by using the convenient method of defining a secret which is simply a long string and
then we're going to use that secret to encrypt our database:
https://www.npmjs.com/package/mongoose-encryption -Secret String Instead of Two Keys https://mongoosejs.com/docs/plugins.html*/
var secret = "Thisisourlittlesecret";//2.2
userSchema.plugin(encrypt, { secret: secret });//2.3 encrypts entire the database
/*So now that we've added our encryption package to our userSchema, we've defined the secret that we're going to use to encrypt our password
and also the field that we actually want to encrypt, we're pretty much done.So we don't actually have to do anything else
special in the register or the login sections because the way that Mongoose encrypt works is that
it will encrypt when you call save(), and then it will decrypt when you call find().*/
/*2.4
$nodemon ap.js -localhost:3000 -  register - email a@b.com  pasword qwerty - register
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
//Hyperterminal
$git log
$git add .
$git commit -m "Level 2 - Database Encryption"


//GitHub
//Open a new Repository in Github called Authentication-Secrets
//Hyperterminal
$git remote add origin https://github.com/robertodatja/Authentication-Secrets.git
$git branch -M main
$git push -u origin main

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*Level 2_part2 - Using Enviroments Variables to Keep Secrets Safe
https://www.theregister.com/2015/01/06/dev_blunder_shows_github_crawling_with_keyslurping_bots/
https://vertis.io/2013/12/16/unauthorised-litecoin-mining/
We need these secrets to be able to encrypt our database. And for us to be able to collaborate with other people
or simply just using version control or backing up our project to GitHub then we will need to publish it right?
So the way that developers solve this conundrum is through using something called environment variables.
https://www.npmjs.com/package/dotenv*/
//2_1
$npm i dotenv
require('dotenv').config()  //2_2
/*2_2 It will be active and running and all we need to do now is to define our environment variable.
Now it's important that you put it right at the top because otherwise if you try to use an environment variable
and it's not configured then you won't be able to access it.*/
//2_3 Create a file named .env inside route directory (in our case inAuthentication-Secrets directory)
/*2_4 Inside .env file: We define the environment variables that we want to save.
Copy code secret //2.2, and paste into .env file. And let's formatt it.
Also, let's create an API there. API_KEY=ajddndjddklla*/
//2_5 Get access to our environment variables
console.log(process.env.API_KEY);//2_5.1
/*2_5.2 put process.env.SECRET instead of secret in 2.2 and delete|comment 2.2
https://www.npmjs.com/package/mongoose-encryption  -Encrypt Only Certain Fields*/
userSchema.plugin(encrypt, { requireAuthenticationCode:false, secret: process.env.SECRET, encryptedFields: ["password"] });  //2_5.2 put process.env.SECRET instead of secret in 2.2 and delete|comment 2.2 &2.3
//2_6 $nodemon app.js - localhost:3000 - login - email a@b.com  pasword qwerty - login
/*2_7 Hyperterminal - touch .gitignore,
copy https://github.com/github/gitignore -Node Modules,
paste inside  the .gitignore
Atom is helpful enough to show you the files that will be ignored by showing it to you in this kind of greyed out mode.*/

//Hyperterminal
$git log
$git add .
$git commit -m "Level 2_part2 - Using Enviroments Variables to Keep Secrets Safe"

$git push -u origin main
//2_8 when you start any new project: Create secure(hidden)file, for example .env file, then add it into .gitignore file, before you push that project to GitHub.
//2_9 Using the Heroku Dashboard



//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*LEVEL 3 Hashing Paswords
//3.1 History
Mary Queen of Scots  &  Queen Elizabeth the first.
So weak encryption systems can end up putting user passwords at risk
The case of companies like TalkTalk or Equifax  "THE CODE BOOK" by Simon Singh.
//3.2.1
Now how can we make our password more secure?
How is it possible that you can turn a password into a hash very quickly and easily  13*29=377
but make it almost impossible to turn that hash back into a password?                377=13*29
//3.2.2 We compare two hashes.
If those two hashes match then means  that the login password is the same as the registration password.
And at no point in this process do we have to store their password in plaintext
or are we able to reverse the process to figure out their original password.
The only person who knows their password is the user themselves.
//3.2.3
https://cryptii.com/
+Text(original) - Encode/Enigma machine/UKW B/...  -  +Text(encoded)  - Encode/Enigma machine/UKW B/... -  +Text(original)

+Text(original) - Encode/Hash function MD5/UKW B/...  -  +Bytes(encoded)  - Encode/Hash function MD5/UKW B/...
we get the error that "Decoding step is not defined for Hash function" because you can't really go back.
That's the whole point of the Hash function and this is what will make our authentication more secure.*/
//3.3
//https://www.npmjs.com/package/md5
$npm i md5
//remove the mongoose-encryption package (0.1.5) and remove the plugin from our user schema (2_5.1) and instead require "md5".
var md5 = require('md5');//3.3 do delete|comment  0.1.5 & 2_5.2 & 2_5.1
app.post("/register", function(req,res){   const newUser = new USER ({ email: req.body.username, password: md5(req.body.password) }); }); //3.3.2 use md5()

/*3.4
$nodemon app.js -localhost:3000 enter - register user@hash.com and  password: 123456 -register
$mongod - $mongosh - use userDB - db.users.find()
{_id: ObjectId("63652ef499eb9adc6c024740"), email: 'user@hash.com', password: 'e10adc3949ba59abbe56e057f20f883e', __v: 0 }
The password is now a hash. And this will be impossible to reverse.
We can't decrypt it and we don't have any sort of encryption key that leaves it vulnerable.*/
/*3.5
Now the important thing that you need to remember with hashing is that
when you run the Hash function n the same string, the hash that's created is always going to be the same.*/
console.log(md5("123456"));   //e10adc3949ba59abbe56e057f20f883e
/*this matches exactly with the hash that was generated here previously when I tried to register the
user and hashed the password that they typed in.*/
/*3.6
Hyperterminal: nodemon app.js
localhost:3000 enter - login - email: user@hash.com and  password: 123456 - login
So we've managed to successfully log in because those hashes match.
And this is very simply how hashing works. Our passwords are a lot more secure.*/
//HyperTerminal
$git log
$git add .
$git commit -m "Level 3  Hashing Paswords"


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*LEVEL 3_part2 Hacking 101
https://plaintextoffenders.com/
https://haveibeenpwned.com/
https://www.passwordrandom.com/most-popular-passwords
https://en.wikipedia.org/wiki/List_of_the_most_common_passwords
-
You can even use Google as a basic hash table. You can paste in Google
the hash (d8578edf8458ce06fbc5bb76a58c5ca4) that you found from the hacked database,
you perform a simple google search and you come up with the original password (qwerty).
If it doesn't match anything.
And the reason is because when you've created a very strong password
with uppercase letters, lowercase letters, numbers, symbols
but most importantly a long password.
--
When you think about hashing as a mathematical formula,
you'll realize that as the number of characters of your password increases,
the computation time that it takes to crack it increases exponentially.
So it doesn't matter if your account on LinkedIn or Adobe Creative Cloud or Ashley Manson was cracked,
as long as you had a strong password, they wouldn't be able to work it out from a hash table.
---
http://password-checker.online-domain-tools.com/
and you can put in your password and it'll tell you not only the strength
but also how long it will take various types of machines to be able to crack that password.
-
So even though all of the websites encourage you
to add a capital letter, a lowercase letter, some numbers and some random characters,
if you only have six characters in your password, so a short password, it still doesn't take very long to crack.
//So the most important thing of creating a strong password that is almost uncrackable is just to increase
the number of characters.
And also to prevent yourself from being a victim of a dictionary attack
just make sure that you don't use a dictionary word or a place name or something that is in a directory
somewhere like a telephone number.All right.
So at least after this lesson you'll know how to keep yourself more secure!
--
But in the next lesson we're going to address these vulnerabilities that occur
because of weak hashing algorithms and we're going to learn how we can combat hackers
who try to attack our database using a dictionary attack or by creating a hash table.
//Write something from keyboard in hackertyper.net to llok like a hacker :D
*/
$git log
$git add .
$git commit -m "Level 3_part2  Hacking 101"
