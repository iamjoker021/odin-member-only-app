const { Router } = require('express');
const { signupPage, signupUser } = require('../controller/signupController');
const { signupValidation, validate } = require('../controller/validator');

const signupRouter = Router();

signupRouter.get('/', signupPage);
signupRouter.post('/', signupValidation, validate, signupUser);

module.exports = signupRouter;