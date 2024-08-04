const pool = require('../db/pool');

const addMessage = async (userId, title, message) => {
    await pool.query('INSERT INTO message (title, text, user_id) VALUES ($2, $3, $1)', [userId, title, message]);
}

module.exports = { 
    addMessage
}