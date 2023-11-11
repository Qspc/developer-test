const router = require('express').Router();
const { LoginController } = require('../controller/loginController');

router.post('/login', LoginController);

module.exports = router;
