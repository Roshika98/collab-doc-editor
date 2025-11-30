const { Server } = require("socket.io");

const SOCKET_EVENTS = {
	CONNECTION: "connection",
	DISCONNECT: "disconnect",
	JOIN_ROOM: "join_room",
	LEAVE_ROOM: "leave_room",
	SEND_MESSAGE: "send_message",
	RECEIVE_MESSAGE: "receive_message",
	TYPING: "typing",
	STOP_TYPING: "stop_typing",
	READ_MESSAGES: "read_messages",
	UPDATE_DOCUMENT: "update_document",
	CREATE_DOCUMENT: "create_document",
	USER_JOINED: "user_joined",
	EDIT_DOCUMENT: "edit_document",
	DOCUMENT_EDITED: "document_edited",
};

class SocketManager {
	static instance = null;

	static initialize(server) {
		if (!SocketManager.instance) {
			SocketManager.instance = new SocketManager(server);
		}
		return SocketManager.instance;
	}

	constructor(server) {
		this.io = new Server(server, {
			cors: {
				origin: "http://localhost:4200",
				methods: ["GET", "POST"],
				credentials: true,
				allowedHeaders: ["x-auth-token"],
			},
			transports: ["websocket", "polling"],
			allowEIO3: true,
			pingTimeout: 60000,
			pingInterval: 25000,
			maxHttpBufferSize: 1e8,
		});

		this.setupSocketEvents();
	}

	setupSocketEvents() {
		this.io.use((socket, next) => {
			console.log("Socket handshake headers:", socket.handshake.headers);
			
			if (!socket.handshake.headers["x-auth-token"]) {
				return next(new Error("Unauthorized"));
			}

			const token = socket.handshake.headers["x-auth-token"];

			socket.metaData = { token };

			next();
		});

		this.io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
			console.log("A user connected");

			socket.on(SOCKET_EVENTS.CREATE_DOCUMENT, (documentData, ack) => {
				console.log("Creating document");
				console.log(documentData);
				// console.log(ack);
				// TODO: Implement document creation logic
				if (typeof ack === "function") {
					ack(null, {
						success: true,
						document: {
							id: "123",
						},
						metaData: socket.metaData,
					});
				}
			});

			socket.on(SOCKET_EVENTS.JOIN_ROOM, (documentId, ack) => {
				console.log("Joining room");
				// TODO: Implement room joining logic
				socket.join(documentId);
				if (typeof ack === "function") {
					ack(null, {
						success: true,
						message: `Joined room ${documentId}`,
					});
				}
				socket.to(documentId).emit(SOCKET_EVENTS.USER_JOINED, {
					userId: socket.id,
					username: socket.username,
					color: socket.color,
				});
			});

			socket.on(SOCKET_EVENTS.EDIT_DOCUMENT, ({ documentId, documentData }, ack) => {
				console.log("Editing document");

				// TODO: Implement document editing logic or save to database

				if (typeof ack === "function") {
					ack(null, {
						success: true,
						message: "Document edited successfully",
					});
				}

				socket.to(documentId).emit(SOCKET_EVENTS.DOCUMENT_EDITED, {
					documentId,
					documentData,
				});
			});
		});
	}
}

module.exports = { SocketManager, SOCKET_EVENTS };
