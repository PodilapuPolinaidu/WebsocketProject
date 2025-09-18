const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const PORT = process.env.PORT || 3003; // ✅ fallback for local dev

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // update to your frontend’s deployed URL later
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("frontendmsg", (msg) => {
    io.emit("backendmsg", `${socket.id}: ${msg}`);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server started on ${PORT}`);
});

server.on("error", (err) => {
  console.error("❌ Server error:", err);
});
