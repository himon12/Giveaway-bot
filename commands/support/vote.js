module.exports = {
    name: 'vote',
    description: 'Vote for the bot.',
    execute: async (message) => {
        const voteLink = 'https://example.com/vote'; // Replace with actual vote link
        message.reply(`You have voted for the bot! You can also vote [here](${voteLink}).`);

        // Here you can implement logic to automatically vote on the website if applicable
    },
};
