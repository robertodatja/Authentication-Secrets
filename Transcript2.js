/*
So in the last lesson we have setup all of our starting files for our very simple website.
And the next step is the setup account creation for users to allow them to register and login so that
they can finally view our secrets page of our website.

And in order to do this we're going to be using Level 1 security,
so the lowest level possible of security for our website.
And this is simply just going to be creating an account for the user, storing their email and password
in our database  so that when they come back at a later date we can check their email against their password
and see if we should let them pass or not.

So in order to create a user account and store these pieces of data then we're going to have to create
a user database.
So we're going to do that using our good old friend Mongoose and MongoDB.
So let's go ahead and stop our server and use npm to install mongoose.
And as always we're going to need to require it so Mongoose equals require Mongoose.

So now that we've required mongoose, it's time to put it into action and we're going to use it to connect to our MongoDB.
So to do that we say mongoose.connect and then we specify the URL where our MongoDB database
is located which as always is going to be our localhost.
So we're going to specify mongodb://localhost:27017 which is the default port for MongoDB.
And then we're going to have a forward slash and the name of our database which we're going to call userDB.
And finally we're just going to add in that flag which is code useNewUrlParser
and this will remove that little warning that we get in the console.
So that's all we need to connect to our MongoDB.

So let's try and run our app with nodemon app.js in the secrets folder and we get a error.
And it tells us that there's a Mongo network error and it failed to connect to the server.
Well the reason is because we haven't started up our MongoDB server yet.
So if we want to do that we have to type the mongod command and now we're listening on 27017.
So if we control + C and rerun our command then it should now be all good and we no longer have this problem.
So everything's all looking great.
Our server started on port 3000.

---
Now all we have to do is set up our new user database.
And to do that we're going to create a schema first.
So we're going to create a userSchema and our userSchema is going to be a very simple Javascript object that only has two fields.
So it's going to have a email which is gonna be a string and it's also going to have a password which is also going to be a string.
And now we can use our userSchema to set up a new user model.So it's going to be a new mongoose.model
and then we have to specify the name of our collection which is also going to be User in the singular form with a capital U
and it's going to be created using that userSchema that we made just there.
So now we can start creating users and adding it to this userDB.
---
So the point at which we want to create our users is of course when the user goes to the register page
and they've typed in their email and their password and they've decided to hit the submit button, then
this form makes a post request to our register route.
-
So in order to catch that we're going to create our register route right here.
So we're going to write app.post and we're going to target the register route. And then we can add
in our callback with that req and res
and then inside the callback is where we're going to create our brand new user.
So we're going to create the user using the information that they passed over from here.
So you can see that these two inputs, one has a type of email and the other one has a type of password
but the most important thing to grab that data from the body of the post request is to know their names.
So one is called username and one is called Password.
-
Let's go ahead and create a brand new user we'll call them a newUser.
And this is going to be created using that user model here.
So newUser open up a set of parentheses and then some curly braces and we're going to specify the values for the two fields.
So one is called email and the other one is called password and let's just check to make sure that we've got it right,
email and password. And the email is gonna be set to req.body.username
so catching whatever it is that they typed into this input and then we're going to set the password
to req.body.password which will be equal to whatever they typed in over here.
-
So now we're ready to go ahead and save this new user.
So we're gonna say newUser.save, not saver but save.
And then we're going to add a callback into the save function to check to see that during the save process
if there were any errors and if there were some errors then we're going to log those errors.
But if there weren't any errors then we're going to res.render the secrets page.
So this is really important.
--
At the moment on our website
we're able to handle get requests to the root route, the login route and the register route.
But notice that there isn't a app.get for the /secret route because we don't want to render
that unless the user is registered or logged in.
So we're only rendering the secrets page from the register and login routes for now.
-
So now that we've set up our website if the user has been successfully created in our database
then they should be able to see the secrets page.
And this is currently the only way they can view the secrets page.
--
So let's go ahead and save our code and check it out.
So our server is still running on port 3000 and if we go over to our localhost:3000
then you can see we've got our home page and we haven't set up the login screen yet.
So let's go over to register and let's go ahead and create an email.
Now at this stage it doesn't really matter what your email address is.
You can call it 1@2.com if you wish.
The only thing that that email checks in terms of validation is that there is:
an @ sign in there and there's a . something that comes afterwards.
So I'm just gonna use 1@2.com or test@email.com just to test it for now.
And then we're gonna add a password and I'm just gonna put 123.
We also don't have any validation there so it doesn't really matter how many digits I put in there.
And this is really good for testing right now
otherwise you're gonna be entering a 12 digit password every time you test your forms which is not what we want.
So now let's go ahead and click register.
-
And you can see it now renders the secret page
and it's showing my deepest darkest secrets which is not much of a secret over here.
So this page is only accessible once you have registered
-
and we can verify this by going over to our Robo 3T and connecting to our MongoDB on our local host.
And you can see check it out we've got our userDB over here.
And in our collections there's a collection of users which only has
one document at the moment which has an email of 1@2.com with a password of 123.
--
So at the moment the user can register
but they can't log in because we haven't created a app.post for our login route.
So when they go onto the login page they enter their email and the password that they remembered from
previously when they created the account and then it makes a post request to the login route.
So let's go ahead and handle that right now.
So underneath the app.post for register
we're going to create an app.post for the /login route.
And here is where we're going to try and check in our database to see if we actually have a user with the credentials that they put in.
So those credentials are going to be a username which is going to be the req.body.username
and also a password which is in request.body.password.
So now we have these two things that the user entered and we have to check them against our database.
So we're going to look through our database and see that for the username with this value if their
password is equal to the one that the user typed in.
So to do this we're going to say user, so look through are collection of users, and we're going to find
one where the email field is matching with our username field.
So remember the username field comes from the user who's trying to log in and the email field is the
one in our database that's got the saved data. And then we're gonna have a callback with a error and
potentially a found user and we can check to see if there were any errors
firstly then we're going to handle that error,
we're going to log it. But if there weren't any errors then we're going to check to see if there was a found user.
So does that user with that email exist?
And if there was a user on our database with that email then we should check to see if that user that
we found has a password which matches the password that the user typed in on the login page.
So if the foundUser.password is equal to the password created here.
And if that is the case then that means not only do we have a user with that email,
so the user exists and they registered before, but also the password they typed in in the form is equal
to the one in our database which means that they are the correct user.
They've successfully logged in and our server has successfully authenticated them.
So in this case we should also res.render the page that we're trying to access which is the one called secrets.
-
So now let's close everything off and we should when we save our app.js check if our server still running
and then go ahead and go back to our home page.
-
Let's go ahead and try and login with the email and password that I registered previously which was 1@2.com. and 123.
So let's try it 1@2.com and 123, hit login and it's now revealed the secret page.
---
So success right? Now there's just one problem.
If we look at our users collection and we look at the documents in there, there's only one at the moment
but we can see the user's password in plain text.
And this is really really bad because if I had millions of users say I was, I don't know, Amazon or Facebook
or Google and I had all of my users passwords saved in plain text like this
then any one of my employees can look through my database and know what everybody's password is.
So that means if I had an employee who wanted to know what was, I don't know,
Britney Spears's'password on Facebook
then they could just look at it and they could use it to log in right?
But also it means that if a hacker decided to hack into my server and locate my database
then this is a pretty big loot for them
if everybody's password was stored in plain text. And most people will reuse their passwords and if you
use the same password on lots of websites then once the hacker knows your email and password for one
site then they can pretty much login as you across all of the websites including things such as your
bank account or Paypal which is definitely not what you want.
-
So firstly, don't reuse passwords.
Try and make different passwords especially for the accounts which are tied to a payment portal.
But the second thing is if you're going to make a website, don't store your users passwords in plain text like this.
It's really really bad.
So now that we've seen what level 1 authentication looks like, it's time to level up and do right by
our users and increase the security of our website.
*/
