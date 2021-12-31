const { MessageEmbed } = require("discord.js")
const db = require("../../models/commands.js")

module.exports = {
    name: "command", 
    description: "enable/disable commands per server", 
    category: "config", 
    syntax: "command <enable/disable> <command-Name>", 
    aliases: ["cmd"],
    permissions: ["ADMINISTRATOR"],
      run: async (client, message, args) => {
        if(!args[1]) return message.channel.send('Please specify a command')
        if(!!client.commands.get(args[1]) === false) return message.channel.send('This command does not exist');
        const cmd = args[1]

        try {
            if (args[0] === "enable") {


                const data = await db.findOne({ GuildID: message.guild.id })
                if(!data) return message.channel.send("Command Not Disabled")
                if(data.cmds.includes(cmd)) {

                    for (let i = 0; i < data.cmds.length; i++) {
                        if(data.cmds[i] === cmd) data.cmds.splice(i, 1)
                    }
                    
                    await data.save()
                    message.channel.send(`Enabled ${cmd}!`)
                
                }else return message.channel.send("Command Not Disabled")


            } else if (args[0] === "disable") {


                await db.findOne({ GuildID: message.guild.id }, async (err, data) => {
                    if(err) throw err;
                    if(data){
                        if(data.cmds.includes(cmd)) return message.channel.send("This command is already Disabled!");
                        data.cmds.push(cmd);
                    }else {
                        data = new db({
                            GuildID: message.guild.id,
                            cmds: cmd
                        })
                    }

                    await data.save().catch((e) => { console.log(e); });

                    message.channel.send({embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setFooter("CUSTOM COMMANDS ARE FOR GUILDS")
                        .setTitle(`Command disabled successfully`)
                        .setDescription(`Disable **${args[1]}** command`)
                    ]})

                } )


            } else {
                message.channel.send("The First Argument Should Be enable or disable")
            }

        } catch (error) { 
          message.channel.send("Some Error Occured");
          console.log("ERROR :: " + error)
        }
  
      }
    }


    // ENABLE





        // DISABLE

