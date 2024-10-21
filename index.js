l require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Command collection
client.commands = new Collection();

// Load commands dynamically
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// When the client is ready, run this code
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // Set rich presence
    client.user.setActivity('giveaways', { type: 'WATCHING' });
});

// Command handling
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('+') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

// Auto-cleanup expired premium codes every 24 hours
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

// Login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);

