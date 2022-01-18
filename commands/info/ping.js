const { Client, Message } = require("discord.js")

module.exports = {
  name: "ping",
  description: "Get The Bots Latency",
  category: "info",
  syntax: "ping",

  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   */

  run: async (client, message, args) => {

    try {

      const embed = new MessageEmbed()
        .setTitle(`Pong!`)
        .setFooter(`${message.author.tag}`, message.author.avatarURL())
        .setColor("RANDOM")
        .setDescription(`Ping is the latency between the bot and discord but api latency is the latency between the client and api`)
        .addField("Ping", `${message.createdTimestamp - message.createdTimestamp}ms`)
        .addField("API Latency", `${Math.round(client.ws.ping)}ms`)
      message.channel.send({ embeds: [embed] })

    } catch (error) {
      message.channel.send("Some Error Occured");
      console.log("ERROR :: " + error)
    }

  }
}