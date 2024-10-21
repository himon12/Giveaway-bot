module.exports = {
    name: 'timeout',
    description: 'Timeout a user in the server.',
    execute: async (message, args) => {
        const member = message.mentions.members.first();
        const duration = parseInt(args[1]) || 60; // Default to 60 seconds

        if (!member) return message.reply('Please mention a valid member of this server.');

        try {
            await member.timeout(duration * 1000);
            message.reply(`${member.displayName} has been timed out for ${duration} seconds.`);
        } catch (error) {
            message.reply('I cannot timeout this member.');
        }
    },
};
