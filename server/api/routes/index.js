const {Router} = require('express');
const router = Router();
const v1Router = require('./v1');

router.use('/v1',v1Router);

module.exports = router;