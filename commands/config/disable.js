const { MessageEmbed, Client, Message } = require("discord.js")
const db = require("../../models/commands.js")

module.exports = {
    name: "disable",
    description: "Command To Disable Command For This Server",
    category: "config",
    syntax: "disable <Command_Name>",
    permissions: ["ADMINISTRATOR"],

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   */

    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Please specify a command')
        if (!!client.commands.get(args[0]) === false) return message.channel.send('This command does not exist');
        const cmd = args[0]

        try {

            // await db.findOne({ GuildID: message.guild.id }, async (err, data) => {
            //     if(err) throw err;
            //     if(data){
            //         if(data.cmds.includes(cmd)) return message.channel.send("This command is already Disabled!");
            //         data.cmds.push(cmd);
            //     }else {
            //         data = new db({
            //             GuildID: message.guild.id,
            //             cmds: cmd
            //         })
            //     }



            // } )

            const data = db.findOne({ GuildID: message.guild.id })
            if (!data) {
                data = new db({
                    GuildID: message.guild.id,
                    cmds: cmd
                })

                data = db.findOne({ GuildID: message.guild.id })
            }

            if (data.cmds.includes(cmd)) return message.channel.send("This command is already Disabled!");
            data.cmds.push(cmd);

            await data.save().catch((e) => { console.log(e); });

            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setFooter("CUSTOM COMMANDS ARE FOR GUILDS ONLY")
                    .setTitle(`Command disabled successfully`)
                    .setDescription(`Disable **${args[0]}** command`)
                ]
            })

        } catch (error) {
            message.channel.send("Some Error Occured");
            console.log("ERROR :: " + error)
        }

    }
}
