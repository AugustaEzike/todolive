const express = require('express')
const passport = require ('passport')
const config = require('../config/config')
const router = express.Router()

router.get('/login',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
        {
            response: res,
            resourceURL: config.resourceURL,
            customeState: 'my_state',
            failureRedirect: '/'
        }
        )(req, res, next);
    },
    function(req, res) {
        console.log('Login was called in the sample');
        res.redirect('/todos');
});

router.get('/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
        {
            response: res,
            failureRedirect: '/'
        }
        )(req, res, next);
    },
    function(req, res) {
        console.log('we have received a response from AzureAD.');
        res.redirect('/todos');
});

router.post('/openid/return',
    function(req, res, next) {
        passport.authenticate('azuread-openidconnect',
        {
            response: res,
            failureRedirect: '/'
        }
        )(req, res, next);
    },
    function(req, res) {
        console.log('we have received a response from AzureAD.');
        res.redirect('/todos');
});

router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        req.logOut();
        res.redirect(config.destroySessionUrl);
    });
});

module.exports = router