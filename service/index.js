const express = require("express");
const http = require("http");
const { SocketManager } = require("./managers/socket-manager");

const app = express();

const server = http.createServer(app);

server.listen(3000, () => {
	console.log("Server is running on port 3000");
	SocketManager.initialize(server);
});
