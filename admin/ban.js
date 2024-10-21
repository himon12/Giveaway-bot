module.exports = {
    name: 'ban',
    description: 'Ban a user from the server.',
    permissions: ['BAN_MEMBERS'], // Required permission for this command
    execute: async (message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a valid member of this server.');

        try {
            await member.ban();
            message.reply(`${member.displayName} was banned from the server.`);
        } catch (error) {
            message.reply('I cannot ban this member.');
        }
    },
};
