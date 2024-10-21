const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Get the link to the support server.',
    permissions: [],
    execute: async (message) => {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Support Server')
            .setDescription('If you need help or have any questions, feel free to join our support server!')
            .addFields(
                { name: 'Join Us:', value: '[Support Server Link](YOUR_SUPPORT_SERVER_LINK_HERE)' }
            )
            .setFooter({ text: 'We are here to help!' });

        await message.reply({ embeds: [embed] });
    },
};
