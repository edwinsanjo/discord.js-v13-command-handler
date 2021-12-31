
# COMMAND HANDLER

This is a command hander by EDWiN. This is on of the simplest command hander available for discord.js v13 on the entire network. i've made it so simple that beginers could also understand the code thank my by giving a star and d-bot server

## Installation

locate to the folder where you want the hander to be and type the command

```bash
  git clone https://github.com/edwinsanjo/discord.js-v13-command-handler.git
  cd discord.js-v13-command-handler
```

to install all of the required dependencies use the command

```bash
  npm install
```
## Config File

To run this project, you will need to change some of the variables in the config file

```js
  module.exports = {
    prefix: "-",// Your Prfix comes here
    mongo: "", // currently under development
    testGuildIDS: "854588598526148628", // not required
    token: "" // bot token from discord develpers portal
  }
```
## Start
the next step is to run the bot and see if the bot is working
```bash
  npm start
```
this command will run the bot
