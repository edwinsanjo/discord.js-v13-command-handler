const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (client) => {
  const cmds = fs.readdirSync("./slsCmds/").filter(f => f.split(".").pop() === "js");
  
  const TEST_GUILD_ID = client.config.testGuildIDS;

  const commands = [];

  for (const file of cmds) {
      const command = require(`../slsCmds/${file}`);
      commands.push(command.data.toJSON());
      client.slsCommands.set(command.data.name, command);
  }

  // When the client is ready, this only runs once
  client.once('ready', () => {
      console.log('Ready!');
      // Registering the commands in the client
      const CLIENT_ID = client.user.id;
      const rest = new REST({
          version: '9'
      }).setToken(client.config.token);
      (async () => {
          try {
              if (!TEST_GUILD_ID) {
                  await rest.put(
                      Routes.applicationCommands(CLIENT_ID), {
                          body: commands
                      },
                  );
                  console.log('Successfully registered application commands globally');
              } else {
                  await rest.put(
                      Routes.applicationGuildCommands(CLIENT_ID, TEST_GUILD_ID), {
                          body: commands
                      },
                  );
                  console.log('Successfully registered application commands for development guild');
              }
          } catch (error) {
              if (error) console.error(error);
          }
      })();
  });

};