// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const expressSession = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();
const authRouter = require("./auth");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 8000;

/**
 * Session Configuration (New!)
 */
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};
if (app.get("env") === "production") {
    session.cookie.secure = true;
}

/**
 * Passport Configuration (New!)
 */
const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL: process.env.AUTH0_CALLBACK_URL
    }, 
    function(acessToken, refreshToken, extraParams, profile, done) {
        return done(null, profile);
    }
);

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use("/", authRouter);

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    //res.status(200).send("WHATABYTE: Food For Devs");
    res.render("index", {title: "Home"});
});

app.get("/user", (req, res) => {
    res.render("user", {
        title: "Users", 
        userProfile: {
            nickname: "Butt Fucker"
        }
    });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listen this mother fucker @http://localhost:${port}`);
});