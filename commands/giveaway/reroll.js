const Giveaway = require('../../models/Giveaway');

module.exports = {
    name: 'reroll',
    description: 'Reroll the winner of the last giveaway.',
    execute: async (message) => {
        const giveaways = await Giveaway.find({ channelId: message.channel.id });
        if (giveaways.length === 0) return message.reply('No active giveaways in this channel.');

        const giveaway = giveaways[0]; // Get the latest giveaway
        const winners = pickWinners(giveaway.winnerCount, message.guild.members.cache);
        giveaway.winners = winners;
        await giveaway.save();

        message.channel.send(`Rerolled winners: ${winners.join(', ')}`);
    },
};
