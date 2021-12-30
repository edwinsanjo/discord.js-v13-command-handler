const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help", 
  description: "Returns all Commmands, or one specific command", 
  category: "info", 
  syntax: "help [Commandname]", 
  cooldown: 5,
    run: async (client, message, args) => {
      try {
        
        if(args[0]) {
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(client.commands));
          if(!cmd){
            message.channel.send("Command not Found")
          }
          const help = new MessageEmbed()
            .setTitle(`Help`)
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter('<Required> and [optional]')
            .setColor("RANDOM")
            if(cmd) {
              help.addField(`*Full Name*`,`\`${cmd.name}\``)
            }
            if(cmd.description) {
              help.addField(`*Description*`,`\`${cmd.description}\``)
            }
            if(cmd.syntax) {
              help.addField(`*Usage*`, `\`${client.config.prefix}${cmd.syntax}\``)
            }
          message.channel.send({ embeds: [help] })

        }else if(!args[0]){
          const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle('❓ HELP')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('<Required> and [optional]');

            const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
            };
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
              embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${items.join(", ")}`);
            }


          message.channel.send({ embeds: [embed] });
        }

      } catch (error) { 
        message.channel.send("Some Error Occured");
        console.log("ERROR :: " + error)
      }
  }
}