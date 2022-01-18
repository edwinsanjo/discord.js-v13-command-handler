const { MessageEmbed, Client, Message } = require("discord.js")
const db = require("../../models/commands.js")

module.exports = {
	name: "enable",
	description: "To Enable Those Disabled Commands",
	category: "config",
	syntax: "command <Command_Name>",
	permissions: ["ADMINISTRATOR"],

	/**
   * @param {Client} client 
   * @param {Message} message 
   */

	run: async (client, message, args) => {
		if (!args[0]) return message.channel.send('Please specify a command')
		if (!!client.commands.get(args[0]) === false) return message.channel.send('This command does not exist');
		const cmd = args[0]

		try {

			const data = await db.findOne({ GuildID: message.guild.id })
			if (!data) return message.channel.send("Command Not Disabled")
			if (data.cmds.includes(cmd)) {

				for (let i = 0; i < data.cmds.length; i++) {
					if (data.cmds[i] === cmd) data.cmds.splice(i, 1)
				}

				await data.save()
				message.channel.send({
					embeds: [new MessageEmbed()
						.setColor("RANDOM")
						.setFooter("CUSTOM COMMANDS ARE FOR GUILDS ONLY")
						.setTitle(`Command Enabled successfully`)
						.setDescription(`Enabled **${args[0]}** command`)
					]
				})

			} else return message.channel.send("Command Not Disabled")

		} catch (error) {
			message.channel.send("Some Error Occured");
			console.log("ERROR :: " + error)
		}

	}
}
