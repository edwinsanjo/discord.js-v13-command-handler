const config = require(`./config.js`);
const { Client, Intents, Collection } = require('discord.js');
const mongoose = require("mongoose");
const colors = require("colors")


// Creating the new client instance
const client = new Client({ 
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    // Intents.FLAGS.GUILD_BANS,
    // Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    // Intents.FLAGS.GUILD_INTEGRATIONS,
    // Intents.FLAGS.GUILD_WEBHOOKS,
    // Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    // Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});

mongoose.connect(config.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.config = config;

client.commands = new Collection();
client.cooldowns = new Collection();
client.slsCommands = new Collection();
client.categories = require("fs").readdirSync(`./commands`);
["eventHandler", "commandHandler", "slsCmdHandler"]
    .filter(Boolean)
    .forEach(h => {
      require(`./handlers/${h}`)(client);
});


// LOGIN WITH THE TOKEN
client.login(config.token);