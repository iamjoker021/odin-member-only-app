const { Router } = require('express');
const { signupPage } = require('../controller/signupController');
const { signupValidation, validate } = require('../controller/validator');

const signupRouter = Router();

signupRouter.get('/', signupPage);
signupRouter.post('/', signupValidation, validate, (req, res) => res.send('Create Post actions'));

module.exports = signupRouter;