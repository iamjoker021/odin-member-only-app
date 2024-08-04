const pool = require('../db/pool');

const getAllMessages = async () => {
    const { rows } = await pool.query('SELECT m.*, u.name as author FROM message m JOIN users u ON u.id=m.user_id');
    return rows;
}

const addMessage = async (userId, title, message) => {
    await pool.query('INSERT INTO message (title, text, user_id) VALUES ($2, $3, $1)', [userId, title, message]);
}

const removeMessage = async (messageId) => {
    await pool.query('DELETE FROM message WHERE ID = $1', [messageId]);
}

module.exports = { 
    getAllMessages,
    addMessage,
    removeMessage
}