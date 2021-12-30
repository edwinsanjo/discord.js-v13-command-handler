const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
  const cmds = fs.readdirSync("./slsCmds/").filter(f => f.split(".").pop() === "js");

  const commands = [];

  for (const file of cmds) {
      const command = require(`../slsCmds/${file}`);
      commands.push(command.data.toJSON());
      client.slsCommands.set(command.data.name, command);
  }

  // When the client is ready, this only runs once
  client.once('ready', () => {
      // Registering the commands in the client
      const rest = new REST({
          version: '9'
      }).setToken(client.config.token);
      (async () => {

          try {
              if (client.config.slashGlobal || !client.config.testGuildIDS) {
                  await rest.put(
                      Routes.applicationCommands(client.user.id), {
                          body: commands
                      },
                  );
                  console.log('Loaded Slash Commands (GLOBAL)');
              } else {
                  await rest.put(
                      Routes.applicationGuildCommands(client.user.id, client.config.testGuildIDS), {
                          body: commands
                      },
                  );
                  console.log('Loaded Slash Commands (DEVELOPMENT)');
              }
          } catch (e) { console.error(e); }
          
      })();
      console.log(`Ready! Logged in as ${client.user.tag}`);
  });

};