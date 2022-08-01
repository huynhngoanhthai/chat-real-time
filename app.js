require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/views/chat.html"));
});

//Tạo socket
io.on("connection", function (socket) {
  console.log("Welcome to server chat");

  socket.on("send", function (data) {
    io.sockets.emit("send", data);
  });
});

const POST = process.env.POST || 3000;
server.listen(POST, () => {
  console.log("listening on *:3000");
});
