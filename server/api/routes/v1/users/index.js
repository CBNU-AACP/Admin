const { Router } = require('express');
const router = Router();
const controller = require('./controller');
const { checkTokens } = require('../../../../middlewares/auth');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/logout/:trainerPhoneNumber', controller.logout);
router.patch('/resetPassword', controller.resetPassword);
router.get('/', checkTokens, controller.test);

module.exports = router;