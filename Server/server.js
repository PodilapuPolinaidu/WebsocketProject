const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
// app.use(express.static("public"));

const http = require("http");

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("frontendmsg", (msg) => {
    io.emit("backendmsg", `${socket.id}:${msg}`);
  });
});

server.listen(3003, () => {
  console.log("Server started on 3003");
});
