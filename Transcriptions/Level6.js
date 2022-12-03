/*
It's time to level up yet again and we're now on level 6
and on this last level we're going to talk about third party OAuth.
Now what exactly is OAuth?
You might have heard of this term but all it is it's simply a open standard for token based authorization.
Now what did all of that mean?
Well let me explain.
So you've heard of Facebook right?
-
But let's say that we're building a different web app.
Let's say we're building a social network that's going to be the new Facebook and it's going to be called bracebook.
And bracebook is an awesome social network for people who have braces.
Now when you're a new user who's signing up for bracebook you probably won't have any friends in the beginning right?
And nobody likes a social network where you have no social connections and nobody wants to feel like they have no friends.
-
So what can we do as the developers of bracebook to make this process of joining our social network a little bit easier?
Well we can ask the user for permission to access their Facebook account
and see which friends they have on Facebook are already users of our service bracebook.
-
So now once a user sign up they'll already see that three of their friends are already on bracebook
and they're ready to get started in a new life of socializing with their be braced friends.
Now how would this work exactly?
-------
Well, on our login page we can ask the user to sign in
either manually where they don't get the benefits of instantly connecting with their friends who have braces
or we can get them to login with Facebook.
-
And in this case what would happen is
we would make a GET request to Facebook asking them for this user's friends on Facebook
and Facebook would return with a POST request with that list of users and emails.
So this might be a really simplified version of that.
It's just a straight up table of this particular user's friends on Facebook and all of their emails.
So then this gets passed over to our server where we can compare it against our database of users
and see whether if we have any matching users who have the same email addresses.
So now we know that for this user we have three friends of theirs
who are already on bracebook and we'll be able to automatically add them as a friend onto bracebook.
-
And it's also a similar scenario if you are signing up to LinkedIn for example.
If you couldn't be bothered to type in all of your contacts email addresses to find on LinkedIn and add them individually,
then what LinkedIn might do is
it asked you to log in via Google and it will look through all of your contacts on Gmail in order to add them automatically to LinkedIn.
--------------------------------------------------------------------------------
So by using OAuth
we're able to access pieces of information on these third party websites such as their friends, emails or their contacts on Gmail.
-
But in our case because we're talking about authentication and leveling up the security of our authentication
another really big benefit involves delegating the task of managing passwords securely to these companies like Facebook and Google.
So as we mentioned before, every day or so yet another company gets hacked.
And these companies tend to be kind of low tech companies, companies that are not Facebook, Google, Amazon,
who are really known for having great engineers,
great teams who are able to implement all of these levels of security for the authentication on their website.
And they probably have thought about hashing and salting passwords or other data that they're storing.
But there's more.
-
There are things such as not only salting the passwords but also peppering the passwords.
Some companies also encrypt the entire database containing the hashed passwords
and have a wide array of complex mathematical solutions to keep their user passwords under lock and key.
Now as a web developer, we could implement all of those things that I just spoke about and address all of the edge cases
but it would take us a lot of time and a lot of development hours.
-
So why not simply delegate this task to a large company like Facebook and Google?
So then every time we log in our user we simply ask them to login on Facebook
and Facebook will then authenticate them using their own secure methods.
And once that's done, Facebook sends us back a message saying "This user is authenticated.
There are real Facebook user and they have got their correct username and passwords.
So go ahead and authenticate them as well. And that will make our lives a lot easier.
We'll have a lot less liability
and this is the way that you're seeing a lot of websites going where they only have third party log in.
Like login with Twitter, Facebook, Google, GitHub.
--------------------------------------------------------------------------------
But in order for us to be able to do all of this we need to learn about OAuth.
That is the glue that binds all of this together and makes it actually tick.
Now what exactly is special about OAuth
because there's a lot of other open standards that does something similar to this?
But OAuth is quite special in three ways.
//1
The first way is that it allows you to grant a granular level of access.
What does that mean?
That means that when your user logs in with Facebook, you c
So you could say that for my app I only really need their profile and email address.
But say if you were Tinder and you wanted to know who or their friends were
so you don't accidentally match them up then you might want to know also their list of friends.
So this is what I mean by granularity.
The app developer can determine what kind of data do they need from the user's facebook account and request those accordingly.
//2
Now the second thing about OAuth is it allows for either read only or read and write access.
So in the case of Facebook this means that you can either ask them to just retrieve pieces of information
about their Facebook account so what's their name, what their email, who are their friends.
Or you can ask for right access as well.
//Say for example in this case
if WordPress wanted to be able to post to Facebook on this user's account
then they would need to ask for read and write access.
//3
And the third thing is that the third party that you're using to authenticate your users should be able
to revoke access at any point on their website.
So that means if you're on authenticating with Facebook, the user should be able to go into their Facebook
account and deauthorize the access that they granted to your websites, say bracebook.
And they don't actually have to go onto your website where maybe you're less keen to give up this access.
So now that we've looked at what's special about OAuth,
--------------------------------------------------------------------------------
the next thing to talk about is, well how does it actually work in reality?
//So the first step
is to actually tell this third party, be at Facebook, Twitter or Google, about our Web application because they don't know about us right?
So we have to set up our app in their developer console and in return we get what's called an app id or a client id
and we or our website is then the client which will make their request to Facebook to authenticate our user.
Now once you've set up your app,
//the next step
happens when the user tries to log on to your website.
So when the user hits up bracebook.com and they want to authenticate, we give them an option to login with Facebook.
So once they click on that option then we'll take them to the actual Facebook website
so that they are seeing a familiar interface, a trustworthy interface and they'll log into Facebook using their Facebook credentials.
And without OAuth what we would have to do is to ask the user, "Hey what's your login credentials for Facebook?
Can you give me your Facebook password?" Nobody wants to do that.
That seems super sketchy and really insecure.
OAuth makes that step a lot easier because it gets them to log in on the website that they actually trust which is Facebook right?
Something that they've been using for a long time.
Now once the user logs in on this third party
//then they have to review the permissions that our website is asking for.
So for example you might want your profile and email address and they review that and they're like OK I'll grant that permission.
So now that they've granted the permission and they've successfully logged in on Facebook
then
our website will receive an authorization code from Facebook
and this allows us to check to make sure that the user actually successfully signed on to Facebook.
They had the right username and password. So we're now able to authenticate them and log them on to our website.
-
But if we wanted to go a step further,
we can also exchange our authentication code for an access token.
And when we receive that access token from Facebook we would save it into our database
because this is the token that we can use if we want to request for pieces of information subsequently.
This access token is valid for a lot longer than the authentication token.
-
So the way you should see it is that
//the authentication code or the OAuth code: is kind of like a ticket right? A ticket that you are going to use once to enter the cinema. But
//the access token: is kind of more like a year pass and it comes with benefits like backstage access where you get to request pieces of data from Facebook
including their friend list or that username or their password whatever it may be that they granted you permission to access.
So
//the OAuth code: is what we need to authenticate user that they successfully managed to log in through Facebook and
//the access token: is what we'll use to access pieces of information that are stored on that user's account
nn these third parties website for example their email or their friends list.
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
So now that we've seen all of this let's go ahead and actually put it into practice
and in our case we're going to be implementing login with Google using a passport and Google OAuth.
All right.
So enough theory let's get started implementing it and adding login with Google to our website.
//So first things first,
let's head over to passportjs.org and we're going to go and find the strategy that we need.
So here you'll find this two Google OAuth strategies.
//One is passport Google OAuth and the other one if you scroll down a little bit is //passport Google OAuth 2.0.
Now it's quite important that we choose the right one.
And we're using the latest implementation of OAuth, OAuth 2.0 with Google.
So let's select this one.
//6.0
https://www.passportjs.org/packages/passport-google-oauth20/
Now here we have the actual strategy NPM package passport-google-oauth20.
-
So in order to use it we first have to install it.
So let's go ahead and copy this over to our hyperterminal making sure you're still in the same directory
and we're going to npm install this package.

//6.1
npm install passport-google-oauth20
Now while that's going, let's take a look at what else we need to do in order to set it up and use it.
So the first thing they want us to do is

//Part1
//6.2
https://www.passportjs.org/packages/passport-google-oauth20/
to create an application - on the Google developers console - and there's a direct link that should take you there.
https://console.cloud.google.com/apis/dashboard?pli=1&project=pristine-gadget-271815
Now once you're here you should be able to go ahead and create a project.
So you can either click on here or go over here and click on new project.
Now we're going to give our project the name of Secret and you can leave everything else and go ahead and click Create.
All right.

//6.3
So that takes a little while but once it's done, we should be able to go ahead and set up our credentials for Google OAuth.
So let's click on this tab and the first thing we have to do is go to the OAuth consent screen over here
and we're simply going to configure the screen
that the user sees when they login through Google and grant your application access to their data.
-
So it's helpful for them to know what application they're talking about
so we're just going to put in the name of our app here: Secrets
and if you have a logo for your app this is where you would upload it.
-
So that on that screen when the user gets asked for permission for your app to access
say their contact or their friend or whatever it may be,
they can quickly identify who it is that's asking for it and just be rest assured that it's the right one that they're giving permission to.
But in our case we're going to leave all of that as blank.
-
And the last thing I want to point out on this page is the part where it says: scopes for Google APIs.
And here are the fields that you will receive once the user logs in through Google.
So in our case,
//we're probably only interested in the email and the profile ID of our user who's logged in.
Now if you wanted more data from them such as. I don't know. their YouTube viewing history, their list of contacts on Gmail
//then you would have to add a scope.
And in order to add scopes you need to enable certain APIs.
//And Google API library has a whole bunch of APIs that you can actually tap into.
So you can see where they've been using the maps API,
you can see what emails have they got that are in drafts using the Gmail API,
you could see what the YouTube videos they're looking at and you can also find out who their contacts are through the Google people API.
-
And all of those involve jumping through extra hoops.
But in our case we only want to authenticate them through the use of Google login.
So we don't have to do any of that and all we need are the default ones that we get for free
without even the user needing to see a permissions page because these three things (email, profile, openid)
are transmitted every time you authenticate with Google.
-
So now that we're done,
//the last thing I'll add is that once your website is up and running and you've got a custom domain name and it's being hosted,
then you'll want to add all of those things in here - App domain: like a privacy policy page or terms of service link and also your main domain.
So let's go ahead and hit save.

//6.4
//And now we get to create our API credentials, by clicking on this button.
//And the one that we want is the OAuth client ID, and this is going to allow us to authenticate them using Google.
So we're going to be using the OAuth 2.0 protocol
//and we are a web application. So we'll take that radio button
//and the name of our app is of course again Secrets
and there's two other fields that we have to fill in.
//6.4.3
One is the origin, Authorized JavaScript origins
so where is that request to Google going to come from.
And in our case it's going to come from our local host.
So we'll put an http://localhost:3000 and this is obviously for when we're testing.
And when your websites live, you can come back here and change it at any time.
But while we're testing all of this,
it's really important that we have all of these addresses and that yours as much as what you see on screen exactly.
//6.4.4
So the second thing that we have to add here is the redirect URI, Authorized redirect URIs:
So this is a route that we're going to plan out on our server when Google has authenticated our user to return to
so that we can then locally authenticate them and save the session and cookies and all of that.
So here we're gonna put http://localhost:3000/auth/google/secrets.
And I'm gonna come back to this route very very shortly
but for now just check to make sure that you have inserted in here exactly the same string as I have
because if it's not, then our authentication will fail and it'll be hard to identify down the line.
So once you've made sure that both of these are correct then go ahead and hit enter
and that adds those to our credentials and we can go ahead and create a client ID.
-
OAuth client created
Your Client ID: ...
Your Client Secret: ...
So now we get a OAuth client ID and a client secret and these are super important and you should also keep them secret.
So that means we're going to put it into our .env file.
So I'm going to copy my client ID,
I'm going to go back to Atom and open up my .env file and I'm going to add it in using the .env format.
So this one is gonna be CLIENT_ID and it's going to be equal to that string that I copied over without any quotation marks or any other sort of Javascripty type of things.
And the second one is going to be my client's secret. So let's copy that and add an CLIENT_SECRET and this is gonna be equal to that string.
All right. So now that we can save those two things
-
//Part1-Review
and we can get back to setting up our Google OAuth strategy using passport.
So we've done this part. https://www.passportjs.org/packages/passport-google-oauth20/
We've created an application on Google Developer console and we now have a client ID and client secret.

//Part2
//6.5
So now we get to configure our strategy.
//6.5.1
And the first thing that we have to do is we have to require this package in our code.
So I'm gonna go ahead and copy this part and I'm gonna change it to a const but other than that I'm going to leave it exactly the same.
So it's a new constant called GoogleStrategy and it uses the passport-google-oauth20 package that we installed just now and we're going to use it as a passport strategy.
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//6.5.2
And the next part is where we get to set up our Google strategy and configure it using all of those details that we received just now.
So I'm going to select and copy all of this code from passport use down to the very last semicolon; just before Authenticate Requests.
And I'm gonna paste it in here below where we have serialize and deserialize our user. So right here.
https://www.passportjs.org/packages/passport-google-oauth20/
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
So we have to add in our client ID which is in our .env file
//and so we're going to write process.env.CLIENT_ID.
//And we're going to do the same for our clients secret.
//And finally we have to change the callback URL to the same one that we put in on the Google API dashboard.
So if you want to remind yourself what it is that you set just click on that and you'll be up to see it right here.
And in fact I'm just going to copy that string directly so I don't make any typos and I'm going to paste it in between the quotation marks.
And my callback URL hits up a path on my server at /auth/google/secrets which we will set up very very shortly.
https://console.cloud.google.com/apis/credentials/oauthclient/488366710860-k1c2maleqf3m9sknncmuvjvc3bpn2uln.apps.googleusercontent.com?organizationId=0&project=pristine-gadget-271815
Authorized redirect URIs, For use with requests from a web server
//clientID: process.env.CLIENT_ID
//clientSecret: process.env.CLIENT_SECRET
//callbackURL: "http://localhost:3000/auth/google/secrets."

//6.5.4
Now there's just one more thing that we need to add to this configuration.
And the only reason why we need it is
because Google has recently announced that they are sunsetting the Google+ API and all things related to Google+.
And they're finally giving up on trying to make people use their Google+ service as a social media site.
https://blog.google/technology/safety-security/project-strobe/
-
So if we head over to the GitHub repository for this package: passport-google-oauth20
you can either paste this into Google or right click here and click copy.
Now if you click on this actual address it takes you to a resource but we actually want to view it on Github and you can see that the link is here in the text.
So we're just going to copy that and then I'm going to paste it in here and that's the actual repository on GitHub.
https://github.com/jaredhanson/passport-google-oauth2
So here if you go into the issue section
-
I've noticed that people have been talking about the // Google+ deprecation.
https://github.com/jaredhanson/passport-google-oauth2/issues?q=Google%2B+deprecation
//And the problem is that Google made a recent announcement saying that Google+ is sunsetting.
So previously this package relied on Google+ to obtain user information so they got the user's Google+ profile.
And people are wondering how would we proceed once that API deprecates.
So if you scroll down a little bit, you'll notice there's a post by this guy MarshallOfSound commented on Dec 21, 2018
https://github.com/jaredhanson/passport-google-oauth2/pull/51
usually the most helpful posts have the most upvotes or thumbs up and you can see that when you're just scrolling through as well.
And this guy is very kindly done all of the heavy lifting for us
//and he's put in a new pull request to fix this package in regard to this deprecation of the Google+ API.
now what he's saying is
all you have to do to fix this is to simply add this in these strategy options.
//6.5.4
So let's go ahead and copy all of this - userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
and we're going to paste it right at the end here as the final option.
So after the callbackURL we're going to add a comma to separate it
and we're going to paste in the userProfileURL option set as this link.
And I'm just gonna delete the single quotation marks and change it into double just for consistency sake
userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
and now
when we use passport to authenticate our users using Google OAuth
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
Let's npm install mongoose-findorcreate. I'm just going to copy it from the docs and paste it in here.
//6.6.1
And once that's installed the next thing we have to do is to require it in our app.js.
So I'm going to create a new constant right at the top and I'm going to set it to equal findOrCreate. Notice how this is spelt exactly the same as this
and when we tap into this findOrCreate it's going to look inside this package to see how it should implement that function.
//6.6.2
Now the final step that the documentation tells us to do is to add this as a plugin to our schema.
So similar to what we did with our passportLocalMongoose package, we're going to also add this findOrCreate package as a plugin.
So userSchema.plugin findOrCReate.
So now our code should work and we should be able to tap into our user model and call this function findOrCreate which previously didn't exist.
--------------------------------------------------------------------------------

So now that we've set all of this up in our backend,
the next thing to do is to figure out a way for us to be able to tap into it from our frontend right?
-
At the moment on our website there's no way of logging in with Google.
If I run my server  nodemon app.js and I go over to localhost:3000
then you can see when I click on login or register there's no button for me to go down the Google authentication route
because all of this is linked up to our local authentication.
So what do we have to do?
//6.7
Well, we have to add some buttons onto these websites.
So if you head into our views
//6.7.1
and go over to register.ejs,
if you scroll down you can see there's a section of HTML code that is commented out. (lines 27-36)
So if you select all of it and uncomment it by using Command + / or control + / on Windows then we now have activated our code here.
So now when I refresh this page we get a button over here that says "Sign up with Google".
//6.7.2
And let's go ahead and do the same on our login page (lines 27-36)
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
And notice how this is very similar to the code that we've got down here when we authenticated our user using the local strategy.
passport.authenticate("local")(req, res, function(){
  res.redirect("/secrets");
So we're starting to see how passport can be used flexibly and by adding in or switching out
different strategies we can implement lots of different ways of authenticating our user using the same library.
Now the next thing we have to provide is a scope. Now how do I know about all of this?
Well of course it's from the documentation.
https://www.passportjs.org/packages/passport-google-oauth20/ -Authenticate Requests
So if you scroll down a little bit on the passport Google OAuth documentation page you can see that they've got all of this in here for you.
So for simplicity's sake, you can simply go ahead and copy this and paste it in here as well.
//6.7.3
app.get("/auth/google",
 passport.authenticate('google', { scope: ["profile"] })
);
So in this case what we're doing is
we're saying use passport to authenticate our user using the Google strategy
which we have setup over here as a new Google strategy
passport.use(new GoogleStrategy({ ...})//6.5.2
passing in all of those things: clientID, clientSecret, ... to help Google recognize our app which we have set up in the dashboard.
And then we're saying when we hit up Google, we're going to tell them that what we want is
the user's profile and this includes their email as well as their user ID on Google which we'll be able to use and identify them in the future.
So I'm just gonna go and change those single quotes to double quotes again for consistency.
It doesn't actually change anything about our code.
//And this line of code here:  passport.authenticate('google', { scope: ["profile"] })
should be enough for us to bring up a pop up that allows the user to sign into their Google account.

--------------------------------------------------------------------------------
So let's go ahead and save our app.js and make sure that our is still running.
And let's go ahead and test it out on local host.
So let's head back to the home page, go over to register and click on the "Sign up with Google".
And now you can see we get redirected to a page on Google itself and we're able to login using our Google account.
So I'm going to select my account to login, but then I get an error and it says
Cannot GET /auth/google/secrets.
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
We have to make sure that this gets changed to the route that Google actually tries to hit up
which is the one that we specified here which is gonna be /auth/google/secrets or whatever you typed into your dashboard.
http://localhost:3000/auth/google/secrets.
And all we have to do is change this to secrets so that it matches exactly.
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
Well, at which point do we serialize our user? It's right over here right?
passport.serializeUser(User.serializeUser()); //5.5.2
passport.deserializeUser(User.deserializeUser()); //5.5.2
And this code actually comes from a package that we used earlier on, the passport-local-Mongoose package.
https://github.com/saintedlama/passport-local-mongoose
And they provided a simplified way of serializing and deserializing your users using their package.
So it's through the use of this package that's been added to the userSchema  where this method serializeUser and deserializeUser comes from.
Now however,
if we look at the passport documentation and how they configure the passport package to serialize users and deserialize users,
https://www.passportjs.org/concepts/authentication/sessions/
you can see it's a little bit longer but it means that it's going to work for all different strategies not just for the local strategy

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
So let's go ahead and delete these two entries
and let's go and fix our code.
So at the moment when we get the data back from Google not only do we log their profile
but we also try to find it in our database or create them on our database
and that's all based off a field called Google id, which is supposed to exist on our collection of users.
But at the moment, our collection of users only have two fields that we work with: email and password.
And this is based off the days when we were still logging users only through the local authentication method.
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
So what we're going to use is something called social buttons for Bootstrap and all we have to do is
go ahead and download the code https://lipis.github.io/bootstrap-social/
and inside the extracted folder you should see a file called bootstrap-socia.css
and we're simply going to drag that file into our public CSS folder next to our styles.css.
So I'm just going to grab that and pop it over here.
So if you take a look at it you can see that it's basically a minified version of some styles
that we can apply to any of our buttons to add in some much needed styling.
//6.9.1
So first things first,
if we're going to add in a new stylesheet - we have to head over to our header.ejs and add it in as a link.
And whenever I add in any sort of styles from any external source say Font awesome or Bootstrap
or in this case the social buttons, I'd like to put it above my custom style sheet.
So that means I can go into my styles.css and override anything that came from other people.
So this is where I'll be adding in a link for that style sheet.
And if you right click on that stylesheet that we just got we can click on rename
which allows us to see its full name and I'm going to copy it (bootstrap-social) and paste it over here.
And we're going to make sure that there is no forward slash before the css and this href should now point to that new file that we downloaded and incorporated.
<link rel="stylesheet" href="/css/bootstrap-social.css">   <!-- Level6.9.1 -->
<link rel="stylesheet" href="css/styles.css">
</head>

//6.9.2
So now let's hit save and go over to our register page and update that anchor tag so that we add in the required classes.
https://lipis.github.io/bootstrap-social/  - Add some buttons!
So the classes that we need are btn-social which adds some of the sizing and the rounded corners et cetera, and then whichever social button we want.
So in our case it's going to be btn-social and btn-google.
So now if we hit save and go over to our register button and refresh, you can see it now start looking a lot more like a proper "Sign up with Google" button.
//6.9.3
And in the future if you wanted to add another button say, I don't know, "Sign up with Facebook"
then all you have to do is to change this to Facebook and change the icon to Facebook.
And when we refresh you can see we now have multiple social signing opportunities for the user and it's all styled with very little effort from us.
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
--
But notice that when I click on log out and I tried to log in again
I don't get taken to Google again and have to log into my account.
And the reason is because we're only persisting the login session on our Web site.
So it means that once they manage to get to secrets and they navigate around on our website,
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
