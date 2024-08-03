const dotenv = require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Some Data'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));