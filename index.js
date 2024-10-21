const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Ensure your bot has the following permissions when invited:
// "ADMINISTRATOR" permission
client.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('+') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        // Check if the bot has the required permissions before executing the command
        const requiredPermissions = command.permissions || []; // Example: ['KICK_MEMBERS', 'BAN_MEMBERS']
        const botMember = message.guild.members.cache.get(client.user.id);

        if (requiredPermissions.length && !botMember.permissions.has(requiredPermissions)) {
            return message.reply('I do not have the necessary permissions to perform this action.');
        }

        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error(err));

setInterval(async () => {
    try {
        const expiredCodes = await PremiumCode.find({ createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
        if (expiredCodes.length > 0) {
            console.log(`Found ${expiredCodes.length} expired codes, removing them...`);
            await PremiumCode.deleteMany({ createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
        }
    } catch (error) {
        console.error('Error cleaning up expired codes:', error);
    }
}, 24 * 60 * 60 * 1000); // Check every 24 hours



client.login(process.env.DISCORD_TOKEN);
