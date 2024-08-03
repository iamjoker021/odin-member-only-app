const pool = require('../db/pool');

const addUser = async (name, username, password) => {
    await pool.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [name, username, password])
}

module.exports = {
    addUser
}