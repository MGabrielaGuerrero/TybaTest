const express = require('express');
const router = express.Router();
const userNonRepeat = require('../middlewares/usernonrepeat.middleware');
const { userAdd, singIn, signOut } = require('../controllers/user.controller');
const singUpValidateSchema = require('../middlewares/singUpValidateSchema.middleware');
const singInValidateSchema = require('../middlewares/signInValidateSchema.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/singUp', singUpValidateSchema, userNonRepeat,  userAdd)

router.post('/signIn', singInValidateSchema, singIn)

router.post('/signOut', authMiddleware,  signOut)

module.exports = router;
