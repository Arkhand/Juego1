const express = require('express'); //porque vamos a usar el router de express
const passport = require('passport');
const router = express.Router();

// @desc Google Login
// @route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: 'profile' }));

// @desc Google Login Callback
// @route GET /auth/google/callback
router.get('/google/callback', passport.authenticate( 'google', {failureRedirect: '/'}),
    (req,res) => {
        res.redirect('/home')
    }
);

module.exports = router;
