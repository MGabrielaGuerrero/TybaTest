const mongoose = require('mongoose');

const transactionModel = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ['RESTAURANT_SEARCH', "SIGNIN", "SIGNOUT", "SINGUPD"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionModel);
