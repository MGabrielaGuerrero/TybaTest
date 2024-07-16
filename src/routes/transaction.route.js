const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { getTransactions } = require('../controllers/transaction.controller');
const router = express.Router();

router.get('/', authMiddleware,  getTransactions);

module.exports = router;
