/*
We're now on level 5 authentication and in this lesson we're going to talk all about cookies and sessions.
Now just a word of warning here, during the lesson
if you continue watching you may start to feel that you get a little bit hungry.
So don't blame me if I've just completely derailed your diet plan because
in this lesson we're going to talk all about cookies and their yummy goodness.
Not really.
The type of cookies that we're talking about that relate the Web Development are more similar
to fortune cookies because they have a message that's packaged inside and you can pass these around
and they can be broken to reveal the message.
So you've probably come across cookies before. But if you haven't,
I just want to show you how it works in practice.

So let's say we go onto Amazon and we search for the switch, right?
The Nintendo switch.
And we decide to go ahead and add it to basket.
So now when we look inside our basket you can see we have one item, the switch right?
And then we're going to do something that all e-commerce sites hate.
We're going to go and navigate away and abandon our shopping cart.
Now this to any e-commerce website is a real crime because the user obviously wanted to buy something
but then at some point they got distracted by something else abandoning their cart without checking out.

So what does Amazon do?
Well as soon as you added that item to the cart, Amazon has created a cookie and it stored that cookie on your browser.
So how do we go and view that cookie?
Well inside chrome if you go to settings and you search for "cookie",
if you scroll right to the bottom it shows you that there's something relating to cookies inside content settings.
So if we go over there and we click on cookies, you can see there's this option to see all cookies and site data.
And now you can see that Amazon has not added just one cookie just by doing that very small act of adding a Nintendo switch to an Amazon basket
Amazon has told our browser to save all sorts of information about ourselves.
And if we click on amazon. co.uk,
you can see there's the session-token the session-id, and these cookies don't necessarily contain any actual information
say this user wanted to buy a Nintendo switch but what they do contain is an ID number.
And this ID will be used to fetch all of those things that you added to your cart during this browsing session on Amazon.

And this is why if you decide to go and close down your browser and you open it back up
and let's head back to amazon.co.uk you can see that my switch is still inside the basket.
So they haven't forgotten this.
So that means the next time I go on to Amazon that Nintendo switch is still going to be in my shopping basket.
However if we go into those cookies for Amazon and we go ahead and delete it.
So let's go back to see all cookies and site data
we find the one that is directly related to Amazon and we remove all of these.
Now if we go and refresh this website you can see we forced it to forget our last browsing session
and it doesn't know about that Nintendo switch anymore.
--
Now on the internet cookies are used widely to save these browsing sessions
and it goes beyond just saving your last actions on the website.
//Example
When Amazon adds those cookies to my browser, it also means that when I go and visit another website say
if I go onto Facebook then it knows who I am and what items I wanted to buy on Amazon.
And it'll try to remind me of that thing that I wanted to buy on Amazon.
And it's kind of creepy but this is essentially how retargeting ads work.
//
Once a user comes your website initiates some sort of buying behavior and then they decide to abandon cart,
you save what it is that they wanted and then on other websites or when they come back onto your website
you remind them about that thing that they wanted to buy.
And this is all done through cookies and sessions.
//
So if we review this from a web development point of view it means that say
on day 1 when I go into Chrome and I type in amazon.com,
my browser will make a get request to Amazon server requesting for their home page.
Amazon server will then respond to that request and send over the HTML, CSS and JavaScript files that are needed for my browser to be able to render the Amazon website.
And then let's say that we decided to add a computer to our cart,
well that is equivalent to making a post request to Amazon server saying that I would like to buy a computer right?
And it's at this moment in time when Amazon servers will create a cookie that contains that data,
"This user wanted to buy a computer."
And when it responds to the post request that cookie gets sent along and the browser gets told to save that cookie.
So that means that if I now get distracted and I decide to go onto Facebook or whatever it may be.
--
But if I come back tomorrow  that cookie is still saved on my browser.
So the next time that I make a get request to Amazon server,
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
So we're going to be implementing cookies and sessions into our website
and we're going to be doing it using something called Passport.
Now if you're good on Node.js and authentication it's almost impossible to not mention Passport.
And it's something that's very very flexible and allows you to authenticate your users
using either a local strategy like what we're doing right now which is username and password
or use a whole bunch of other services such as Google, Facebook, LinkedIn Twitter.
And it makes it a lot easier for you to be able to plug these different ways of authentication into your website.
So let's get started learning about Passport and learning about how we can implement cookies and sessions.
-----------------------------------------------------------------------------------------------------------------
*/
/*
So let's get started putting into practice what we just learned about and adding cookies and sessions to our current app.
So first things first.
As always we have to install some packages and the ones that we're using in this lesson are passport, passport-local, passport-local-mongoose,express-session.
It's like some sort of weird game.
Notice this is not express-sessions.
We want the singular one. Because people are allowed to come up with names for their packages and there's no sort of copy writing of any sort like that
you often end up with packages that are named really really similarly and only until you've installed it and you've required it
and it's not working and you spend hours and hours debugging your code you realize that you actually used the wrong package.
So to avoid all of this heartache just make sure that you've got the right one.
And there's a really easy way of checking to make sure that you're using the right one.
https://www.npmjs.com/search?q=express-session  search  express-session
So let's say if I typed in express-session you can see that over here there's a popularity score, there's a quality score and there's a maintenance score.
Now if these bars are long that means it's a popular, high quality, frequently maintained package.
And that's usually what you want.
And if you take a look at express-session you can see that it gets over half a million downloads per week.
//Now if we accidentally typed in express-sessions
you can see that all of those lines are a little bit shorter and when you click on it you see that it only has 600 weekly downloads.
Some people probably genuinely want to use this package but also there's probably people who have mistakenly installed it.
So it's this one that we want in addition to all of the others that we saw just now.
//5
And if you still got your server running go ahead and stop it.
And then we're going to HyperTerminal
//5.0
npm i passport passport-local passport-local-mongoose express-session
And let's hit enter and it'll go through and install everything.
And now we're ready to go ahead and incorporate it to our app.js.
//5.1
So first things first we're going to rip out all of the parts where we were hashing and salting using bcrypt.
So I'm going to delete it from here.
//| const bcrypt = require('bcrypt');
//| const saltRounds = 10;
And I'm also going to empty out my app.post login route and also the register one.
// app.post("/register", function(req, res){  });
// app.post("/login", function(req, res){  });
So now both of our app.posts are empty
//5.2
and we're going to incorporate hashing and salting and authentication using passport and the packages that we've added just now.
And the first package that we have to configure is express session.
It's really really important that in the following steps you do everything exactly in the order that
I'm showing it to you and placing it in the right parts of the code.
So take note of where I'm writing the code because it's really really important and it's really easy to mess up.
So let's get started.
//5.2.1
First things first. Let's require express-session
var session = require('express-session')
and I'm simply going to paste it in just to avoid making typos which I make a lot of.
But they say that recognizing you have a problem is the first step to solving those problems.
And I'm going to change that var to a const because we are using ES version 6 in our code.
//const session = require('express-session');
Now while I'm here
I'm going to also require the other packages that we installed
and the only ones that we actually need to create a constant for are passport. So I'm going to require passport.
And then I'm going to require passport-local-mongoose.
And just check to make sure that you don't have the typos anywhere
and we don't actually need to require passport local
because it's gonna be one of those dependencies that will be needed by passport-local-mongoose
but we don't actually need to refer to it in the code so we don't need to expose it explicitly
by creating a constant and requiring the package.
//5.2.2
//const passport = require('passport');
//5.2.3
//const passportLocalMongoose = require('passport-local-mongoose');
All right.
So now that we're done,
//5.3
the next thing to do is to actually set up our session
and you can see that whenever we're referring to a method or a property that's from express session
we're going to use the keyword session.
So as always when you're confused about what to do head back to the documentation
https://www.npmjs.com/package/@types/express-session
https://github.com/expressjs/session
and it will be your guiding light.
So we've got express-session that we've already installed and required.
So the next step is to actually use it.
And in order to use it we're going to use a bit of code where we say app.use
and we're going to call session
and we're going to pass in some options such as secret, resave and saveUninitialized.
And we're going to place this code just above where we have mongoose.connect and just below all of the other app.uses,
so right here.

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

mongoose.connect("mongodb://127.0.0.1/userDB");

And it's important that you place your code here as well.
So we're going to write app.use and the package is called session and then I'm gonna open a set of parentheses and some curly braces.
And then inside those curly braces is going to be a Javascript object with a number of properties.
One is going to be the secret and this can be a long string of your choosing.
And this is something that we're going to keep secret in our environment file.
But first let's get it working before we move it to the environment file.
So I'm just gonna put in a long sentence. "Our little secret." and I'll end it with a full stop. Now you don't have to.
You can write any long string in here as long as you remember what it is and you use it consistently. All right.
So let's add a comma and then let's add the next one.
So we're going to set resave to false and we're going to set saveUninitialized.
Remember that it has to be a 'z' for the Americanized spelling.
And we're going to set that to false as well and then we can cap that off.
//app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
Now if you're wondering what all of those things I just said are actually doing,
then be sure to read through the documentation and simply just hit Command + F and search for it.
And you can read through the documentation to see why we're choosing the options we are
and I'm basically following just the documentations recommendations.OK.
//5.4
So now that we've set up our session the next thing to do is to initialize and start using passport.
And in order to use passport
//5.4.1
the first thing we have to do is to initialize it.
So right below where we initialized our session with all of these options we're going to again call app.use
and in this case we're going to use something that comes along with passport and it's simply to initialize it.
And this is a method that comes bundled with passport and sets up passport for us to start using it for authentication.
//app.use(passport.initialize());
//5.4.2
Now the next line that we have to write is to tell our app to use passport to also set up our session.
So we're going to write passport.session and then we're going to add the parentheses and close that off.
//app.use(passport.session());
-Review-
So we first tell our app to use the session package that we required up here
and then we set it up with some initial configuration.
Next we tell our app to use passport and to initialize the passport package
and to also use passport for dealing with the sessions.
-
And if you want to know how I know to write these bits of code be sure to check out the passport documentation
https://www.passportjs.org/concepts/authentication/strategies/
and especially under the configure section where they talk about passport strategies and how to verify callbacks
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
It's going to do a lot of heavy lifting for us.
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
--
And some of you might notice this deprecation warning come up in the console.
So what do we do when we come across a warning in the console?
We copy it and we paste it into Google. //DeprecationWarning: collection.ensureIndex is deprecated
So let's see what we get.
https://github.com/Automattic/mongoose/issues/6890
Now the first link we get is a link to an issue on the original Mongoose package.
And you can see that people are getting exactly the same problem that we're experiencing and some people have very helpfully told us how to fix it.
All we need to do is call mongoose.set and then pass in this user create index option and set it to true.
//mongoose.set('useCreateIndex', true);
-
So whenever you're using third party libraries, there's all sorts of things that can happen and give you these deprecation warnings or other types of warnings.
It's really really important to realize that you are not alone and other people have probably experienced what you're going through right now.
So you have to try and find those people and see how they solved their problem.
So let's go ahead and add that right below where we have our mongoose.connect(...) and we're gonna say mongoose.set useCreateIndex and let's set that to true.
//mongoose.set('useCreateIndex', true);
All right.
Now let's hit save and the Mongoose server will restart or you can write 'rs' for restart
//rs
and you can see we no longer have that deprecation warning anymore.
-
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
So let's tackle one at a time. And we're going to be using our passport-local-mongoose package to do this.
So in the documentation
//https://github.com/saintedlama/passport-local-mongoose
User.register({username:'username', active: false}, 'password', function(err, user) {
 if (err) { ... }
});
in the example section they show you how you might use this package to register your users.
You would provide a user name which will in our case be an email, the user's password and
then there'll be a callback which might return error if there were problems or a user if everything went successfully.
And then if there were no errors then we can authenticate our user.
So let's go ahead and do that in here.
-
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
Now we're first going to tap into the user model and we're going to call the method register on it.
And this method comes from the passport-local-mongoose package.
And it's only because of the package that we can avoid creating our new user, saving our user and interacting with Mongoose directly.
Instead we're going to be using the passport-local-mongoose package as our middleman to handle all of that for us.
So inside here
//1We're going to first add the username field and we're going to pass in the information that gets passed over from our form.
So it's the field that the user typed in for req.body.username. And this is going in as a Javascript object so with curly braces around it.
//2The next part is we're going to pass in the password that user wanted to register with and this is gonna be req.body.password.
Now for some reason I keep accidentally typing passport insert a password and I often mess those two up.
So be sure that when you're typing you don't make the same mistakes that I do. And it's req.body.password.
//3Now the very last thing that we have to add is a callback which can potentially give us an error
or give us the new registered user if everything was fine.
//3.1And we're going to check to see if there were any errors, then we're going to log those errors.
And for the user we're simply going to redirect them back to the same register page so that they can try again.
//3.2Now if there were no errors though, we're going to authenticate our user using passport.
So we're going to write passport.authenticate and the type of authentication that we're performing is local.
And then once we've authenticated them, we're going to again open a set of parentheses and we're going to pass in req, res and a callback.
And this callback is only triggered if the authentication was successful
and we managed to successfully setup a cookie that saved their current logged in session
so will you have to check to see if they're logged in or not.
So we can assume that if they end up in here then we can safely res.redirect them to the secrets route.
-
Now notice that previously we never had a secrets route
because we always relied on res.rendering the secrets page either through register or through login.
app.post("/register",...)  app.post("/login", ...)
But in this case because we're authenticating our user and setting up a logged in session for them
then even if they just go directly to the secret page, they should automatically be able to view it if they are in fact still logged in.
So that's why we need to create our secrets route.
//5.6.2
app.get("/secrets", function(req, res) {
  if (req.isAuthenticated()) { //if a user is already logged in
    res.render("secrets");
  } else {
    res.render("login");
  }
});
So I'm going to do that just below the register route up here and I'm going to say app.get /secrets
and we're going to have our req and res and inside this callback is where we're going to check to see if the user is authenticated
and this is where we're relying on passport and session and passport-local and passport-local-mongoose
to make sure that if a user is already logged in then we should simply render the secrets page.
But if they're not logged in then we're going to redirect them to the login page.
So here we're going to write
if the request is authenticated then in this case we're going to res.render the secrets page.
But or else i.e. the user is not authenticated, they're not logged in,
then we should redirect them to the logging route and force them to login first before they can view this page.
//5.6.3
So let's go ahead and save our code and see if our registration section works.
Making sure that our servers running without any issue
let's go over to localhost:3000 and let's try to register a new user.
Let's call this new user user@passportlocalmongoose.com or you can call them whatever it is you like.
But I just want to be able to identify them when we try to locate them on our database.
So they're going to get a password that is 123456 and I'm going to click register.
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
And this is going to be a new user created from our Mongoose model and then this user is going to have its two properties username and password setup.
And the user name is going to of course come from the req.body.username and the password is going to be request.body.password.
And this of course comes from the user when they fill in the login form right here.
So now that we've created our new user,
//
app.post("/login", function(req, res){
   const user = new User({
    username: req.body.username,
    password: req.body.password
  });

});

//5.7.2
req.login(user, function(err) {
  if (err) { return next(err); }
  else {
    passport.authenticate("local")(req, res, function(){
      res.redirect("/secrets");
    });
  }
});

then we're going to use passport to login() this user and authenticate them.
And in order to do that we're going to use a login function that passport gives us and it has to be called on the request object.
https://www.passportjs.org/concepts/authentication/login/
So it has to be req.login the user that we want to login and then we get a callback to see if there were any errors.
But if there were none, then we're going to take the user to where they need to be.
So going back to our code.
We're going to call request.login and remember this method comes from passport.
And we have to pass in the new user that comes from the login credentials that the user provided on our login page.
And then we have a callback which can potentially return an error if we were unable to find that user with that username in our database.
So here is where we're going to check to see if there were any errors.
And if there were  -then- we're simply going to log those errors in the console.
But if there were no errors  -then- we're going to authenticate our user
so it means that they've successfully logged in and we're going to call passport.authenticate and we're going to use the local strategy.
And you can see that I'm typing exactly the same code as I've got up here
passport.authenticate("local")(req, res, function(){
  res.redirect("/secrets");
});
which basically authenticates our user using their password and username.
And if we've successfully authenticated them then again we're going to redirect them to the secrets route
where we of course check whether if they are indeed authenticated or not.
-
So both when they've successfully registered and when they've successfully logged in using the right credentials,
we're going to send a cookie and tell the browser to hold onto that cookie
because the cookie has a few pieces of information that tells our server about the user,
namely that they are authorized to view any of the pages that require authentication.
So let's go ahead and hit save and let's check it out.
So we're going to go to the home page  localhost:3000 and we're going to click on login.
So let's find that user that we sign up just now. user@passportlocalmongoose.com and I'm going to put in their password of 123456 and click login.
And now I get taken to the secret page.
So it's working perfectly.
--------------------------

//5.8
Now there's just one last thing. We haven't yet defined a logout route.
And when I click on that button all I get is "Cannot GET /logout"
because that button is trying to hit up a route called /logout and currently in our server we don't have that route.
So let's go and add it in.
-
app.get("/logout", function(req, res) {
  //deauthenticate the user and end the user session
  req.logout();
  //redirect the user to the root route (home page)
  res.redirect("/");
});
Let's add our app.get for the route that is logout and add a callback, a req and a res.
And here is where we're going to essentially deauthenticate our user and end that user session.
So how do we logout users?
Well let's take a look at the documentation. https://www.passportjs.org/concepts/authentication/logout/
All we have to do is to call req.logout and then that's it.
So let's do your req. logout and then we're going to res.redirect them to the home page or the root route
so that they go back to the home page once they've logged out.
So let's save that.

//5.9
And let's go back to our home page and log in our user again. email: user@passportlocalmongoose.com password: 123456 and log in.
And now if we click on logout then you can see it takes us right back to our home page.
And if we tried to access the secrets page  localhost:3000/secrets   it will force us to log in!
-
Whereas if we are already logged in, email: user@passportlocalmongoose.com password: 123456 and log in
and we voluntarily say navigate to some website or closed down the tab
and try to go back to our localhost:3000/secrets our session is saved
and we're still authenticated because of that cookie that we have on our browser.
--
Now remember that when you update the code in your app.js and you hit save that, nodemon will restart your server right?
And whenever your server gets restarted your cookies gets deleted and your session gets restarted.
So now if I try to go to secrets page  localhost:3000/secrets  it redirects me to login because I'm no longer authenticated.
That cookie gets deleted every time we restart the server.
-
So now our website is able to remember when a user is already logged in
so that once they login,  email: user@passportlocalmongoose.com password: 123456 and login,
and they want to be able to access the parts of the website that require authentication localhost:3000/secrets
they don't have to keep logging back in. It's all saved in our cookie (sttting-cookies) for that particular session.
And the content of the cookie has a meaning to our server
because it can check against it and know that the current user is already signed in
so we don't have to force them to sign in again when they try to access a part of the website that requires authentication.
-
So cookies and sessions and passport are not easy concepts to grasp.
So I recommend watching this video a couple of times
and also to be sure that you read through the passport, passport-local, the passport-local-mongoose and the express-session documentation.
It's through reading all of these very very long tomes essentially that you actually understand how to interact with it and
why it is the code looks the way it does.
*/
