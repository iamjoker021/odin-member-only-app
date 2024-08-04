const pool = require('../db/pool');

const addUser = async (name, username, password) => {
    await pool.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [name, username, password])
}

const getUserDetails = async (username) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (rows.length === 1) {
        return rows[0];
    }
    else {
        return false;
    }
}

const updateMemeberShipToClub = async (userId) => {
    await pool.query('UPDATE users SET membership_status = $2 WHERE id = $1', [userId, 'club']);
}

module.exports = {
    addUser,
    getUserDetails,
    updateMemeberShipToClub
}