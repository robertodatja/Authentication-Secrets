//jshint esversion:6

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  googleId: {
    type: String,
    unique: true
  },
  facebookId: {
    type: String,
    unique: true
  },
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

///Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/secrets"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

// TODO
app.get("/", function (req, res) {
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/secrets");
  }
);

/// Facebook Authentication
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/secrets", passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/secrets");
  });


app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  User.find({ "secret": { $ne: null } }, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("secrets", { usersWithSecrets: foundUsers });
      } else {
        console.log(err);
      }
    }
  });
});

app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function (req, res) {
  console.log(req.user.id);
  User.findById(req.user.id, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = req.body.secret;
        foundUser.save(function () {
          res.redirect("/secrets");
        });
      }
    }
  });
});

app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.post("/register", function (req, res) {
  User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});


Also, I've attached the following codes for your reference.



//// register/ejs

<%- include('partials/header') %>
  <div class="container mt-5">
    <h1>Register</h1>

    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">

            <!-- Makes POST request to /register route -->
            <form action="/register" method="POST">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password">
              </div>
              <button type="submit" class="btn btn-dark">Register</button>
            </form>

          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card social-block">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
              <i class="fab fa-google"></i>
              Sign Up with Google
            </a>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
              <i class="fab fa-facebook"></i>
              Sign In with Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <%- include('partials/header') %>





//// Login.ejs

<%- include('partials/header') %>

  <div class="container mt-5">
    <h1>Login</h1>

    <div class="row">
      <div class="col-sm-8">
        <div class="card">
          <div class="card-body">

            <!-- Makes POST request to /login route -->
            <form action="/login" method="POST">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" name="username">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" name="password">
              </div>
              <button type="submit" class="btn btn-dark">Login</button>
            </form>

          </div>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-google" href="/auth/google" role="button">
              <i class="fab fa-google"></i>
              Sign In with Google
            </a>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <a class="btn btn-block btn-social btn-facebook" href="/auth/facebook" role="button">
              <i class="fab fa-facebook"></i>
              Sign In with Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <%- include('partials/footer') %>





//// Secrets.ejs

<%- include('partials/header') %>

  <div class="jumbotron text-center">
    <div class="container">
      <i class="fas fa-key fa-6x"></i>
      <h1 class="display-3">You've Discovered My Secret!</h1>

      <% usersWithSecrets.forEach(function(user) { %>
        <p class="secret-text">
          <%=user.secret%>
        </p>
        <% }); %>

          <hr>

          <a class="btn btn-light btn-lg" href="/logout" role="button">Log Out</a>
          <a class="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</a>
    </div>
  </div>

  <%- include('partials/footer') %>
