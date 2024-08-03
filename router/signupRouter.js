const { Router } = require('express');
const { signupPage } = require('../controller/signupController');

const signupRouter = Router();

signupRouter.get('/', signupPage);
signupRouter.post('/', (req, res) => res.send('Create Post actions'));

module.exports = signupRouter;