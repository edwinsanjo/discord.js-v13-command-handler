const { Schema, model } = require("mongoose");

const schema = new Schema({
  GuildID: {
    type: String,
  },
  cmds: {
    type: Array,
  },
});

module.exports = model("commands", schema);