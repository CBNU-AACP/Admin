const { Router } = require('express');
const router = Router();
const controller = require('./controller');

router.get('/',controller.showDatabases)
router.post('/:name',controller.createDatabase);
router.delete('/:name',controller.dropDatabase);

module.exports = router;