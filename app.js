const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
console.log("ATLASDB_URL exists:", !!process.env.ATLASDB_URL);
console.log("SECRET exists:", !!process.env.SECRET);
const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const ejs = require("ejs");
const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").MongoStore;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter:24 * 3600,
})

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
})

const sessionOption = {
  store,
  secret: "supersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 *24 * 60 * 60 * 1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  }
}

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine( "ejs", ejsMate);

let staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

main()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
   
    await mongoose.connect(dbUrl);
}

  app.get("/", (req, res) => {
    res.redirect("/listings");
  });

  app.use(session(sessionOption));
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
  })

  app.get("/demouser", async(req, res) => {
     let fakeUser = new User({
      email: "abc@gmail.com",
      username: "delta-student",
     });
     let registeredUser = await User.register(fakeUser, "helloworld");
     res.send(registeredUser)
  });

  app.use("/listings", listings);
  app.use("/listings/:id/reviews", reviews);
  app.use("/", userRouter);

   app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
   });

app.use((err, req, res, next) => {
  console.error(err);
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err, message });
});

app.listen(port, (req, res) => {
  console.log(`app is running on port: ${port}`);
})