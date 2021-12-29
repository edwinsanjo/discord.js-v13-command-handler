const fs = require('fs');

module.exports = (client) => {
  const events = fs.readdirSync("./events/").filter(f => f.split(".").pop() === "js");
  if (events.length <= 0) return console.log("No EVENTS Found".yellow.bold);

  events.forEach(f => {
    var event = require(`../events/${f}`);

    client.on(event.name, (...args) => event.execute(client, ...args));
  });

};