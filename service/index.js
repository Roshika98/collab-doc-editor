const express = require("express");
const http = require("http");
const { SocketManager } = require("./managers/socket-manager");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use("/api", require("./routes"));

const server = http.createServer(app);

server.listen(3000, () => {
	console.log("Server is running on port 3000");
	SocketManager.initialize(server);

	mongoose
		.connect("mongodb://localhost:27017/collab-doc-editor")
		.then(() => {
			console.log("MongoDB connected");
		})
		.catch((err) => {
			console.error("MongoDB connection error:", err);
		});
});
