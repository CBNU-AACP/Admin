const { Router } = require('express');
const router = Router();
const controller = require('./controller.js');

router.post('/',controller.createTable);

module.exports = router;