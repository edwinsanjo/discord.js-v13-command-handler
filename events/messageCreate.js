const fs = require("fs");
const GuildSettings = require("../models/settings.js")
const GuildCommands = require("../models/commands.js");

module.exports = {
	name: 'messageCreate',
	async execute(client, message) {
        let storedSettings = await GuildSettings.findOne({
          GuildID: message.guild.id,
        });
        if (!storedSettings) {
          const newSettings = new GuildSettings({
            GuildID: message.guild.id,
          });
          await newSettings.save().catch((e) => {
            console.log(e);
          });
          storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
        }

        const prefix = storedSettings.Prefix;
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (!cmd) return;
        try {

            if (cmd.owner && message.author.id !== client.config.ownerID) {
                return message.reply({embeds: [new Discord.MessageEmbed()
                  .setColor("RED")
                  .setFooter("SOME ERROR OCCURED")
                  .setTitle(replacemsg("Your are not allowed to execute this command"))
                  .setDescription(replacemsg("You Should be one of the bot owners to use this command"))]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command")}).catch((e) => {console.log(String(e).grey)});
              }

            if (cmd.permissions && cmd.permissions.length > 0 && !message.member.permissions.has(cmd.permissions)) {
                return message.reply({ embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter("SOME ERROR OCCURED")
                    .setTitle(replacemsg("Your are not allowed to execute this command"))
                    .setDescription(replacemsg("You Dont Have Enough Permissons to use this command"))]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command")}).catch((e) => {console.log(String(e).grey)});
            }

            let check = await GuildCommands.findOne({ GuildID: message.guild.id, })
          
            if(check && check.cmds && check.cmds.includes(cmd.name)) {
              message.channel.send("Command Disabled")
            }else {
              cmd.run(client, message, args);
            }


        } catch (error) {
                console.log( "ERROR: " + error)
        }

	},
};