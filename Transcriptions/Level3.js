/*
So now it's time to level up to the next level of security.
And in this lesson we're going to cover something called hashing.
Now previously we've already looked at encryption,
so taking the user's password and securing it using an encryption key
and then using a particular cipher method be it a Caesar cipher or the Enigma cipher
or a modern cipher method like AES which is what we enabled on our database.
-
No matter which way we chose we always had a password, a key and we ended up with some ciphertext
which will make it hard for people to be able to immediately guessed what our users password is.
-
So for example if we took a password like qwerty and we use the Caesar Cipher method and we decided
to shift it by one, then our encryption key is the number one.
And that creates the ciphertext where every single letter is shifted up by one.
Now in order to decrypt this all you have to do as long as you know what the key is then you can simply
shift all of the ciphertext down by one and you end up with the original password.
-
Now the Caesar cipher is a very very weak encryption method.
It's incredibly easy to figure out what the original text was even if you didn't have a key.
//III.1----------------HISTORY--------------
And just to illustrate what bad things can happen when you have a weak encryption system
I'm going to tell you a story from history that tells us why we should not be using a weak encryption system.
So back in the 1500s on this island that we now call the United Kingdom, there used to be two large areas.
One was Scotland, and the other was England. and they were ruled over by two queens.
Scotland was ruled by Mary Queen of Scots who was a Catholic and England was ruled over by Queen Elizabeth the first.
Now these two ladies between them controlled the land that we now called the UK.
But they each wanted to have more power and more land.
So what did they do?
Well Mary Queen of Scots who ruled over Scotland decided to plot with her friend Lord Babington
to try and assassinate Queen Elizabeth.
That way she would be the legitimate heir to both the English and Scottish throne
and it was kind of a "Game of Thrones" kind of situation going on back then.
But in order to mobilize their forces or try to come up with some sort of secret plan they decided to
send letters to each other using ciphertext.
So they came up with a system to encrypt their letters to each other such that if it fell into the wrong
hands the subject of the letter wouldn't be revealed and they wouldn't end up being tried for treason.
But the problem was that the encryption method that they used which was a letter substitution method
similar to the Caesar cipher was a very weak form of encryption.
And Queen Elizabeth had a chief decoder who ended up deciphering their letters
and figuring out what their encryption key was.
So he decided to take this encryption key and write a letter back to Lord Babington to try
and get him to reveal all of the co-conspirators.
And what was the end result of having their weak encryption system?
Well Queen Elizabeth decided to accuse Mary Queen of Scots of treason and hence she ended up having her head chopped off.
So this is not what you want to happen to you or your website.
-
So weak encryption systems can end up putting user passwords at risk
and your company might end up metaphorically decapitated such as in the case of companies like
TalkTalk or Equifax where they ended up getting hacked and lost a lot of the trust of their users.
-
Now if you're interested in more stories like this and to learn more about cryptography and encryption
there's a really great book recommendation I would make called "THE CODE BOOK" by Simon Singh.
It contains stories like the one I just told you and more.
So if you're interested in this go ahead and read more about it.

III.2.1---------------------------------------------
Now how can we make our password more secure?
Now at the moment the biggest flaw in our authentication method is the fact that
we need an encryption key to encrypt our passwords and decrypt our passwords.
And chances are that if somebody is motivated enough to spend time and hack into your database
then it's probably not that difficult for them to also be able to get your encryption key
even if you've saved it in environment variable or somewhere secure on your server.
-
So how can we address this weakest link the need for that encryption key?
Well here is where hashing comes into play.
Whereas previously with encryption we needed that encryption key,
//hashing takes it away and no longer requires the need for an encryption key.
--
Well then you might ask,
"Well if we don't have an encryption key how can we decrypt our password back into plain text?"
Well the secret is you don't.
Let's say a user registers on our website and they enter a password to register with,
we use something called a Hash function to turn that password into a hash
and we store that hash in our database.
Now the problem is that Hash functions are mathematical equations
that are designed to make it almost impossible to go backwards.
It's almost impossible to turn a hash back into a password.
"How is this possible?" you might ask.
//How is it possible that you can turn a password into a hash very quickly and easily
//but make it almost impossible to turn that hash back into a password?
//---------------------Example----------------------------------
Well here's a question.
Let me ask you, what are the factors of 377 other than 1 and 377?
So basically I'm saying 377 is not a prime number.
Not only can you divide 377 by 1 and 377, but there's also two other numbers that you can divide it by.
Now it's your job to figure out what those numbers are.
So what might you do?
Well you might divide it by 2. OK. So that becomes 188.5. That's not a whole number so 2 is not a factor.
What if you divided by 3? Well that becomes 113.33... recurring which is also not a whole number. So 3 is not a factor either.
And you might go through this process for a long time tediously going through number by number.
Well then you might arrive at the point where you divide 377 by 13 and you end up with 29.
So 13 and 29 are the answers to this question. They are the only factors of 377 other than 1 and 377.
And as you can see, that process of getting to this point of finding those two factors took us a while right?
It wasn't that easy.
But consider if I asked you a different question.
If I said to you can you multiply 13 by 29?
Well you would be able to do that really quickly and easily.
It would take you almost no time at all to figure out that the answer is 377.
So here is a very very simplified version of a Hash function.
//So going forward multiplying 13 by 29 is really quick and easy
//but going backwards trying to get back those numbers 13 and 29 starting from 377 is very very time consuming.
-----------------Hash-----------------
So this is essentially how a Hash function works,
just add a little bit more complexity and you end up with a real hash function.
So they're designed to be calculated very quickly going forwards but almost impossible to go backwards.
And by almost impossible I simply mean that using current levels of computing power it would take far
too long to make it worthwhile for the hacker.
-
So let's say that to calculate the hash going forward it takes a millisecond
but to go backwards it takes two years, then that hacker probably has better things to do with his time.
-
So when a user tries to register on our website then we ask them for the registration password which
we turn into a hash using our Hash function and then we store that hash on our database.
III.2.2
Now at a later point when the user tries to log in and they type in their password,
then we again hash that password that they typed in to produce a hash
and then
we compare it against the hash that we have stored in our database.
And if those two hashes match then that must mean that
the login password is the same as the registration password as well.
-
And at no point in this process do we have to store their password in plaintext
or are we able to reverse the process to figure out their original password.
-
The only person who knows their password is the user themselves.
III.2.3-------------------------Enigma machine -----------
Now previously we saw that by using the Enigma machine as long as we knew what the settings were for the Enigma machine
which is basically the encryption key right?
As long as we knew what that was then I can decode it by setting it to the same encryption key.
And we end up being able to retrieve the original text.
Now however,
-------------------------Hash function -----------
if I was to go and change this to a Hash function instead,
then you can see that when we try to decode this using the same hash function MD5,
we get the error that "Decoding step is not defined for Hash function" because you can't really go back.
That's the whole point of the Hash function and this is what will make our authentication more secure.

III.3---------
So let's go ahead and implement this in our code.
So first things first let's go ahead and install MD5 the package.
npm i md5
And then all we need to do is just you require it and then use it to Hash a particular message or in our case the password.
So let's go over here and let's remove Mongoose encryption and remove this plugin from our user schema
and instead we're going to require "md5".
var md5 = require('md5');
And when the user registers instead of saving their password which is what we got from the req.body,
we're going to use our Hash function, MD5, to turn that into a irreversible hash.
-
III.4
So let's give that a go.
So firstly we're going to run our app.js
and we're going to open up our website and register a new user who will call user@hash.com and we will give them a password of 123456.
Go ahead and hit register. OK. Success.
So that means our users been saved successfully into our database
and we can see that the email is still left as is so that we can search through it
but the password is now a hash that's been created by passing a password, 123456, through that Hash function Md5.
And this will be impossible to reverse.
We can't decrypt it and we don't have any sort of encryption key that leaves it vulnerable.
So now we need to figure out what to do with the log in step.
III.5
Now the important thing that you need to remember with hashing is that
when you run the Hash function n the same string, the hash that's created is always going to be the same.
So for example if I decide as a console log MD5 and I pass through the string 123456,
console.log(md5("123456"));
Then when I hit save and nodemon reruns this app.js, you can see this is the hash that's generated
and this matches exactly with the hash that was generated here previously when I tried to register the
user and hashed the password that they typed in. So this is how we're able to later then compare.
-
So when the user tries to log in, we'll hash the password that they tried to type in using the same Hash function MD5,
and then we'll compare the outcome of this   with   the hash that's stored in our database.
And if they match then that must mean that the initial password that they typed in
must have been equal to the initial password that they registered with
because after hashing they matched exactly.
So now we're going to compare the hash that's inside our database with the hashed version of their password
and see if it matches to be able to log them in.
III.6
So let hit save and let's go and go back to our home page.
Try and log in our user, user@hash.com and the password was 123456.
Let's go ahead and login. So we've managed to successfully log in because those hashes match.
And this is very simply how hashing works.
-
So now when a user decides to hack into our database,
all they have all these hashes in the place of our passwords
and because of the way that hashing algorithms work
you can't reverse this back into the plain text of the original password.
-
So that's all very well and good and theoretically our passwords are a lot more secure
than when we simply encrypted it because we had the vulnerability of that encryption key.
As soon as somebody discovers the key then all of our encryption was for naught.
-
Now hashing also comes along with its own problems though
because as soon as you come up with a problem then some motivated hacker will come up with a solution.
And in the next lesson I'm going to show you how we can hack our users passwords.
*/
