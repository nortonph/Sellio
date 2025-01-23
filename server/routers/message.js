'use strict';

const router = require('express').Router();

const messageController = require('../controllers/message');

router.get('/message', messageController.getMessage);

router.post('/message', messageController.postOneMessage);

module.exports = router;