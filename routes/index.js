const express = require('express'); //porque vamos a usar el router de express
const router = express.Router();

const { ensureAuth, ensureGuest } = require('../middleware/auth') //para protejer rutas autentificadas


// @desc Pagina inicial de login
// @route GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
});

// @desc Logout
// @route GET /logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

// @desc Pagina inicial
// @route GET /
router.get('/home', ensureAuth,  (req, res) => {
    res.render('home', {usuario: req.user.displayName} )
});

module.exports = router;
