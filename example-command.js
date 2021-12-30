// normal command
// should be inside the commands/category folder

// COMMAND EXAMPLE
module.exports = {
    name: "ping", // the command name on discord and help [REQUIRED] (if not added, the command may not work)
    description: "Replies with pong", // the command description used on help [REQUIRED] (if not added, the command may not work)
    category: "Information", // the command category mainly used on help [REQUIRED] (if not added, the command may not work)
    aliases: ["pong"], // the command aliases [OPTIONAL]
    cooldown: 5, // the command cooldown in seconds [OPTIONAL]
    syntax: "ping", // usage/syntax example `command.name <command.prefix>` [REQUIRED] (if not added, the command may not work)
    permissions: ["ADMINISTRATOR"], // the permissons required to use this command [OPTIONAL]
    owner: true, // make the command owner only [OPTIONAL]
      run: async (client, message, args) => {
        message.channel.send("Pong!")
      }
}

// SLASHCOMMAND EXAMPLE
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction) {
        interaction.reply("Pong!")
    }
};
