const { Router } = require('express');
const { messageListPage, createMessagePage, createMessage, deleteMessage } = require('../controller/messageController');
const { createMessageValidation, validate } = require('../controller/validator');

const messageRouter = Router();
messageRouter.get('/', messageListPage);
messageRouter.get('/create-message', createMessagePage);
messageRouter.post('/create-message', createMessageValidation, validate, createMessage);
messageRouter.get('/delete-message/:id', deleteMessage);

module.exports = messageRouter