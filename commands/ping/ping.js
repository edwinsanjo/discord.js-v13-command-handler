module.exports = {
    name: "ping",
    description: "a small description",
    aliases: ["p"],
    run: async (client, message, args) => {
      message.channel.send("Pong!")
    }
  }