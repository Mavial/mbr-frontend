const { response } = require("../app")

function authCheck (req, res, next) {
    if (!req.user) {
        res.redirect('/auth/google');
    } else if (req.user.admin == false) {
        res.send('You have no access rights to this page. Please contact an administrator if you think this is a mistake.');
    } else {
        next();
    }
}

module.exports = authCheck;