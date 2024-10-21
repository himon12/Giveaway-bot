module.exports = {
    name: 'purge',
    description: 'Purge a number of messages from the channel.',
    execute: async (message, args) => {
        const amount = parseInt(args[0]) || 10; // Default to 10 messages
        if (isNaN(amount) || amount < 1 || amount > 100) return message.reply('You need to input a number between 1 and 100.');

        await message.channel.bulkDelete(amount, true);
        message.reply(`Purged ${amount} messages!`).then(msg => {
            setTimeout(() => msg.delete(), 5000);
        });
    },
};
