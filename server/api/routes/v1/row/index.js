const { Router } = require('express');
const router = Router();
const controller = require('./controller.js');

router.get('/:tableName',controller.showRows);
router.post('/',controller.createRows);
router.post('/update', controller.updateRows);
router.post('/delete', controller.deleteRow);
router.post('/getPKs', controller.getPKs);

module.exports = router;