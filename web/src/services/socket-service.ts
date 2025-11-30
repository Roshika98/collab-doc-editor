import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from "../environments/environment";

@Injectable({
	providedIn: "root",
})
export class SocketService {
	private socket: Socket;
	constructor() {
		this.socket = io(environment.socketUrl, {
			withCredentials: true,
			transports: ["polling", "websocket"],
			autoConnect: false,
			extraHeaders: {
				"x-auth-token": "your-auth-token",
			},
		});
		this.setupSocketClient();
	}

	private setupSocketClient(): void {
		this.socket.on("connect", () => {
			console.log("Socket connected");
		});

		this.socket.on("disconnect", () => {
			console.log("Socket disconnected");
		});

		this.socket.on("connect_error", (err) => {
			console.log("connection error");
			console.log(err);
		});

		this.socket.on("error", (err) => {
			console.log("Socket error:");
			console.log(err);
		});
	}

	public initiateSocketClient(): void {
		this.socket.connect();
	}
}
