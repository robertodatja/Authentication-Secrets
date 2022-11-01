/*
So let us first take a look at it.
So we're going to be using EJS to template and layout our website.

So we've got a header and a footer. And in the header all you have are just some style sheets.
We're going to be using font awesome
and we're going to be using Bootstrap. And then I've got a link towards the custom style sheet which
is over there and all it does is it sets the body and set certain things centred and also gives the
secret text a little bit of formatting.

Now on our home page we've got a jumbotron so that comes from Bootstrap.
If you've got it, take a look at the documentation and it's centred using our custom CSS over here.
Inside the jumbotron I've got a icon of a key and an h1 and a paragraph.
And then there are two buttons down here: one that says register and one that says login
and these buttons each hit up their respective routes which we will set up in our app.js. very shortly.

Now on the login page it's laid out using Bootstrap so our logging form takes up a third of the width of the website
and this uses Bootstrap grids and we covered that in detail in the Bootstrap section
so I'm just gonna go ahead and show you the most important part of this page which is our form over here.

And this form makes a post request to our login route and it sends over a username which is going
to be the user's email and also a password which is gonna be set by the user.

And finally there's a submit button which is going to read log in and that's going to send the post
request to our login route and it's going to be caught in our server.

Now on our register site it's pretty much identical
other than the fact that this keeps up the register route making the POST request and the button says register.

So it's a very very simple registration form.
And then once they have registered or logged in successfully they're able to finally access this secret page.
And this page is going to be the one that requires authentication to access and we're going to
make sure that there's no way of accessing it unless the user is logged in.

And finally there's a Submit page which we're going to look at a little bit later on when we want our
users to start submitting their own secrets. And this form is going to send a POST request to the submit
route and it's going to send over the secret that the user types into the text field and this is all that there is.

Now finally if you take a look inside our app.js you can see that we've just got the very basic
modules that we always use express, body-parser and ejs. And we're adding our public folder as a static resource,
we're setting our view engine to be ejs and we've also set up body-parser.

And at the very bottom we've just got some code to start our server on port 3000.
So this should be intimately familiar to you by now.
But if not, make sure you have a look back at the beginning of the Node module where we covered this in detail.

Now in our code we're requiring all of these packages.
But you'll notice that in your project folder we don't yet have a packages.json
and that is because we haven't installed these packages. Now we're going to open up our hyper terminal
and you're going to cd over to wherever your project folder is.
So in my case the project files for the secrets project is on my desktop
so I'm going to cd into them.
Yours might be in download or wherever it may be.
Once we're there, we're going to run npm init and I'm going to set the y flag to answer yes to everything
as usual and then I'm going to install some packages. And the packages that we pretty much always need
are express and ejs and body-parser.
So let's go ahead and install all three of those packages.
So once it's completed doing that then we should now have our package.json updated with our three dependencies:
body-parser, ejs and express.
So we're ready to go and build out our server
now.
First things first, we want to be able to view some of these websites.
So we're going to have to add some app.get in here.
So I'm going to target the home route or the root route and here I'm going to render my home page. So
I'm going to just use res.render and we're going to render the page that is called home.ejs.
And then we're going to do the same and I'm just gonna copy and paste it
so you doing it bored watching this. And we're going to change it to the login route, the register route
and we're gonna change the render to the login page and the register page and that's it.
So now let's go ahead and just double check our code that we don't have any forward slashes in the res.
renders and we saved our file and we can go ahead and start nodemon app.js and you can see our servicestart on port 3000.
So let's go ahead and check it out. So here is our home page rendered and you can see that's where our little font awesome icon comes from,
h1, our little title there and we've got our register and login buttons.
So if I click on register, it should take me to /register.
And that's because that button makes a GET request to that route which we target in here
and it renders the register page which looks something like this. Very simple, just two fields, email and
password set up very simply using Bootstrap cards and Bootstrap forms. And if we go back and click on
login then it takes us to the login page which looks pretty much identical.
So now our website is pretty much set up and ready for us to start adding some authentication to it
so that we can see if a user is registered or logged in before we allow them to view the secrets page.
So in the next lesson
that's exactly what we're gonna be doing.
We're gonna be creating our user's account on a MongoDB database and we're going to be authenticating
them using our level 1 security authentication.

//app.js-------------------------------
app.get("/", function(req,res){
  res.render("home");
});

app.get("/login", function(req,res){
  res.render("login");
});
app.get("/register", function(req,res){
  res.render("register");
});

//Hyerterminal
npm init -y
npm i express body-parser ejs
*/
