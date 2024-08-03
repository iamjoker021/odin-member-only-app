const dotenv = require('dotenv').config();
const path = require('node:path');
const express = require('express');
const signupRouter = require('./router/signupRouter');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Some Data'));

app.use('/sign-up', signupRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));