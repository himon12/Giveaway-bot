const PremiumUser = require('../../models/PremiumUser');

module.exports = {
    name: 'check-premium',
    description: 'Check if you have premium access.',
    execute: async (message) => {
        const premiumData = await PremiumUser.findOne({ userId: message.author.id });
        if (premiumData) {
            message.reply(`You have premium access until ${premiumData.expiresAt}`);
        } else {
            message.reply('You do not have premium access.');
        }
    },
};
