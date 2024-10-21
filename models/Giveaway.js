const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema({
    prize: {
        type: String,
        required: true
    },
    winnerCount: {
        type: Number,
        required: true
    },
    hostId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    winners: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('Giveaway', giveawaySchema);
