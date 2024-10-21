module.exports = {
    name: 'kick',
    description: 'Kick a user from the server.',
    permissions: ['KICK_MEMBERS'], // Required permission for this command
    execute: async (message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a valid member of this server.');

        try {
            await member.kick();
            message.reply(`${member.displayName} was kicked from the server.`);
        } catch (error) {
            message.reply('I cannot kick this member.');
        }
    },
};
