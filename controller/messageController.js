const { addMessage, getAllMessages, removeMessage } = require("../model/message");

const messageListPage = async (req, res) => {
    let membership = false;
    const msg = await getAllMessages();
    res.render('index', {messages: msg});
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

const deleteMessage = async (req, res) => {
    if (req.user.membership_status !== 'admin') {
        res.status(404).json({'error': 'Unauthorized Error', 'msg': 'You are not authorized to perform delete'});
    }
    const messageId = req.params.id;
    try {
        await removeMessage(messageId);
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({'error': 'Unable to Create message', 'msg': err});
    }
}

module.exports = {
    messageListPage,
    createMessagePage,
    createMessage,
    deleteMessage
}