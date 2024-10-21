const mongoose = require('mongoose');

const premiumUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('PremiumUser', premiumUserSchema);
