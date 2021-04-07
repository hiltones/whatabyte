// auth.js

/**
 * Required External Modules
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const querystring = require("querystring");
require("dotenv").config();

/**
 * Routes Definitions
 */
router.get("/login",
    passport.authenticate("auth0", {
        scope: "openid email profile"
    }),
    (req, res) => {
        res.redirect("/");
    }
);

/**
 * Module Exports
 */