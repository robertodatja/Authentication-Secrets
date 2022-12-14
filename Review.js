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






//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
/*LEVEL 6 OAuth 2.0 & How to iImplement Sign In with Google?
//6.1
npm install passport-google-oauth20
//Part1
//6.2
https://www.passportjs.org/packages/passport-google-oauth20/
Create an application - Google developers console - https://console.cloud.google.com/apis/dashboard?pli=1&project=pristine-gadget-271815
Create a project - Project Name: Secret - Create
/* 6.3
API&Services - OAuth consent screen - External - App name: Secrets
- User support email: User support email
- Save and Continue
- Scopes - Google API Library
- maps API, Gmail API, Google people API, ...
And all of those involve jumping through extra hoops.
But in our case we only want to authenticate them through the use of Google login.
So we don't have to do any of that and all we need are the default ones that we get for free
without even the user needing to see a permissions page because these three things (email, profile, openid)
are transmitted every time you authenticate with Google.
So now that we're done,
//the last thing I'll add is that once your website is up and running and you've got a custom domain name and it's being hosted,
then you'll want to add all of those things in here - App domain: like a privacy policy page or terms of service link and also your main domain.
So let's go ahead and hit save.
*/
/*6.4
API&Services - Credentials - CREATE CREDENTIALS - OAuth client ID

- Application type: Web application

- Name: Secrets

- Authorized JavaScript origins: http://localhost:3000
so where is that request to Google going to come from. And in our case it's going to come from our local host.
And this is obviously for when we're testing. And when your websites live, you can come back here and change it at any time.

-Authorized redirect URIs: http://localhost:3000/auth/google/secrets.
So this is a route that we're going to plan out on our server when Google has authenticated our user to return to
so that we can then locally authenticate them and save the session and cookies and all of that.
And I'm gonna come back to this route very very shortly
but for now just check to make sure that you have inserted in here exactly the same string as I have
because if it's not, then our authentication will fail and it'll be hard to identify down the line.
So once you've made sure that both of these are correct then go ahead and hit enter
and that adds those to our credentials and we can go ahead and create a client ID.
-Create
I'm going to go back to Atom and open up my .env file and I'm going to add  them in using the .env format.
Client_ID=...
Client_SECRET=...

//Part1-Review
and we can get back to setting up our Google OAuth strategy using passport.
So we've done this part. https://www.passportjs.org/packages/passport-google-oauth20/
We've created an application on Google Developer console and we now have a client ID and client secret.

//Part2
//6.5
https://www.passportjs.org/packages/passport-google-oauth20/
Configure Strategy
//6.5.1
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//6.5.2
https://www.passportjs.org/packages/passport-google-oauth20/
And I'm gonna copy-paste it in here below where we have serialize and deserialize our user
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
And it's really important that your code goes in the right order.
So for example:
 we can't put that code above this line (line15) because it won't work
 and we can't put it above the session because then it won't save the user login sessions.
So this is where we're going to put it after all of the setup and right before all the routes.

//6.5.3
So let's go ahead and update some of these place holders.
//clientID: process.env.CLIENT_ID
//clientSecret: process.env.CLIENT_SECRET
//callbackURL: "http://localhost:3000/auth/google/secrets."
And finally we have to change the callback URL to the same one that we put in on the Google API dashboard.
https://console.cloud.google.com/apis/credentials/oauthclient/488366710860-k1c2maleqf3m9sknncmuvjvc3bpn2uln.apps.googleusercontent.com?organizationId=0&project=pristine-gadget-271815
Authorized redirect URIs, For use with requests from a web server
And my callback URL hits up a path on my server at /auth/google/secrets which we will set up very very shortly.

//6.5.4
Now there's just one more thing that we need to add to this configuration. And the only reason why we need it is
because Google has recently announced that they are sunsetting the Google+ API and all things related to Google+.
And they're finally giving up on trying to make people use their Google+ service as a social media site.
https://blog.google/technology/safety-security/project-strobe/
-
So if we head over to the GitHub repository for this package: passport-google-oauth20
https://github.com/jaredhanson/passport-google-oauth2
So here if you go into the issue section
-
I've noticed that people have been talking about the // Google+ deprecation.
https://github.com/jaredhanson/passport-google-oauth2/issues?q=Google%2B+deprecation
//And the problem is that Google made a recent announcement saying that Google+ is sunsetting.
So previously this package relied on Google+ to obtain user information so they got the user's Google+ profile.
And people are wondering how would we proceed once that API deprecates.
So if you scroll down a little bit,
you'll notice there's a post by this guy MarshallOfSound commented on Dec 21, 2018
https://github.com/jaredhanson/passport-google-oauth2/pull/51
usually the most helpful posts have the most upvotes or thumbs up and you can see that when you're just scrolling through as well.
And this guy is very kindly done all of the heavy lifting for us
//and he's put in a new pull request to fix this package in regard to this deprecation of the Google+ API.
now what he's saying is
all you have to do to fix this is to simply add this in these strategy options.
//6.5.4
So let's go ahead and copy-paste
userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
and now when we use passport to authenticate our users using Google OAuth
we're no longer gonna be retrieving their profile information from their Google+ account
but instead we're going to retrieve it from their /userinfo which is simply another endpoint on Google.
Now how would you have known to do this?
Well it's very likely that at some point if the Google+ API deprecates then your code might not work.
You're probably going to get some warnings down the line in your console and it'll tell you something like "Google+ API deprecated.
Fix it by doing this.
And I'm simply pointing you to this to future-proof the course because I know that in a few weeks or a few months Google is going to pull the plug and your code might break.
But adding this means that we should be now future-proof and it should now work for you even if you're listening to this far ahead in the future.

//6.5.5
So the next thing I want to point out is here are  - all the options for using the Google strategy to log in our user.
And once that's gone through we have a callback function
and this is where Google sends back a accessToken: which if you remember,
accessToken: is the thing that allows us to get data related to that user which allows us to access the user's data for a longer period of time.
We've got their profile: which is essentially what we're interested in because that's going to contain their email, their Google ID and anything else that we have access to.

//6.5.6
And finally we use the data that we get back,
namely their googleId,
to either find a user with that ID in our database of users or create them if they don't exist.
-
Now I think you have to realize is that if you try to search for this method, findOrCreate, it's not actually a MongoDB or a Mongoose function.
And if you click the first thing you see in Google is a Stack Overflow query
Google - User.findOrCreate mongoose - https://stackoverflow.com/questions/20431049/what-is-function-user-findorcreate-doing-and-when-is-it-called-in-passport
and this guy says "I can't find the documentation on this function and I can't make it work."
//2 Answers:
//1:
And the answer is "This is not actually a function.
It's something that passport, the people who documented this package came up with as pseudo codes or fake code
https://www.passportjs.org/packages/passport-google-oauth20/ - Configure Strategy - User.findOrCreate({ googleId: profile.id }, function (err, user) {
and they basically try and tell you to implement some sort of functionality to find or create the user."
And they point out how you might be able to implement something like this.
//So findOne, and then create the user and then save the user.

//2:
So you can either follow this advice or something that might make your life a little bit easier
is this guy has pointed out that there's actually an NPM package called mongoose-findorcreate.
And this package essentially allows you to make that code just work.
So they've created that function for you in the package and it does exactly the same as what this person has described up here.(//1:)
And all you have to do to make this work is to just install it and require it.

//6.6
So let's go ahead and do that.
https://www.npmjs.com/package/mongoose-findorcreate
//6.6.0
npm install mongoose-findorcreate.
//6.6.1
const findOrCreate = require('mongoose-findorcreate')
//6.6.2
Now the final step that the documentation tells us to do is to add this as a plugin to our schema.
userSchema.plugin(findOrCreate);
So now our code should work and we should be able to tap into our user model and call this function findOrCreate which previously didn't exist.
--------------------------------------------------------------------------------

So now that we've set all of this up in our backend,
the next thing to do is to figure out a way for us to be able to tap into it from our frontend right?
-
At the moment on our website there's no way of logging in with Google.
nodemon app.js - localhost:3000 -click on login or register there's no button for me to go down the Google authentication route
because all of this is linked up to our local authentication. So what do we have to do?
//6.7
Well, we have to add some buttons onto these websites.
//6.7.1
views folder - register.ejs - uncomment lines 27-36
So now when I refresh this page we get a button over here that says "Sign up with Google".
//6.7.2
do the same on our login page (lines 27-36)
-
so that they can access the sign in with Google both when they try to login and register.
So these buttons are pretty much identical other than where they're located.
One is in registered and one is and login. And they both contain a anchor tag that links to the href="/auth/google".
So when the user clicks on this button, it's gonna make a get request to this path: "/auth/google"
And we haven't actually addressed that in our code so let's do that now.
//6.7.3
Inside our app.js right below where we've got our app.get/ root route,
let's go ahead and add a app.get for the route that the button will hit up which is /auth/google.
And then let's add our callback. And inside our callback is where we're going to initiate authentication with Google.
So to do that we're going to use passport of course and we're going to authenticate our user.
And then we provide the type of strategy that we want to authenticate our user with, so this is going to be "google" as a string.
But in this case we're using the Google strategy.
app.get("/auth/google", function(req,res){
 passport.authenticate('google', { scope: ["profile"] })
});
-
So we're starting to see how passport can be used flexibly and by adding in or switching out
different strategies we can implement lots of different ways of authenticating our user using the same library.
Now the next thing we have to provide is a scope. Now how do I know about all of this?
Well of course it's from the documentation. https://www.passportjs.org/packages/passport-google-oauth20/ -Authenticate Requests
Copy-Paste
//6.7.3_
app.get("/auth/google",
 passport.authenticate('google', { scope: ["profile"] })
);
So in this case what we're doing is
we're saying use passport to authenticate our user using the Google strategy
which we have setup over here as a new Google strategy
passport.use(new GoogleStrategy({ ...})//6.5.2
passing in all of those things: clientID, clientSecret, ... to help Google recognize our app which we have set up in the dashboard.
And then we're saying when we hit up Google,
we're going to tell them that what we want is
the user's profile and this includes their email as well as their user ID on Google which we'll be able to use and identify them in the future.
//And this line of code here:  passport.authenticate('google', { scope: ["profile"] })
 should be enough for us to bring up a pop up that allows the user to sign into their Google account.

--------------------------------------------------------------------------------
nodemon app.js - localhost:3000 - register - click on the "Sign up with Google".
And now you can see we get redirected to a page on Google itself and we're able to login using our Google account.
So I'm going to select my account to login, but then I get an error and it says  "Cannot GET /auth/google/secrets".
-
Now if that route is familiar to you, there's a good reason for that
because that's what we set up right here, our authorized redirect URI or URL: http://localhost:3000/auth/google/secrets.
And this is where Google will send the user after it's authenticated them on their server.
You can see it's pointed us back to our website localhost right?

//6.7.4
So we need to add this route  auth/google/secrets
to be able to authenticate them locally on our website and to save their login session using sessions and cookies.
And if you take a look at the next part of this authenticate request documentation,
https://www.passportjs.org/packages/passport-google-oauth20/
you can see they provide an example of how you might set this up.

app.get(""/auth/google/callback",
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
So it's again going to be an app.get.
And this request, this GET request, gets made by Google when they try to redirect the user back to our website.
And this string has to match what we specified to Google previously.
And then we're going to authenticate the user locally
and if there were any problems we're going to send them back to the login page again.
But if there were no problems then we can redirect them to the secrets page or any other sort of privileged page.
So let's go ahead and copy all of this and paste it into our app.js right below the other app.get.
And I've just noticed that this is also single quotes. People are very inconsistent when they type Javascript but I like to keep it all the same so it doesn't confuse me.
And we're also going to change it here.
//1
Now notice here that the route is /auth/google/callback.
And all we have to do is change this to secrets so that it matches exactly.
http://localhost:3000/auth/google/secrets.
//2
Now the rest of the code we can leave as the same
because the if the authentication fails then we're going to redirect them to the login route, we have a app.get for the login route.

app.get(""/auth/google/secrets", //6.7.4_1
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect('/secrets'); /6.7.4_2
  }
);
But if it was successful then we're going to redirect them to the secrets page.
So we res.redirect it's going to go to /secrets
and this will take them to here:   app.get("/secrets",...)
And we can check to see if the user is authenticated in which case we'll render the secrets page otherwise we'll redirect them back to the login page.
So this is pretty much all the code that we need in order to allow users to login using Google on our website.

--------------------------------------------------------------------------------
//I
So let's check out what we get back from Google by going into this callback function
and let's simply log the profile of the user that we get back.
console.log(profile)
passport.use(new GoogleStrategy({
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
  }
);
So now, when the user clicks on that button that says "Sign up with Google",
it will hit up the: href="/auth/google" route
which gets caught over here:
app.get('/auth/google',
  //and that will initiate authentication on Google's servers asking them for the user's profile once they've logged in.
  passport.authenticate('google', { scope: ['profile'] })
);

//II
Now once that's been successful, Google will redirect the user back to our website
and make a get request to /auth/google/secrets: app.get("/auth/google/secrets", ...)
And it's at this point where we will authenticate them locally and save their login session.
//III
Now once they've been successfully authenticated, we take them to /secrets.
But at this stage, the Google authentication has already completed and this callback function gets triggered.
And we will log that profile console.log(profile) and try to create them as a user on our database.

----------------------------------------
So let's save our app.js and test it out.
So let's go back to our home page localhost:3000.
Let's register over here, click on "Sign up with Google" and I'm going to sign in using my Google account here.
Now at this point you might end up with an error like this. "Failed to serialize user into session".
Why is this?
//6.8
Instead of //5.5.2
So let's go ahead and replace the code where we serialize and deserialize our user for local authentication
from here https://www.passportjs.org/concepts/authentication/sessions/
and replace it so that it can work with any kind of authentication.
--------------------------------------------------------------------------------
//1
So let's hit save over here and now if we go back to localhost:3000 we register our user using Google
then you can see it takes us straight to the secret page.
//2
Now the other thing we tried to find out is
we tried to log the Google Profile that we got sent after the user has been authenticated by Google.
And you can see that it's this JSON over here (in HyperTerminal):
{
  id: '...',
  displayName: '...',
  name: { familyName: '...', givenName: '...' },
  photos: [...],
  provider: 'google',
  _raw: '{...}',
  _json: {...}
}
and it has a id for the user. So this is going to uniquely identify this user on the Google user database.
It has their name and it can split it into family name and given name.
It also got some photos if they have any, a picture of them.
//But the most important thing for us to save into our database is this id because this id will identify them when they next try to login.
So if they create any data on our website we're going to associate it all with this id.
//3
So if you look inside our database at the moment: HyperTerminal-newtab2-mongosh-use userDB-db.users.find() or in Robo 3T,
you'll notice that a new user was created.
-
If  No new user getting created using findOrCreate
then drop the database, go to HyperTerminal-newtab2:
use userDB;
db.dropDatabase();
-
then , go to HyperTerminal-newtab2:
use userDB;
db.users.find();
  [ { _id: ObjectId("638a819efbfaeb4e711fed13"), __v: 0 } ]
But all we have is an automatically generated MongoDB id and nothing else
whereas our previous users had a username and a salt, a hash or an email and a password.
But in this case,
we don't really have anything for this user and we don't have any way of tying this newly registered user with their Google id.
-
//4
So the next time they log in, we won't be able to find them on our database.
And I can confirm this by simply logging out and trying to login again, sign in with Google,
and you can see that in our database, all we've done is just create a new user. We now have the seventh user.
So that Google id is not being tied to the id on our user database!
--
So let's go ahead and delete these two entries in Database or drop Database
and let's go and fix our code.
//6.8.2
So let's go ahead and add a new field called googleId with a capital I. It's also going to be a string.
But this time when a new user registers on our website,
we're going to find and see if we already have a record of their Google id on our user database
in which case we're gonna save all the new data associated with that id
or otherwise we're going to create it on our database and save this information for future.
--------------------
//1
So let's save our app.js and log out of our website and then go ahead and register again. And we're going to sign up with Google.
And now if we go over to our Robo 3T you can see our new user gets created with an id that identifies them on our user database
but another id that identifies them as a unique Google user.
//1.2
So this is their id which means that
if I log out now and I tried to login again, I get to the secrets page but we don't actually create a new user.
//They're still being identified as user 6.
//1.3
And this is the same thing even if I log out and try to register again as the same Google user.
You can see that I'm still not creating another user here because I'm able to find this user by their Google id and know that they already exist.
-
Now remember that because we're authenticating our users using Google we only get what's equivalent to their user name on the Google user database.
We don't get their password and this is great because it means we don't have to save it.
We don't have to take care of it if it gets lost or it gets leaked that's all on Google
and they have a lot more engineers, a lot more resources, to keep their user's passwords or whatever other pieces of information safe
and all we need to do is just to retrieve it when we need it.

--------------------------------------------------------------------------------
//6.9
So the last thing I want to do before we finish up is to style up our buttons
because if we add a few more buttons over here, sign up with Google, sign up with Facebook,
it doesn't really shout to me that this is something related to Google right?
//6.9.0
download the code https://lipis.github.io/bootstrap-social/
and inside the extracted folder you should see a file called bootstrap-socia.css
and we're simply going to drag that file into our public CSS folder next to our styles.css.
//6.9.1
<link rel="stylesheet" href="/css/bootstrap-social.css">   <!-- Level6.9.1 -->
<link rel="stylesheet" href="css/styles.css">
</head>

//6.9.2
https://lipis.github.io/bootstrap-social/  - Add some buttons!
So the classes that we need are btn-social which adds some of the sizing and the rounded corners et cetera, and then whichever social button we want.
So in our case it's going to be btn-social and btn-google.
<div class="card-body">
  <a class="btn btn-block  btn-social btn-google" href="/auth/google" role="button">
    <i class="fab fa-google"></i>
    Sign Up with Google
  </a>
</div>

//6.9.3
And in the future if you wanted to add another button say, I don't know, "Sign up with Facebook"
then all you have to do is to change this to Facebook and change the icon to Facebook.
<!-- Level6.9.3 Go over to our register.ejs and add the code below-->
<div class="card-body">
  <a class="btn btn-block  btn-social btn-facebook" href="/auth/google" role="button">
    <i class="fab fa-facebook"></i>
    Sign Up with Facebook
  </a>
</div>

//6.9.4
So I'm going to go and delete that last part
and I'm going to go into my login.ejs file and also implement the same thing for this button here. So btn-social and btn-google.
-
So now both my login and register pages: http://localhost:3000/login   & http://localhost:3000/register
have their buttons styled up and also working plus best of all because we've implemented sessions and cookies
even if I go ahead and navigate to a different page: example http://localhost:3000
I should still be authenticated and be able to access the secrets page, without logging in again.
http://localhost:3000/secrets

*------------------------------------------------------------------
While I'm registered or logged in,
But notice that when I click on log out and I tried to log in again
I don't get taken to Google again and have to log into my account.
http://localhost:3000/logout - http://localhost:3000/login => Sign In with Google => http://localhost:3000/secrets
And the reason is:
 because we're only persisting the login session on our Web site.
So it means that:
 once they manage to get to secrets and they navigate around on our website,
if they wanted to access the authentication required route to secrets
remember that in our code when they hitup the secret route
we run the req.isAuthenticated to see whether if we can render that page for them.
---
So this login session and log out session is related to how they can access our website
but it doesn't log them out of their Google account.
In order to do that
we would need a button that would redirect them to https://accounts.google.com/logout
But that's kind of annoying because it means that it would log them out of their Gmail,
their Google Maps and every single other service that they use on Google which is usually not what you want.
So in our case we only need our session to persist for the users login for our website
and we don't need to worry about logging them out of Google.

--------------------------------------------------------------------------------
So now that we've implemented the Google OAuth social login strategy
and we've kind of delegated this whole complicated process of securing a user's sensitive information to Google,
/6.10
//as a challenge
I want you to try and see if you can implement login with Facebook.
It will involve pretty much the same steps as what we've done with Google
but it will involve a little bit of searching around and a little bit of googling and a little bit of figuring it out.
But at this stage you should be able to struggle through this and figure out how you can implement it without too much help from myself.
So best of luck and I'll see you on the next lesson.
*/

git log
q
git add .
git commit -m " Level 6 OAuth 2.0 & How to iImplement Sign In with Google?"
git push -u origin main







/*
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
LEVEL  6_2 Finishing Up the App - Letting Users Submit Secrets*/
/*
So now that we've gone through all of the various different types of increasing security for our users
we've looked at encryption, hashing, salting, using OAuth and other services to login our users.
There's just one thing that our website needs, some actual functionality.
Because at the moment when you log into the service,
it takes you to a static page that just shows one secret which is the one that we've hardcoded on our secrets.ejs page.
Now that's probably not what we want right?
Instead we'd want the user to be able to submit a secret: localhost:3000/submit
and see all of the secrets that other users have submitted.
So we need to fix this.
//I
So let's go into our app.js and firstly set up a get route for going to /submit.
//6_2.1
app.get("/submit", function(req, res) {
  if (req.isAuthenticated()) { //if a user is already logged in
   res.render("submit");
  } else {
   res.redirect("/login");
  }
});

--------------------------------------Test------------------------------------------
//0
So now if we check out what it looks like when we go to Submit a Secret button or http://localhost:3000/submit
//1
and login (http://localhost:3000/login) as our local user - email: user@passportlocalmongoose.com with their password 123456 -login button
//2
at the moment it still redirects to the secrets page (http://localhost:3000/secrets) after we log in.
//3
But if we click on Submit a Secret button now because we have our login session saved, then it takes us to the submit page. (http://localhost:3000/submit)
//4
So here we're supposed to write a secret, I don't know, "My favorite color is blue." It's not much of a secret but here we go.
And always click Submit  button, it will post to the /submit route
(http://localhost:3000/submit
Cannot POST /submit)
where we can pick up the secret that the user typed in, save that into their account and then take them back to the secrets page.


//II
So the next thing we should do is to set up that app.post route.
And the reason why the submit page is making an app.post to this route is
because we have a submit button here (submit.ejs) that completes the form
makes a post request (method="POST") to the /submit route (action="/submit").
-
And now we're going to handle that right here
app.post("/submit", function(req,res){
...
});
So inside here is where we're going to save the secret that the user typed in.
So let's create a new concconst ept called submittedSecret and let's set this to equal req.body.secret
because when we look in here (submit.ejs)
<input type="text" class="form-control text-center" name="secret" placeholder="What's your secret?">
the input that has a type of text for the users secret has the name of secret.
So that means we can happen to it when this form gets submitted through req.body.secret
And that is what we're going to save into this new constant right here.
//6_2.2
app.post("/submit", function(req,res){
const submittedSecret = req.body.secret
});


//III
So the next thing we want to do is to find the current user in our database and then save the secret into their file.
So how do we know who the current user is?
Well, passport very handily actually saves the users details
because when we initiate a new login session it will say that users details into the request variable (req)
So that means, if I go ahead and console.log req.user, I'll actually be able to see what's saved for my current session.
app.post("/submit", function(req,res){
const submittedSecret = req.body.secret
console.log(req.user); //6_2.3
});

-----------------------------------Test-----------------------------------------
So let's hit save and let's go back to our home page (localhost:3000)
let's login our user through our local strategy email: user@passportlocalmongoose.com with their password 123456 -hit login button
and we now get to the secrets page (localhost:3000/secrets).
So if I go ahead and click on Submit a Secret and type the same thing (secret) as before: My favorite color is blue.
click submit,
now that should trigger my console log and you can see it (in HyperTerminal)
now posts everything that we have saved about this current user.
We can access their id and also their username,
so basically everything that exists inside here (database - colection users) other than their salt and hash.

//IV
So that means,
we can now find this (an) user using their id in the database and save the secret that they created to this document(of user in database).
But in order to do that, we first have to amend our schema.
So in addition to everything else that's inside the schema,
I'm going to add one more field and this is going to be their secret. So it's also going to be a string.
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String, //6.8.2
  secret: String //6_2.4
});

And now when the user makes that post request, I'm going to find the user using that req.user.id
because that refers to the id that we have for them in our database.
app.post("/submit", function(req,res){
const submittedSecret = req.body.secret
//console.log(req.user); //6_2.3
console.log(req.user.id); //6_2.5
});

And then I'm going to add that secret that they submitted to that secret field that I created in the schema.
//6_2.6
User.findById( req.user.id, function(err, foundUser) {
   if (err) { console.log(err);}
   else{
    if (foundUser) {
     foundUser.secret = submittedSecret;
     foundUser.save(  function(){ res.redirect("secrets"); }  )
    }
   }
 }
)

-----------------------------------Test-----------------------------------------
//0HyerTerminal-newtab2-mongosh-use userDB-db.dropDatabase() - or delete all users
//and register (http://localhost:3000/login) as our local user - email: user@passportlocalmongoose.com with their password 123456 -register button
//1 and let's go back to our home page, login our user
and login (http://localhost:3000/login) as our local user - email: user@passportlocalmongoose.com with their password 123456 -login button
So remember because every time our server restarts (Hyperterminal - rs) our sessions and cookies gets wiped out.
//2 So now we're ready to Submit a Secret.
And I'm going to add the same secret (My favorite color is blue) here to that user which is the local mongoose user.
//3 And now if I go into my Robo 3T ( or  HyerTerminal-newtab2-mongosh - use userDB - db.users.find() ),
update my database, I should be able to see a secret field that's filled in for this user.

//Solution_of_error:Unauthorized
First, you have to register your user, after you should try to login the user locally!
If you didn't hae registered the user, you will get this error: Unauthorized!

//6_2.7
So now that we've added in the secret, it's time to be able to render it on the secret page right?
//I want to be able to find all the users that have a secret posted and be able to render them on the secrets page.
So that way it's no longer just a static page with only a single secret.
//So to do that we have to update the app.get for our secrets route.
-
We're no longer just going to check to see if they're authenticated or if they're not, redirect themto login,
because this is no longer going to be a privileged page.
Anybody with a logged in or not logged in should be able to see the secrets that have been submitted anonymously.
So we don't need to check to see if they're authenticated
//but instead we're going to trawl through our database and find all of the secret that have been submitted on the database.
-
So to do that we're going to use our model of users
and we're going to use find and we're going to look through this collection and find all the places where the field secret actually has a value.
Now how do we do this?
If we were to search Google for say MongoDB field not null
https://stackoverflow.com/questions/4057196/how-do-you-query-for-is-not-null-in-mongo
i.e. it contains some data,
then we can see that other people already asked about this. And there's several ways that you can do this.
//1
You can either do it through checking whether if it exists so this means that there is a field called IMAGE URL
db.mycollection.find({"IMAGE URL":{$exists:true}});
//2
but you can also check to see that it's not equal to null.
So it means it actually has a value so in this case there actually is an image URL in this collection. So this is what we want.
db.mycollection.find({"IMAGE URL":{$ne:null}});

//6_2.8
app.get("/secrets", function(req, res) { //6_2.8

 User.find(  {"secret": {$ne:null}},  function(err, foundUsers){ //6_2.8.1234
  if (err) {
   console.log(err);
  } else {
    if (foundUsers) {
     res.render("secrets", {usersWithSecrets: foundUsers}); //6_2.8.56
   }
  }
 });
});

//6_2.9
and we can now pick this up  (usersWithSecrets) inside our secret.ejs.
Delete this row:
<p class="secret-text">Jack Bauer is my hero.</p>
Replace this rows:
<!-- 6_2.9 -->
<% usersWithSecrets.forEach(function(user){ %>
 <p class="secret-text"> <%=user.secret%> </p>
<% }) %>

-----------------------------------Test-----------------------------------------
So now let's save everything and let's go ahead and test it out.
//0 nodemon app.js
//1 I'm going to go and register.
//2Let's say that I sign up with Google again.
And you can see that I get taken to the secrets page and it shows that previous secret that I submitted as the other user.
"My favorite color is blue"
//3So let's say that I Submit a Secret under this other account as well. Let's add that "Jack Bauer is my hero." again and let's click Submit.
And you can see we now have two secrets:
"My favorite color is blue."
"Jack Bauer is my hero."
-
So the more users we have, the more secrets they submit the more that gets shown up over here.
--
Example:
Register - email: berti@gmail.com pasword: 54321 - Register
Submit a Secret "Albania comes first"
--
Now we will show 3 secrets: The previouses and the latest
"My favorite color is blue."
"Jack Bauer is my hero."
"Albania comes first"
So for one user will show one secret!

--------------------------------------------------------------------------------
So this is a very very basic and minimalist version of the Whisper app
because the users usernames or passwords or emails, none of that is associated with their secret.
So users can sign up, submit their secrets for all the world to see but they don't have to tell the world who they are.
And we keep their secret secret using all of our advanced authentication methods.
So I hope you had fun learning all of the aspects of authentication.
*/

git log
q
git add .
git commit -m "Level 6_2 Finishing Up the App - Letting Users Submit Secrets"
git push -u origin main
