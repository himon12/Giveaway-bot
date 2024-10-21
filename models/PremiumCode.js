const mongoose = require('mongoose');

const premiumCodeSchema = new mongoose.Schema({
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '30d' }, // Automatically remove after 30 days
    ownerId: { type: String, required: true }, // Store the owner's user ID
});

module.exports = mongoose.model('PremiumCode', premiumCodeSchema);
