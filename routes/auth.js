const express = require('express');
const router = express.Router();

// LOAD CONIFG
const CONFIG = require('../config');
// OAUTH RELATED
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;


/* GET auth page. */
router.get('/', function (req, res, next) {
    // Create OAuth2 Client
   const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

    // Obtain google link to redirect user to to login.
    const loginLink = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: CONFIG.oauth2Credentials.scopes
    });

    res.render('auth', {
        loginLink: loginLink,
    })
});

module.exports = router;