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
git log
git config --global user.email "robert.datja@gmail.com"
git config --global user.name "Roberto Datja"
git init
git add .
git commit -m "Level 1 - Username and Password Only"


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
git log
git add .
git commit -m "Level 3_part2  Hacking 101"
git push -u origin main


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*LEVEL 4 Salting and Hashing with bcrypt
So now that we've seen what some of the vulnerabilities might be for hashed passwords
it's time to level up and learn about a way that we can prevent these types of dictionary attacks or hash table cracks.
And in order to do that we have to learn about salting.
-
So let's try and generate Emily's hash from her password.
So we know that her password is qwerty and we generate a random salt.
So then let's go ahead and put in her password, qwerty, and then we append at the end that random salt that we generated
and we end up with a hash.
-
-
Well, we can use something other than MD5 right?
Another hashing algorithm that's valued because it's incredibly slow.
And this is where bcrypt comes in.
This is one of the industry standard hashing algorithms that developers use to keep their users passwords safe.
Because while you can calculate 20 billion MD5 hashes per second,
even the latest and the greatest GPUs in 2019 can still calculate only about 17,000 bcrypt hashes per second
which makes it dramatically harder for a hacker to generate those pre compiled hash tables.
An a salted hash table instead of taking something like three seconds  if it was hashed with MD5,
if it was hashed using bcrypt  it would take you something like 8 months, which is not really worth a hacker's while.
They'll probably go and search out a company that has less security enabled.
-
And to make our passwords even more secure when we're using bcrypt it has a concept of what's called Salt rounds.
How many rounds you're going to salt your password with?
//And obviously the more rounds you do the saltier your password and also the more secure it is from hackers.
So what exactly are salt rounds?
//-Round1
Well let's say that our original user password was qwerty and we generate a random set of characters as the salt.
So now we have qwerty and a random set of salt.
We pass it through our hash function, bcrypt, and we end up with a hash.
Now that's one round of salting.
//pasword + salt_round1 => hash1
//-Round2
If we wanted to have two rounds of salting, then we take the hash that was generated in round 1
and we add the same salt from before.
And now we run it through bcrypt the hash function again and we end up with a different hash.
//hash1 + salt_round2 => hash2
//-And the number of times you do this is the number of salt rounds.
Now the reason why this is genius is because as computers get faster, remember that Moore's Law says that
every year the number transistors in a computer chip almost doubles  and the cost of that faster computer halves.
//-So every year you get more computing power for less money.
And this is where salt rounds comes in.
When you're hashing your passwords using bcrypt you can set the number of rounds you want to salt your password.
So that means maybe this year in 2019 you salted 10 rounds but maybe next year you can increase that number to 12.
And for every increase in that number the amount of time that it takes to hash your password doubles.
//-And so that means you don't have to change your hashing algorithm or update your code other
than simply changing one number to keep up with the times.
-
So just to review,
coming back to that user database we'll have each user's username stored,
we'll have their randomly generated salt stored and then we'll store their hash after a set number of salting rounds.
And when it comes to checking their password when they login,
we'll take the password that they put in
combine it with the salt that's stored in the database
and run it through the same number of salting rounds until we end up with the final hash
and we compare the hash  against the one that's stored in the database to see if they've entered the correct password.
--------------------------------------------------------------------------------

https://www.npmjs.com/package/bcrypt

Hyperterminal: write "node --version" or "node -v".

So anything that is a odd number(Current) bcrypt is not keen to support because it's less stable,
it has more chances of bugs and they always recommend you to use the latest stable version(LTS).
https://nodejs.org/en/
So if you have a older version of Node or if you have even a too new version of Node,
how can you go back to this version that's on the left hand side here (LTS) on the NOde.js website?

Well you could use something called nvm.
https://davidwalsh.name/nvm
And you can install nvm by going to its GitHub repository
https://github.com/coreybutler/nvm-windows/releases
//4.1.2 Download nvm-setup.zip - Extract Install
and
//4.1.3 simply copying this line of code
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
from https://github.com/nvm-sh/nvm  and pasting it into your terminal.
//4.1.4 And once you've got it installed,
restart your terminal, so close it down and open it again,
//4.1.5 and you should be able to check your version by writing in Terminal "nvm --version"
and if you get a version back then that means it's definitely installed
and you can use it to update or downgrade your Node version.
-
So we're going to aim for v18.12.1 or whatever it is that you see when you go on to nodejs.org, the long term support version.
And we're going to use nvm to install Node on that version by simply writing in Terminal
//4.1.6 nvm install 18.12.1" and hit enter
and it will download and install that latest stable version of Node for you.
Now once you've got the latest stable version downloaded and installed,
you can go ahead and look for the compatible version of bcrypt.
So at the moment we're on version 10 and bcrypt should be three or above.
--
//4.2 Now at this current point in time, if I simply try and write in Terminal
cd over to my secrets project
and run "npm i bcrypt"
then you can see I get some warnings and I suspect this is probably only going to happen for these few days
while the bcrypt team scrambles to try and update their code.
But if you get something similar like I do,
how would you investigate to see how to fix this or whether if you even need to fix it?
//4.2.2
With every NPM package there's always a link to the repository where the code is hosted on GitHub.
And on GitHub you can always explore the issues
that people are having while they're trying to use this repository.
And you can see that recently 3 days ago, five days ago, everybody seems to be having issues with installing bcrypt.
And if you click on it
you'll see a discourse or a chat or messages between the creator of the repository and people who are experiencing problems.
And you can see whether if you are getting similar problems.
-
//Now if we have error, go to github repository isuses to find solution that people are recommending:
Example
//4.2.3 change my installation from "npm i bcrypt"  to "npm i bcrypt@3.0.2" command
I no longer get all of these problems and I have my package successfully installed.
So you might not experiences at all.
You might not get any problems at all other than maybe all two NPM warnings
because we don't have a description or a repository for our packages over here.
But other than that you might actually have no problems.
But if you do experience an issue with bscript or any other package in the future
you'll know how to investigate the issue and see if there are some solutions being offered for that particular issue.
All right, so now that we have bcrypt successfully installed in our project,
---
//4.3
the next step is to actually use it.
So we're gonna go ahead and swap out |delete|comment:   var md5 = require('md5');
and instead we're going to be using bcrypt. https://www.npmjs.com/package/bcrypt
//4.3.1 const bcrypt = require('bcrypt');
//4.3.2 const saltRounds = 10;
And if you remember that the more that you increase the number the harder your computer will also have to work to generate those hashes.
And if you scroll down it https://www.npmjs.com/package/bcrypt actually shows you
how long it will take to generate your hashes or how many hashes are created depending on how you change this number.
So if you set that salt round number to 31 then on a 2GHz core you can expect to take two days or three days to generate a hash
which is which might look like your app is crashing but it's actually just hashing away.
So at least for 2019 and 2020, I would recommend keeping the salt round at 10.
-
-
And to actually use bcrypt https://www.npmjs.com/package/bcrypt,
//4.4 Technique 2 (auto-gen a salt and hash):
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
We're going to use the hash function (passing in
the password that the user has typed in when they registered and also the number of rounds of salting we want to do)
and bcrypt will automatically generate the random salt
and also hash our password with the number of salt rounds that we desired.
//4.4 full----------------------------------------
app.post("/register", function(req, res) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const newUser = new USER({
      email: req.body.username,
      password: hash
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
-


//4.5
$ nodemon app.js
So be sure to remove all the mentions of md5 if you're going to remove that package from your project.
//console.log("weak paword hashh" + md5("123456")); //3.5 Hashing
//console.log("strong paword hashh" + md5("shagrf3h4mtd.lyl78;hkhkfjdnjrfjej"));
So let's go ahead and hit save and nodemon and restart and you can see now our server has started without any problems.
So whenever you're removing packages be careful that you you're not still using it somewhere inside your code.
//4.6
localhost:3000
let's register a brand new user: user@bcrypthash.com password 123456
when we look at it in our database it will be easier to see which user was hashed with which hash function.
So we've successfully gone over to discover the secret page which means that our user should have been successfully saved into our database.
//4.7
So let's go ahead and check it out. Robo3T-userDB-usersYou can see that our last user, the one that we registered just now,
has that email user@bcrypthash.com and their password is quite long and it is a hash generated using bcrypt as well as 10 rounds of salting.
So if you decide to try and search for this hash on Google or wherever it may be or any sort of hash table,
rainbow table, whatever it may be, you should not be able to discern the user's original password which is key.
//4.8
Now what about when the user tries to login?
const password = req.body.password;//4.8.1 instead of md5(req.body.password;)
bcrypt.compare(password, foundUser.password, function(errori, result) { //4.8.2     //instead of if (foundUser.password === password){  res.render("secrets"); }
  if (result === true) { //4.8.3
    res.render("secrets");
    console.log("okay");
  }
  else{
      console.log(errori);
  }
});
//4.9
localhost:3000 - login - user@bcrypthash.com and 123456 - login =>secretpage which means that that comparison was successful.
//We've managed to implement bscript along with salting and 10 rounds of salting at that to massively secure our user database
and make it pretty much impossible to hack using something like a hash table or dictionary attack.
But we can still level up more and we're going to discover that in the next lesson.
*/
//HyperTerminal
git log
git add .
git commit -m "Level 4_part1  Salting and Hashing Passwords with bcrypt"
git push -u origin main





//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*Level 5 Cookies ans Sessions, using Passport.js
/*
We're now on level 5 authentication and in this lesson we're going to talk all about cookies and sessions.
Now on the internet cookies are used widely to save these browsing sessions
and it goes beyond just saving your last actions on the website.
//Example
When Amazon adds those cookies to my browser, it also means that when I go and visit another website say
if I go onto Facebook then it knows who I am and what items I wanted to buy on Amazon.
And it'll try to remind me of that thing that I wanted to buy on Amazon..
Once a user comes your website initiates some sort of buying behavior and then they decide to abandon cart,
you save what it is that they wanted and then on other websites or when they come back onto your website
you remind them about that thing that they wanted to buy.
And this is all done through cookies and sessions.
//
So if we review this from a web development point of view it means that say
on day 1 when I go into Chrome and I type in amazon.com, my browser will make a get request to Amazon server requesting for their home page.
Amazon server will then respond to that request and send over the HTML, CSS and JavaScript files that are needed for my browser to be able to render the Amazon website.
And then let's say that we decided to add a computer to our cart,
well that is equivalent to making a post request to Amazon server saying that I would like to buy a computer right?
And it's at this moment in time when Amazon servers will create a cookie that contains that data, "This user wanted to buy a computer."
And when it responds to the post request that cookie gets sent along and the browser gets told to save that cookie.
So that means that if I now get distracted and I decide to go onto Facebook or whatever it may be.
-
But if I come back tomorrow  that cookie is still saved on my browser. So the next time that I make a get request to Amazon server,
that cookie gets sent along with my get request to allow the server to be able to identify who I am and see if I had any previous sessions on Amazon.
And it's the equivalent of cracking open that fortune cookie revealing what were the previous things that I wanted to buy, so in this case it was a computer.
And then they could respond with the HTML, CSS, Javascript and also render my cart so that the computer is already added in the cart.
//
So there are lots of different types of cookies but the types of cookies
that we're going to be looking at are the ones that are used to establish and maintain a session.
Now a session is a period of time when a browser interacts with a server.
So usually when you log into a website that's when your session starts and that's when your fortune cookie gets created.
And inside that fortune cookie you'll have your user credentials that says this user is logged in and has been successfully authenticated.
So that means as you continue to browse the website
you won't be asked to login again when you try to access a page that requires authentication
because they can always check against that active cookie that you have on your browser and it maintains your authentication for this browsing session
until the point when you log out which is when this session ends and the cookie that's related to the session gets destroyed.
//
So we're going to be implementing cookies and sessions into our website and we're going to be doing it using something called Passport.
Now if you're good on Node.js and authentication it's almost impossible to not mention Passport.
And it's something that's very very flexible and allows you to authenticate your users
using either a local strategy like what we're doing right now which is username and password
or use a whole bunch of other services such as Google, Facebook, LinkedIn Twitter.
And it makes it a lot easier for you to be able to plug these different ways of authentication into your website.
So let's get started learning about Passport and learning about how we can implement cookies and sessions.
--------------------------------------------------------------------------------

So let's get started putting into practice what we just learned about and adding cookies and sessions to our current app.
//5
And if you still got your server running go ahead and stop it.
And then we're going to HyperTerminal
//5.0
npm i passport passport-local passport-local-mongoose express-session
//5.1
So first things first we're going to rip out all of the parts where we were hashing and salting using bcrypt.
So I'm going to delete it from here.
//| const bcrypt = require('bcrypt');
//| const saltRounds = 10;
And I'm also going to empty out my app.post login route and also the register one.
// app.post("/register", function(req, res){  });
// app.post("/login", function(req, res){  });
//5.2
and we're going to incorporate hashing and salting and authentication using passport and the packages that we've added just now.
//5.2.1
//const session = require('express-session');
//5.2.2
//const passport = require('passport');
//5.2.3
//const passportLocalMongoose = require('passport-local-mongoose');

//5.3
https://www.npmjs.com/package/@types/express-session
https://github.com/expressjs/session
So the next step is to actually use it.
And we're going to place this code just above where we have mongoose.connect and just below all of the other app.uses,
so right here.

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

mongoose.connect("mongodb://127.0.0.1/userDB");


//5.4
So now that we've set up our session the next thing to do is to initialize and start using passport.
And in order to use passport
//5.4.1
the first thing we have to do is to initialize it.
//app.use(passport.initialize());
//5.4.2
Now the next line that we have to write is to tell our app to use passport to also set up our session.
//app.use(passport.session());

-Review-
So we first tell our app to use the session package that we required up here
and then we set it up with some initial configuration.
Next we tell our app to use passport and to initialize the passport package
and to also use passport for dealing with the sessions.
-
And if you want to know how I know to write these bits of code be sure to check out the passport documentation
https://www.passportjs.org/concepts/authentication/strategies/
and especially under the configure section where they talk about passport strategies
and how to verify callbacks
and how to work with Express based applications which is what we're doing.
And this is where these bits of code comes from.

//5.5
So now that we've set up our app to use sessions and passport for managing those sessions,
the next thing to do is to set up our last package, passport-local mongoose.
And we've already installed it but in order to use it we have to add it to our mongoose schema as a plugin.
So this is very similar to what we did when we covered encryption when we used the Mongoose encryption package.
So here we're going to tap into our userSchema
and remember that this schema in order for it to have a plugin it has to be a mongoose schema.
It can't just be a standard Javascript object.
So make sure that your code still looks like this
const userSchema = new mongoose.Schema({ email: String, password: String });
and if you're confused about what I'm talking right now make sure you take a look at the encryption lesson in this module.
All right.
//5.5.1
So we've tapped into our userSchema and we're going to add a plugin to it.
And the plug in is of course passportLocalMongoose and that is what we're going to use to hash and salt our passwords
and to save our users into our MongoDB database.
//userSchema.plugin(passportLocalMongoose);
//5.5.2
So now that we've enabled it let's go ahead and use it.
So right below where we've created our user mongoose model and setup Mongoose to use that schema that we created earlier on,
we're ready to configure the very last thing which is the passport local configurations
and we're going to use exactly the same as what the documentation tells us to do
https://www.npmjs.com/package/passport-local-mongoose  Simplified Passport/Passport-Local Configuration
which is to create a strategy which is going to be the local strategy to authenticate users using their username and password
and also to serialize and deserialise our user.
-
Now the serialise and deserialise is only necessary when we're using sessions.
https://www.passportjs.org/concepts/authentication/sessions/
And what it does is when we tell it to serialize our user
it basically creates that fortune cookie and stuffs the message namely our users identifications into the cookie.
And then when we deserialise
it basically allows passport to be able to crumble the cookie and discover the message inside which is who this user is.
And all of their identification so that we can authenticate them on our server.
-
So normally if you are just using passport and passport local you would have to write a lot more code.
https://www.passportjs.org/concepts/authentication/sessions/
But because we're using passport local mongoose it's going to take care of a lot of that in between code for us.
https://www.npmjs.com/package/passport-local-mongoose  Simplified Passport/Passport-Local Configuration
So all we need to do is just add these three lines of code right below where we create our new mongoose model
//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());
and we're now ready to run our app.

//5.5.3
So let's go over and use nodemon to run our app.js making sure that your MongoDB server is still running.
//nodemon app.js
//rs
Okay so we're pretty happy that our server is running without any warnings or errors
and if you're getting some problems in here make sure that you firstly review where the code went and whether if you have any typos.
--Review--
So we first required three packages express-session, passport and passport local mongoose.
And then we set up sessions to have a secret, set the resave option to false and set the saveUinitialized option to false as well.
And then we initialize passport
And we used a passport to manage our sessions.
And then we set up our userSchema to use passport local mongoose as a plugin.
And finally we used our passport local mongoose to create a local log in strategy
And set a passport to serialise and deserialise our user.
And notice the order of the code here.
It's really really important that your code is placed in exactly the same places as I have on the screen here
because if for example
you decided to set up sessions after you tried to use the sessions to serialise and deserialise, it won't work.
And similarly
if you tried to use passport to create a strategy but you haven't initialized it, that also won't work.
So this is why the order is important.
So now that we are assuming that all the configuration is done and dusted,

//5.6
the next thing to do is to actually setup the register post route and the login post route.
And we're going to be using our passport-local-mongoose package to do this.
//https://github.com/saintedlama/passport-local-mongoose
//5.6.1
app.post("/register", function(req, res) {
  User.register( {username: req.body.username}, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });

//5.6.2
app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) { //if a user is already logged in
    res.render("secrets");
  } else {
    res.render("login");
  }
});

//5.6.3
So let's go ahead and save our code and see if our registration section works.
Making sure that our servers running without any issue
localhost:3000
user@passportlocalmongoose.com
password  123456 and I'm going to click register.
And now I get taken to the secrets page which means that everything went through successfully.
//5.6.3.1
So now if we had ever to Robo 3T and let's view all the documents in our collection
you can see we have a brand new document here where the username is user@passportlocalmongoose.com and we've got a salt and a hash.
So this is what I meant when I said that the passport-local-mongoose package
will salt and hash our password for us automatically without us having to do anything about it.
//5.6.3.2
But in addition, when say I navigate a way to, I don't know, the home page
and I tried to access the secrets page directly:  localhost:3000/secrets
it gets rendered straight away without me needing to login again
because I am already authenticated and this is all thanks to the cookie that got my session ID saved
and we can even see it
if we go into our Chrome settings and we search for cookies, go to content settings, cookies, see all cookies and site data.
And if we locate our localhost, you can see that we've got one cookie that's saved right here
and you can see this is the content that gets created by that express-session's package
and it saves it inside this cookie called connect.sid and it's set to expire when our browsing session ends.
//5.6.3.3
So that means that when I quit Chrome and I open it again and I try to go back to localhost:3000/secrets,
you can see that I am now no longer authenticated because that cookie got deleted by my browser because it's set to expire when I close down my browser.
So now it's pushing me towards the login page because I am no longer authenticated.
So I have to log back in in order to be able to access the privileged areas.

//5.7
Now at the moment we haven't got our login routes set up yet so let's go ahead and do that.
//5.7.1
So inside the app.post section for our login route, let's go ahead and create a new user.
And this is going to be a new user created from our Mongoose model
//
app.post("/login", function(req, res){
   const user = new User({
    username: req.body.username,
    password: req.body.password
  });

});

//5.7.2
then we're going to use passport to login() this user and authenticate them.
And in order to do that we're going to use a login function that passport gives us and it has to be called on the request object.
https://www.passportjs.org/concepts/authentication/login/
And if there were  -then- we're simply going to log those errors in the console.
But if there were no errors  -then- we're going to authenticate our user
so it means that they've successfully logged in and we're going to call passport.authenticate and we're going to use the local strategy.
which basically authenticates our user using their password and username.
req.login(user, function(err) {
  if (err) { return next(err); }
  else {
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secrets");
    });
  }
});
So both when they've successfully registered and when they've successfully logged in using the right credentials,
we're going to send a cookie and tell the browser to hold onto that cookie
because the cookie has a few pieces of information that tells our server about the user,
namely that they are authorized to view any of the pages that require authentication.
localhost:3000 and we're going to click on login.
So let's find that user that we sign up just now. user@passportlocalmongoose.com and I'm going to put in their password of 123456 and click login.
And now I get taken to the secret page. So it's working perfectly.
--------------------------

//5.8
https://www.passportjs.org/concepts/authentication/logout/
app.get("/logout", function(req, res) {
  //deauthenticate the user and end the user session
  req.logout();
  //redirect the user to the root route (home page)
  res.redirect("/");
});

//5.9
Whereas if we are already logged in, and we voluntarily say navigate to some website or closed down the tab
and try to go back to our localhost:3000/secrets our session is saved  and we're still authenticated because of that cookie that we have on our browser.
--
Now remember that when you update the code in your app.js and you hit save that, nodemon will restart your server right?
And whenever your server gets restarted your cookies gets deleted and your session gets restarted.
So now if I try to go to secrets page  localhost:3000/secrets  it redirects me to login because I'm no longer authenticated.
That cookie gets deleted every time we restart the server.
-
So cookies and sessions and passport are not easy concepts to grasp.
So I recommend watching this video a couple of times
and also to be sure that you read through the passport, passport-local, the passport-local-mongoose and the express-session documentation.
It's through reading all of these very very long tomes essentially that you actually understand how to interact with it
and why it is the code looks the way it does.
*/
git log
git add .
git commit -m " Level 5 Cookies ans Sessions, using Passport.js"
git push -u origin main
