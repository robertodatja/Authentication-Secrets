/*
Now while we've been developing this module with every level of increased security I've been committing
the code for each of these stages just so that later on you'll be able to check out the commits that
you want to review and check against your code easily. So you can see that we've got level 1 where
we've got username and password only, and then level 2 where we added encryption to our password field.
But there would be a bit of a security flaw that's introduced by committing all of this code to a remote Git repository like GitHub.
Because if I go ahead and pull up the GitHub page for this particular project you can see everything that
I've committed including all the code that's inside my app.js which as you remember contains some secrets in there namely
the key that we used to encrypt our database.
So this is now on the internet being crawled by Google completely searchable.
Anybody can see my encryption key which also means that anybody can decrypt my encrypted database using this secure key.
So it's not very secure essentially.
It's very easy for people to crawl GitHub looking out for these secrets and API keys that they can take advantage of.
And very often in the development world you hear stories like this where a developer put AWS
keys on GitHub then bad things happen. And it's because currently we're in a bitcoin mining frenzy era.
And to mine Bitcoin you need a lot of computing resources and those resources get directly turned into
money providing a huge incentive for people to scrape the internet for developers who've accidentally published their secret keys.
And this is a good story as well that I'll link to in the course resources where this guy Luke had accidentally published his API keys onto GitHub.
And then he racked up an AWS bill of over 3000 dollars in a very very short space of time.
Now I think the ending to the story was a happy one and Amazon AWS actually refunded him the money but I'm not sure everybody is as lucky as he was.
So these are some really cautionary tales about keeping your secrets, your API keys, off the Internet
where it's publicly searchable and where people can steal.
So that's all very well and good but how exactly do we do that?
-
Because obviously for our app to work we need these secrets to be able to encrypt our database.
And for us to be able to collaborate with other people or simply just using version control or backing up our
project to GitHub then we will need to publish it right?
So the way that developers solve this conundrum is through using something called environment variables.
And environment variables are basically a very very simple file that we're going to keep certain sensitive variables
such as encryption keys and API keys.
So in this lesson I want to show you how we can do this using a really popular package called dotenv.
And you can see just through the sheer number of weekly downloads that it is a really heavily dependent upon module
to keep everybody's secrets off of the Internet safe and secure.
So let's get started by installing this thing called dotenv.
So I'm still in my secrets repository and I'm going to install this thing called dotenv.
//3.1
npm i dotenv
So now that it's installed the next thing to see is how do we use it?.
Well the documentation tells us that as early as possible in your application require and configure this package.
So I'm just gonna straight up copy this line of code and paste it right at the very top of my app.js over here.
https://www.npmjs.com/package/dotenv
//3.2
require('dotenv').config()
-
And you can see in this case we're not actually setting a constant for it
because all we need to do is just require it and then call config on it and we don't need it ever again.
It will be active and running and all we need to do now is to define our environment variable.
Now it's important that you put it right at the top because otherwise if you try to use an environment
variable and it's not configured then you won't be able to access it.
-
//3.3
So what exactly are environment variables?
Well let's go ahead and create them now.
We have to first create a dotenv file in the root directory of your project, so that means in this particular folder here.
So let's go ahead and create a new file by hitting the a key.
Alternatively you can go into hyper and make sure you're in the root directory and simply write touch.env.
Now it's really really important that when you name this file .env can't be used like a file extension.
It's not like .mp3 or .png.
This has to be the entire name of the file. And just like other files like .git, this is a hidden file.
So that means when I hit enter and create that file and I do an ls on my current directory I won't see it.
And it's only when I do ls -a  revealing all of my hidden files do I see it created here.
//But because we have Atom we can also see it inside Atom here.
//3.4
So now that I've created my file the next step is to add my environment variables to that file.
And the format you have to follow is NAME=VALUE and there shouldn't be any spaces in between
and nor should there be any quotation marks and the name should ideally be snake case,
so words separated by underscores and they should all be capitalized.
This is just convention. But I strongly recommend you to follow it.
-
So let's go ahead and define the environment variables that we want to save.
So the top contender is of course this constant code secret.
So let's go ahead and cut it out of our app.js and paste it into our .env file.
//2.2 var secret = "Thisisourlittlesecret";
And let's reformat this so that it complies with the formatting that they want us to have.
So let's first delete the const, this is not a Javascript file. We don't need any const or semicolons, so those are gone.
Then we're going to rename the environment variable to make it capitalized. So this is going to be secret.
And then we're going to get rid of that space between the equal signs and we're also going to delete our quotation marks.
Now in my case the full stop is a part of my encryption key and it's not just therefore grammatical sense
because all of my passwords were encrypted with this key including the full stop.
So I have to keep that in there.
SECRET=Thisisourlittlesecret.
-
However if we say had, I don't know, an API key then we might write it something like this
API_KEY=ajddndjddklla
and it would also not have any sort of semicolons or other symbols at the end.
You don't need it basically is what I'm trying to say.
You also don't need to separate the lines with a comma as you will commonly see when we're writing code files
because this is just a piece of plain text file that's going to be used to be able to render these little tiny pieces of secret information.
-
So let's hit Save and I'll leave the API key in there as well just so I can show you how we can fetch it out.
So let's say that we're running our app.js and we've already required our dotenv package
and we've configured it to be able to access our environment variables
require('dotenv').config()
//3.5.1
then anywhere after this line we should be able to tap in to those variables by referring to them.
So let's go ahead and log say are API key right?
And to do that what we need to write is process.env.
then comes the name of that key which is going to be API_KEY.
console.log(process.env.API_KEY);
So now if I hit save and I run my app.js then you can see printed over here is the content of my API key right here.
ajddndjddklla
So now that we've seen how we can get access to our environment variables
//3.5.2
let's go ahead and fix our code
because as you can see at the moment it's breaking. And it's because we no longer have that secret specified inside our app.js.
So right here we deleted our secret and we moved it into our environment file.
So try and pause the video the change line of code over here so that our app continues to work as it used to.
But now it grabs the secret from our environment variable.
All right.
So all we have to do is exactly the same as what we did up here. Instead of trying to tap into a variable
called secret inside our app.js which now no longer exist,
we're going to replace it with process.env. the name of our secret which is just the word SECRET in all caps.
//3.6
And now if we hit save and nodemon should rerun our server you can see we no longer have any errors
and our server has started on port 3000.
So we can just go ahead and just confirm that everything still works the same by trying to log into our user with the password qwerty.
So everything is working just fine.
//3.7
Now some of you guys might have spotted the next problem that's coming along.
If I go ahead and simply just commit my project with all of the changes as it is to GitHub
I will also commit my environment file which defeats the whole purpose of creating environment variables, configuring
it and changing our code to keep all of those secrets secret right?
So what can we do?
Well, if you remember previously in the Git and GitHub module we covered something called gitignore.
So that's another hidden file that we add to our project
that tells Git which files and which folders it should ignore when it's uploading the files to a remote like GitHub.
And if you search for "github gitignore"  https://github.com/github/gitignore
then you'll see that they've created this very helpful collection of template files for different types of projects.
-
So if we go ahead and search for our   node gitignore   then you can see that this is a template file that
you can create as your gitignore and it will set up Git to ignore most of the files that you don't want to commit.
So let's take a look at what that includes.
//3.7.1 So one of the most common things that we don't commit when we're creating Node projects are the Node modules
because you can see it's a massive list of Node modules and it's a whole bunch of code and a whole bunch of dependencies.
So it massively blows up our project when we're moving it online and offline.
And as long as we've got access to the package.json then anybody who Git clones our project or downloads
it will be able to simply run npm install and it will automatically pull down all of those dependencies inside the Node modules.
So it's common practice to ignore the node_module folder in our Node projects.
-
//3.7.2 The other thing that is inside this template of gitignore is of course the .env file
and this is the dotenv environment variable files. So you can see this is very very common and it's very very essential
that you add this to your .gitignore file so that our secrets do not get revealed to the public on the Internet.
So let's give that a go.
//3.7
Let's go into hyper, let's stop our server and making sure that we're still inside our project root folder
we're going to create our gitignore file and that's simply  touch .gitignore.
We hit enter and now we should have a gitignore file.
//3.7
Here I'm simply going to copy and paste the template that comes from GitHub and I'm going to paste it inside here and then hit save.
So now inside our project folder you can see we've got our .gitignore, our .env file and Atom is actually helpful enough
to show you the files that will be ignored by showing it to you in this kind of greyed out mode.
You can see this folder is not going to be committed neither this one or our .env file and everything
else shows up in a slightly different color. But let's just confirm it for ourselves.
-
I'm gonna go ahead and git add all of my files in my folder.  $git add .
And then I'm going to add a commit message. $git commit -m "Add Environment Vars"
And now I'm going to git push to my origin master  which will now push all of the things I've committed locally to GitHub.
$git push -u origin master
-
Now if any of this is confusing at all, be sure that you've definitely completed the GitHub and Git module
and that you're comfortable with it because I go into a lot more detail on this in that module.
So let's hit enter.
And now if we go into our project folder Authentication-Secrets on GitHub
and we refresh our project then you can see our .env file is not visible in our list of files
and when we go into our app.js it simply refers to our process.env.SECRET
and there's no way for anybody online to be able to see what our API key is or what our SECRET is
unless they had access which keeps us and our encryption safe.
-
However, remember that Git and GitHub works on a version control basis.
So if you click on history for our app.js then you'll be able to see the entire commit history
and all of the versions previous to the current version.
And if we click on the level 2 encryption one you can see that one of the differences here is that
we used to have our secret inside our app.js in plain text not inside our environment variables.
So this is why it's really important that
the first thing you do when you start any new project is to incorporate .env, create your .env file
and as you create anything that should be secure to create it inside that file
and to add that gitignore template before you push to GitHub.
-
Now when we're ready to deploy our app to Heroku, they actually have a specific way of handling these config VARs
because obviously for your app to be able to run it needs access to those secrets.
And there's a special pane Using the Heroku Dashboard
that you'll be able to see on your dashboard where you can set those config VARs especially inside Heroku
and they'll keep those safe and off the Internet, so keeping your API keys and your encryption keys secure.
So it follows exactly the same format as what we've seen in the .env
and you access it in the same way by using process.env.DATABASE_URL   https://devcenter.heroku.com/articles/config-vars
Now in the next lesson we're going to get back to authentication and we're going to level up the security
for our users by switching from encryption to hashing.
*/
