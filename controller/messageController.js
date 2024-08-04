const { addMessage } = require("../model/message");

const messageListPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
}

const createMessagePage = (req, res) => {
    res.render('create-message');
}

const createMessage = (req, res) => {
    const { title, message } = req.body;
    try {
        addMessage(req.user.id, title, message);
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