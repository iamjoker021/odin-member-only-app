const dotenv = require('dotenv').config();
const bycrypt = require('bcryptjs');
const { addUser, updateMemeberShipToClub } = require('../model/user');

const signupPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('sign-up');
    }
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
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login');
    }
}

const logoutUser = (req, res, next) => {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/login');
    });
}

const joinClubPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('join-club');
    }
    else {
        res.redirect('/login');
    }
}

const joinClub = async (req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
    try {
        const { password } = req.body;
        if (password === process.env.SECRET_PASSCODE) {
            await updateMemeberShipToClub(req.user.id);
            res.redirect('/');
        }
        else {
            res.status(401).json({'error': 'Unable to join club', 'msg': 'Invalid Passcode'})
        }
    }
    catch (err) {
        res.status(500).json({'error': 'Unable to update Membership', 'msg': err});
    }
}

module.exports = {
    signupPage,
    signupUser,
    loginPage,
    logoutUser,
    joinClubPage,
    joinClub
}