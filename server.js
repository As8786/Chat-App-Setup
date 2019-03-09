const express = require("express");
const socket = require("socket.io");

const app = express();

let server = app.listen(3007, err => {
  if (err) console.log("server error");
  else console.log("server is running on port 3007");
});

app.use(express.static("public"));

//Socket Setup
let io = socket(server);

io.on("connection", socket => {
  console.log("socket connect");
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
