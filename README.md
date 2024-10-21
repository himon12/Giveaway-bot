# giveaway-bot
A giveaway bot 
# Discord Giveaway Bot

An advanced Discord bot for managing giveaways with premium features.

## Features

- Create and manage giveaways
- Premium features for enhanced functionality
- Voting reminders
- Announcements for premium users
- Admin commands (kick, ban, timeout)
- Embed support for messages
- MongoDB for data storage

## Installation

1. Clone the repository:
https://github.com/yourusername/discord-giveaway-bot.git


2. Navigate to the project directory:
cd discord-giveaway-bot

3. Install dependencies:
npm install

4. Create a `.env` file in the root directory and add your Discord bot token and MongoDB URI:
DISCORD_TOKEN=your_discord_bot_token MONGODB_URI=your_mongodb_connection_string
npm start


## Commands

- `+start <prize> <winnerCount> <duration>`: Start a giveaway.
- `+end`: End the current giveaway and select a winner.
- `+reroll`: Reroll the winners for the current giveaway.
- `+kick @user`: Kick a user from the server.
- `+ban @user`: Ban a user from the server.
- `+timeout @user <duration>`: Timeout a user for a specified duration.
- `+give-premium @user`: Give premium status to a user.
- `+check-premium`: Check if you have premium access.
- `+vote`: Vote for the bot.
- `+announce #channel <message>`: Announce a message in the specified channel.
- `+purge <number>`: Purge a number of messages from the channel.

## Support

For support, please join our [support server](https://example.com/support).

## License

This project is licensed under the MIT License.
