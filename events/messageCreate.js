const fs = require("fs");

module.exports = {
	name: 'messageCreate',
	execute(client, message) {
        const prefix = "-";
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
                  .setFooter("ERROR ERROR GO AWAY")
                  .setTitle(replacemsg("Your are not allowed to execute this command"))
                  .setDescription(replacemsg("You Should be one of the bot owners to use this command"))]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command")}).catch((e) => {console.log(String(e).grey)});
              }

            if (cmd.permissions && cmd.permissions.length > 0 && !message.member.permissions.has(cmd.permissions)) {
                return message.reply({ embeds: [new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter("ERROR ERROR GO AWAY")
                    .setTitle(replacemsg("Your are not allowed to execute this command"))
                    .setDescription(replacemsg("You Dont Have Enough Permissons to use this command"))]
                }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, "You Are not Allowed to execute this command")}).catch((e) => {console.log(String(e).grey)});
            }

            cmd.run(client, message, args);


        } catch (error) {
                
        }

	},
};