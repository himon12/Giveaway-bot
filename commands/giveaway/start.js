const Giveaway = require('../../models/Giveaway');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'start',
    description: 'Start a giveaway.',
    execute: async (message, args) => {
        const [prize, winnerCount, duration] = args; // Example: `+start Prize 1 1d`
        const endsAt = new Date(Date.now() + parseDuration(duration)); // Function to parse duration

        const giveaway = new Giveaway({
            prize,
            winnerCount: parseInt(winnerCount),
            hostId: message.author.id,
            channelId: message.channel.id,
            endsAt
        });

        await giveaway.save();

        const embed = new MessageEmbed()
            .setTitle(`🎉 Giveaway! 🎉`)
            .setDescription(`Prize: ${prize}\nWinners: ${winnerCount}\nEnds at: ${endsAt.toUTCString()}`)
            .setColor('BLUE');

        await message.channel.send({ embeds: [embed] });
        message.reply('Giveaway started!');
    },
};

// Helper function to parse duration
function parseDuration(duration) {
    const time = duration.match(/(\d+)([smhd])/);
    if (!time) return 0;

    const value = parseInt(time[1]);
    const unit = time[2];
    const multiplier = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return value * multiplier[unit];
}
