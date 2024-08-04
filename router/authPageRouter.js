const { Router } = require('express');
const { signupPage, signupUser, loginPage, joinClubPage, joinClub } = require('../controller/authController');
const { signupValidation, loginValidation, clubValidation, validate } = require('../controller/validator');
const passport = require('../controller/passport');

const signupRouter = Router();
signupRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        signupPage(req, res);
    }
});
signupRouter.post('/', signupValidation, validate, signupUser);

const loginRouter = Router();
loginRouter.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        loginPage(req, res);
    }
});
loginRouter.post('/', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));

const logoutRouter = Router();
logoutRouter.get('/', (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
    });
})

const joinClubRouter = Router();
joinClubRouter.get('/', joinClubPage);
joinClubRouter.post('/', clubValidation, validate, joinClub);

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    joinClubRouter
};