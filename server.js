const express = require("express");

const server = express();

server.all("/", (req, res) => {
  res.send("Bot is running");
});

function keepLive() {
  server.listen(3000, () => {
    console.log("Server is live.");
  });
}

module.exports = keepLive;
