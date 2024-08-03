const { Router } = require('express');
const { signupPage, signupUser, loginPage } = require('../controller/authController');
const { signupValidation, loginValidation, validate } = require('../controller/validator');
const passport = require('../controller/passport');

const signupRouter = Router();

signupRouter.get('/', signupPage);
signupRouter.post('/', signupValidation, validate, signupUser);

const loginRouter = Router();

loginRouter.get('/', loginPage);
loginRouter.post('/', loginValidation, validate, passport.authenticate('local', {successRedirect: '/', failureRedirect: '/'}));

module.exports = {
    signupRouter,
    loginRouter
};