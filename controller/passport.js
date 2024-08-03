const passport = require('passport');
const { getUserDetails } = require('../model/user');
const LocalStrategy = require('passport-local').Strategy;
const bycrypt = require('bcryptjs');

passport.use(new LocalStrategy(async (username, password, done) => {
    getUserDetails(username)
    .then(userDetails => {
        if (!userDetails) {
            return done(null, false, "Username doesn't exists");
        }
        bycrypt.compare(password, userDetails.password)
        .then(match => {
            if(match) {
                done(null, userDetails);
            }
            else {
                done(null, false, "Password does not match")
            }
        })
        .catch((err) => done(err))
    })
    .catch(err => done(err));
  }));

module.exports = passport;