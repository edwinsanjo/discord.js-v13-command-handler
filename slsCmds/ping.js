const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    async execute(interaction) {
        
        const embed = new MessageEmbed()
            .setTitle(`Pong!`)
            .setFooter(`${interaction.message.author.tag}`, interaction.message.author.avatarURL())
            .setColor("RANDOM")
            .setDescription(`Ping is the latency between the bot and discord but api latency is the latency between the client and api`)
            .addField("Ping", `${interaction.message.createdTimestamp - interaction.message.createdTimestamp}ms`)
            .addField("API Latency", `${Math.round(client.ws.ping)}ms`)
        interaction.reply({ embeds: [embed] })

    }
};