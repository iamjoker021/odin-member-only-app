const dotenv = require('dotenv').config();
const bycrypt = require('bcryptjs');
const { addUser } = require('../model/user');

const signupPage = (req, res) => {
    res.render('sign-up');
}

const signupUser = (req, res) => {
    const { name, username, password } = req.body;

    const SALT = parseInt(process.env.SALT);
    bycrypt.hash(password, SALT, (err, hashedPassword) => {
        if (err) {
            res.status(404).json({'error': 'Unable to add User', 'msg': err});
        }
        else {
            addUser(name, username, hashedPassword);
            res.redirect('/');
        }
    })
}

const loginPage = (req, res) => {
    res.render('login');
}

module.exports = {
    signupPage,
    signupUser,
    loginPage
}