const { MessageEmbed } = require("discord.js")
const GuildSettings = require("../../models/settings.js")

module.exports = {
    name: "prefix", 
    description: "Change Guild Prefix", 
    category: "config", 
    syntax: "prefix <newPrefix>", 
    permissions: ["ADMINISTRATOR"],
      run: async (client, message, args) => {
        if(!args[0]) return message.channel.send("Please Enter a Valid Prefix")
        if(args[0].length > 5) return message.channel.send("Prefix cant be above 5 charcters")
        try {
          
          let storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
          if (!storedSettings) {
            // If there are no settings stored for this guild, we create them and try to retrive them again.
            const newSettings = new GuildSettings({ GuildID: message.guild.id, });
            await newSettings.save().catch((e) => {
              console.log(e);
            });
            storedSettings = await GuildSettings.findOne({ GuildID: message.guild.id });
          }

          storedSettings.Prefix = args[0];
          await storedSettings.save().catch((e) => {
            console.log(e);
          });

          message.channel.send({ embeds: [new MessageEmbed()
            .setTitle("Prefix Changed")
            .setDescription(`Prefix Changed to : **${args[0]}**`)
            .setColor("RANDOM")
            .setFooter("Custom Prefix Was Not So Hard To Make")   ]})

        } catch (error) { 
          message.channel.send("Some Error Occured");
          console.log("ERROR :: " + error)
        }
  
      }
    }