const express = require('express');
const router = express.Router();

// LOAD CONIFG
const CONFIG = require('../config');
// OAUTH RELATED
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;


/* GET auth-callback page. */
router.get('/', function (req, res, next) {
    // Create OAuth2 Client
    const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

    if (req.query.error) {
        // User didn't give permission
        res.redirect('/');
    } else {
        oauth2Client.getToken(req.query.code, function (err, token) {
            if (err) {
                // mabye pop a message???
                res.redirect('/');
            }

            res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
            res.redirect('/admin');
        })
    }
});

module.exports = router;