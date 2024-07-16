const mongoose = require('mongoose');

const transactionModel = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['RESTAURANT_SEARCH', "SIGNIN", "SIGNOUT", "SIGNUP"],
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionModel);
