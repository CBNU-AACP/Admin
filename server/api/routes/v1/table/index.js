const { Router } = require('express');
const router = Router();
const controller = require('./controller.js');

router.get('/',controller.showTables);
router.get('/single/:name', controller.descTable);
router.delete('/:name',controller.dropTable);
router.post('/',controller.createTable);

module.exports = router;