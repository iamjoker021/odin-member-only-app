const { Router } = require('express');
const { signupPage, signupUser, loginPage, joinClubPage, joinClub, logoutUser } = require('../controller/authController');
const { signupValidation, loginValidation, clubValidation, validate } = require('../controller/validator');
const passport = require('../controller/passport');

const signupRouter = Router();
signupRouter.get('/', signupPage);
signupRouter.post('/', signupValidation, validate, signupUser);

const loginRouter = Router();
loginRouter.get('/', loginPage);
loginRouter.post('/', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));

const logoutRouter = Router();
logoutRouter.get('/', logoutUser);

const joinClubRouter = Router();
joinClubRouter.get('/', joinClubPage);
joinClubRouter.post('/', clubValidation, validate, joinClub);

module.exports = {
    signupRouter,
    loginRouter,
    logoutRouter,
    joinClubRouter
};