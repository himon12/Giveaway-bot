module.exports = {
    name: 'announce',
    description: 'Announce a message in a specified channel.',
    execute: async (message, args) => {
        if (!message.member.roles.cache.some(role => role.name === 'Premium')) {
            return message.reply('This command is for premium users only.');
        }

        const targetChannel = message.mentions.channels.first();
        if (!targetChannel) return message.reply('Please mention a valid channel.');

        const announcement = args.slice(1).join(' ');
        if (!announcement) return message.reply('Please provide an announcement message.');

        await targetChannel.send(announcement);
        message.reply(`Announcement sent to ${targetChannel}!`);
    },
};
