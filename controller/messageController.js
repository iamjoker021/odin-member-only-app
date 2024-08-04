const { addMessage, getAllMessages } = require("../model/message");

const messageListPage = async (req, res) => {
    if (req.isAuthenticated()) {
        const msg = await getAllMessages();
        res.render('index', {messages: msg, membership: req.user.membership_status});
    } else {
        res.redirect('/login');
    }
}

const createMessagePage = (req, res) => {
    res.render('create-message');
}

const createMessage = async (req, res) => {
    const { title, message } = req.body;
    try {
        await addMessage(req.user.id, title, message);
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({'error': 'Unable to Create message', 'msg': err});
    }
}

module.exports = {
    messageListPage,
    createMessagePage,
    createMessage
}