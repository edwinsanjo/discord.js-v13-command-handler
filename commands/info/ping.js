module.exports = {
  name: "ping", 
  description: "Sends Back Pong", 
  category: "info", 
  aliases: ["pong"],
  syntax: "ping", 
    run: async (client, message, args) => {

      try {
        message.channel.send("Pong!")
      } catch (error) { 
        message.channel.send("Some Error Occured");
        console.log("ERROR :: " + error)
      }

    }
  }