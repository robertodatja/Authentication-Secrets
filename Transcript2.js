/*
So we've taken a look at level 1 encryption which is basically just storing the password as plain text in our database.
So maybe it'll be a little bit difficult for people to get access to our server and access our database.
At least you can't just simply right click on a website to view page source and be able to see it in the HTML.
Well at least it's stored at server level. But that's not really good enough.
So let's go ahead and see what we can do to improve the security for our users on our website.
-
So let's increase to level 2 authentication. And level 2 authentication involves the use of encryption.
So what exactly is encryption?
Well basically all it is is just scrambling something so that people can't tell what the original was
unless they were in on the secret and they knew how to unscramble it.
This is exactly the same as if you and your friend were sending each other secret messages and you had
a key to encode the message that you both knew so that you could decode the message.
Now on a bigger scale if you've ever watched The Imitation Game or read about the Enigma machine,
well that is basically a form of encryption.
-
And the Enigma machine if you don't know is just simply a machine that was used during World War 2 when
the Germans would send each other messages they would use the machine to encrypt those messages so that
when the messages are intercepted say over the radio, unless you had the same Enigma machine and you
knew what the decoding Key was or what the settings were for the machine, then you wouldn't be able to
tell what it is that they were trying to communicate with each other.
If you were interested, I really recommend watching two videos that were done by Numberphile on YouTube and
I've linked to it in the course resources list but it explains the Enigma machine
and it talks about the flaw in the Enigma machine that led Alan Turing and other people at Bletchley Park
to be able to crack the code and create what was very much a specialised computer to be able to decode
those messages and helped the Allies win the war.
And if you ever visit London be sure to go and check out Bletchley Park and they have a computer museum
next to it as well which is super fascinating. Anyways I digress.
-
So back to ciphers and encryption. One of the earliest ways of encrypting messages that we know about is the Caesar cipher.
And this comes from Julius Caesar who was one of the generals in the Roman Empire and what he did is
he would send messages to his generals and he would encrypt it
so if his messenger got murdered along the way then his messages would be kept secret.
And this is one of the simplest forms of encryption we know about. And it's very simple.
Let's say we have the alphabet right?
ABCDEFG. All that the Caesar Cipher does it's a letter substitution cipher.
And the key for the cipher is the number of letters that you would shift by.
So if you knew what the shift pattern was then you could really quickly decipher the message.
So if we were to encrypt the word Hello there's a really neat tool online that can help us do that.
It's called cryptii.com
and it's got two 'i's at the end. And you can basically choose the kind of
cipher or encryption that you want to-- that you want to use and then you can specify a shift and we're
going to see a shift of three let's say.
So if my text was Hello, then it becomes shifted into "khoor" and to an unknowing person and a non cryptographer
it can be quite difficult to see at a glance what exactly this is trying to say.
-
Now in modern days and with modern cryptography this is overly simplistic and it's very very easy to crack.
But there are other forms of encryption which are a little bit more complicated and it involves a lot
more maths to make it more time consuming for somebody to crack.
But essentially all encryption works exactly the same way.
You have a way of scrambling your message and it requires a key to be able to unscramble that message.
All right.
So now that we've learned all about encryption, it's time to go ahead and implement it so that we can
encrypt our users passwords on our database and keep it secure.
-
So the npm package that we're going to use is something called mongoose-encryption.
And if you take a look at the documentation it's basically a very simple encryption package that works with a mongoose.
So it's perfect for us.
-
So it uses an encryption algorithm called AES which is a relatively modern encryption algorithm
and it is far more secure than something like the Caesar cipher which is very very easy to break.
Now before we get started I recommend you just have a quick read of the documentation here.
This package does two things:
it can encrypt and it can authenticate.
We're only going to use its most basic functionality which is encryption and we're going to leave the
authentication for a later lesson when we discuss things such as hashing algorithms.
So as always to begin we're going to go ahead and install that package into our project.
-
All right.
So first things first, let's stop our server from running and let's go ahead and install mongoose-encryption.
Let's just make sure that we don't have any typos in that name and let's hit enter.
So while NPM is installing that package we can go ahead and require it in our app.js.
So I'm going to call this encrypt and we're going to set it equal require mongoose-encryption.
All right.
-
So now that we have the package required and installed, we're gonna go ahead and use it.
And of course to figure out how we do that
we go to the documentation. So it briefly describes how the encryption actually works
and then it tells you how to get started.
So we've got installation step which we've already done, so now we're onto the usage step.
-
So firstly we have to require mongoose and require mongoose-encryption and then we have to change our
Mongoose schema a little bit because notice that in their Mongoose schema they're actually creating a new
Mongoose schema whereas ours is just a very simple Javascript object.
Now this works as long as you're not doing anything fancy with the schema.
But in this case, as you'll see later on, we're actually adding this encrypt package as a plugin to that Mongoose schema.
So
we're going to have to level up a little bit and turn our schema into a proper Mongoose schema object
and in fact if you take a look at the schemas section in the Mongoose documentation
where they talk about defining your schema, you can see that they're also creating a new mongoose.Schema
and then they're creating a new object from that class in order to define the schema.
So let's go ahead and change our very simple version of a schema into a full Mongoose schema.
So we're going to type new mongoose.Schema with a capital "S" and then we can open a set of parentheses
to enclose this entire Javascript object.
So one here and one here.
So now this user schema is no longer just a simple Javascript object but it's actually an object that's
created from the Mongoose schema class.
So, let's go ahead and hit save and then let's see what else we need to do.
-
So there's two ways of going about encrypting your database using this Mongoose encryption package.
One way is to create an encryption key and assigning key. Alternatively and the one that we're going
to be using is a little bit later down in the documentation which is why it's helpful to read the entire documentation.
We're going to be using the convenient method of defining a secret which is simply a long string and
then we're going to use that secret to encrypt our database.
So let's go ahead and define that secret down here.
So I'm gonna create a new constant that's called secret and this is gonna be set to a long string that you're going to keep secret.
So let's say ThisisourLittlesecret.
-
And now we're ready to use that secret to encrypt our database
and we do that by taking that schema that we defined earlier on over here
and we're going to add our Mongoose encrypt as a plug in to our schema
and we're gonna pass over our secret as a Javascript object.
So let's go ahead and implement this line of code in our app.js
and I'm gonna put it right below here.
Now it's important that you add this plugin to the schema before you create your Mongoose model
because you can see that we're passing in the userSchema as a parameter to create our new Mongoose model, that's the user model.
But before then,
we're going to add our encrypt package as a plugin.
And if you have a moment to spare, do read the part of the documentation on plugins on the Mongoose website
https://mongoosejs.com/docs/plugins.html
and it talks about how essentially what plugins are is that just extra bits of packaged code that you
can add to the Mongoose schemas to extend their functionality or give them more powers essentially.
So now that our schema has this encryption power enabled, but what this will do is it will encrypt our entire database.
-
Now you may or may not want that kind of behavior for your database because later on when the user logs
in we're going to have to search through our database to find their email address.
It's best if we only encrypt the password field and leave the email field unencrypted.
-
So to do that, we have to change an option for our Mongoose encryption package and the option that we're
going to change is to only encrypt certain fields
and they cover that in this section of the documentation. And to do that all
you have to do is to add this option "encryptedFields" into that JavaScript object at the end of that plugin code.
So we're going to copy this little part here and we're going to add it just before the closing curly brace,
so right after our secret right here.
-
Now in our case the encrypted field is not age but it's going to be the password field.
So we're going to swap out this particular input with password and that's just a simple string that
you put in there that you have to make sure matches with one of the names of your fields.
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
-
Now if you wanted to encrypt multiple fields
you can also do that just by adding other entries into this array  ["password", " ", " ",...]
--
So now that we've added our encryption package to our userSchema,
we've defined the secret that we're going to use to encrypt our password
and also the field that we actually want to encrypt,
we're pretty much done.
-
So we don't actually have to do anything else special in the register or the login sections because
the way that Mongoose encrypt works is that it will encrypt when you call save, and then it will decrypt
when you call find.
So that means that when we create a new user with an email a password and we call save, automatically
behind the scenes Mongoose encrypt will encrypt our password field.
And when we later on try to find our document based off the email that the user has entered then at this stage Mongoose encrypt will decrypt
our password field to be able to check it in this step and see if the user can login.
-
So let's save our file and let's go ahead and run it by using nodemon app.js
and make sure there's no errors on running it.
Then we can go ahead and hit up localhost:3000 and try to register.
So we've already created a user called 1@2.com,
let's create a2b.com now and let's define their password as qwerty,
-
so the first six letters of the keyboard and believe it or not this is one of the top five passwords
that's used by people all across the world along with the actual word password and 123456.
Now if I have read out your password just now, please change it while you learning security. It's a good
idea to update your own as well.
-
So let's go ahead and hit register and we've been taken to the secret page.
So that means we've successfully saved our new user into our database.
-
So let's take a look at that user inside Robo 3T
So we can see that previously when we didn't encrypt our password it's just out there in plain sight basically.
Anyone can read this user's password.
But now that we have added our encryption, you can see that it's now a very long binary string that is
very hard for anybody to guess what it might be.
So that means if somebody hacks into our database they won't be able to skim everybody's password immediately
like they can do here.
So we've updated the security for our users just a little bit.
--
So let's see how Mongoose encryption handles decryption.
So let's go back to the home page and try to log in our user
a@b.com and let's put in their password which was qwerty.
Let's go ahead and click Login.
So it's taken me to the secret website and we know that on our database that password is stored encrypted.
So that means that when we perform that findOne step, Mongoose encrypt was successful in decrypting
the password to be able to compare it at this stage.
And if you want to, you can actually log the value of foundUser.password inside the
findOne completion block and you'll see it in plain text.
console.log(foundUser.password)
-
So this does mean that if somebody was to hack into your website, then they probably will get access to your app.js
It's not that hard to access it.
And once they do, they'll find your secret.
And once they've found your secret
then they can use the same package to decrypt all of your users passwords.
So as long as we're able to recover the plain text version of our users passwords
we're still kind of leaving them out to dry.
So in the next lesson I want to cover something called environment variables
and we're going to learn that to enable us to store secrets
such as our encryption keys or things like API keys that are tied to credit cards,
anything that you want to keep secure essentially.
*/
