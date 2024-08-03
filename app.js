const dotenv = require('dotenv').config();
const path = require('node:path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const signupRouter = require('./router/signupRouter');
const pool = require('./db/pool');
const passport = require('./controller/passport');
const express = require('express');

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

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('index')
    } else {
        res.status(404).json({'error': 'Unauthorized error'});
    }
});

app.use('/sign-up', signupRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));