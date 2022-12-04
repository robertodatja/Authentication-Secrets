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
So let's put a app.get for the /submit route:  app.get("/submit", function(req, res) {...});
and here we should check to see if the user is logged in i.e. see if req.isAuthenticated is true.
And if they are then they should be taken to the submit page over here: submit.ejs and we should render it so that the user can submit a secret.
So I'm simply going to copy this
if (req.isAuthenticated()) { //if a user is already logged in
  res.render("secrets");
} else {
  res.render("login");
and paste it inside here: app.get("/submit", function(req, res) {...}); and change the render to submit.
Now it's the same if they were not logged in, we would also redirect them to log in.
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
So let's go ahead and tap into the user model. I'm going to findById where the id is req.user.id.
And once that's completed,
we might either get an error or we might get a foundUser if they do indeed exist.
And if there were any errors we're simply going to console log it
But if there were no errors,
and if the foundUser did indeed exist then we're going to set the found user's secret field to equal the submittedSecret.
And then we're going to save this found user with their newly updated secret.
And once that save has completed,
then we can res.redirect them to the secrets page
So that they can see their own secret alongside everybody else's.
So let's close off these lines of code and let's hit save
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

-------
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

-------
//6_2.8
So in our case we're going to check through our collection of users and look through the secret field
and then let's add in this not equal to null part that's enclosed in curly braces into this find condition.
So we're going to put it inside here. So we're going to make sure that we open up a set of curly braces.
So notice how this is one set of curly braces and this defines the condition that we're going to look through our database with.
And then this is another set of curly braces which is going to be the condition for actually which documents to pick out based on the secret field.
And here we're going to type in what we saw over here  db.mycollection.find({"IMAGE URL":{$ne:null}});
which is a $ not equals to or 'ne': null,  $ne:null
app.get("/secrets", function(req, res) {
 User.find({  "secret": {$ne:null}  });
});
-
//1so this code should now look through all of our users in our users collection,
//2look through the secret fields and pick out the users where the secret field is not equal to null.
So all of these conditions end right here, so make sure that you add the comma there and all of these curly braces are one set of here.
It's really really easy to mess this part up and I do it very often because there's so many curly braces.
//3So here after all of those curly braces and after the colon and after the comma,
we're going to add our callback function with our error or any of the foundUsers.
//4So if there were any errors then we're going to simply log it
//5but otherwise if indeed we actually did find some users, so foundUsers is not equal to nul,
then we're going to res.render our secrets.ejs page and we're going to pass in a variable.
//6Let's call that variable usersWithSecrets because that's essentially what we're searching for right?
We're trying to find all the users which have a filled secret field.
And we're going to pass in these foundUsers as the value for this variable.
So let's go ahead and close off these lines of code
-
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


-------
//6_2.9
and we can now pick this up  (usersWithSecrets) inside our secret.ejs.
<p class="secret-text">Jack Bauer is my hero.</p>
So at the moment the secret text is a single hard coded value, it's "Jack Bauer is my hero."
//1
So let's go ahead and delete that secret text
and instead replace it using the secrets that we actually have in our database.
<!-- 6_2.9 -->
<% usersWithSecrets.forEach(function(user){ %>
 <p class="secret-text"> <%=user.secret%> </p>
<% }) %>
-
So we know that we get access inside secrets.ejs to a variable called (usersWithSecrets)
So inside here we can run a forEach loop.
So we can happen to usersWithSecrets
and we can call for each on this variable to loop through that array
and then we're going to add in a callback function in here to pick up all of those users inside the usersWithSecrets array.
And for each of those users, we're going to render the value of the user.secrets field inside a paragraph element.
-
So inside here between the two p tags is where we're going to add our special EJS tag,
so angle bracket percentage sign equals and then it ends with percentage sign closing angle bracket.
And in between right here just after the equals sign is where we're going to tap into user.secret.
-
So this will loop through all the users with secrets.
For each user that has a secret, we're going to render it inside a paragraph tag
and all we need to do now is to mark out the part of this file that is actually Javascript rather than HTML.
And we do that of course using this angle and percentage signs, percentage sign angle.



-----------------------------------Test-----------------------------------------
So now let's save everything and let's go ahead and test it out.
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
--------------------------------------------------------------------------------
So this is a very very basic and minimalist version of the Whisper app
because the users usernames or passwords or emails, none of that is associated with their secret.
So users can sign up, submit their secrets for all the world to see but they don't have to tell the world who they are.
And we keep their secret secret using all of our advanced authentication methods.
So I hope you had fun learning all of the aspects of authentication.
*/
