const Giveaway = require('../../models/Giveaway');

module.exports = {
    name: 'end',
    description: 'End a giveaway.',
    execute: async (message) => {
        const giveaways = await Giveaway.find({ channelId: message.channel.id });
        if (giveaways.length === 0) return message.reply('No active giveaways in this channel.');

        const giveaway = giveaways[0]; // Get the latest giveaway for simplicity
        const winners = pickWinners(giveaway.winnerCount, message.guild.members.cache);

        giveaway.winners = winners;
        await giveaway.save();

        message.channel.send(`Giveaway ended! Winners: ${winners.join(', ')}`);
    },
};

// Function to pick winners randomly
function pickWinners(count, members) {
    const eligibleMembers = members.filter(member => !member.user.bot);
    const winners = [];
    
    while (winners.length < count && eligibleMembers.size) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.size);
        const winner = eligibleMembers.random();
        winners.push(winner.user.username);
        eligibleMembers.delete(winner.id); // Remove winner from eligibility for further picks
    }
    
    return winners;
}
