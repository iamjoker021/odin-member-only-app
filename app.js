const dotenv = require('dotenv').config();
const path = require('node:path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { signupRouter, loginRouter, logoutRouter, joinClubRouter } = require('./router/authPageRouter');
const pool = require('./db/pool');
const passport = require('./controller/passport');
const express = require('express');
const messageRouter = require('./router/messageRouter');

const app = express();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000
    },
    store: new pgSession({
        pool: pool,
        tableName: 'user_session',
        createTableIfMissing: true
    }),
}));

app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use((req, res, next) => {
    if (req.user) {
        res.locals.currentUser = req.user; 
        membership = req.user.membership_status;
    }
    next();
});

app.use('/', messageRouter);
app.use('/join-club', joinClubRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));