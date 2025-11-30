import { Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from "../environments/environment";
import { BehaviorSubject } from "rxjs";
import { SocketEvents } from "../enums/socket-events";

@Injectable({
	providedIn: "root",
})
export class SocketService {
	private documentUpdate$ = new BehaviorSubject<any>(null);
	public onDocumentUpdate$ = this.documentUpdate$.asObservable();

	private collaboratorUpdate$ = new BehaviorSubject<any>(null);
	public onCollaboratorUpdate$ = this.collaboratorUpdate$.asObservable();

	private connectionStatus$ = new BehaviorSubject<boolean>(false);
	public onConnectionStatus$ = this.connectionStatus$.asObservable();

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
		this.socket.on(SocketEvents.CONNECT, () => {
			console.log("Socket connected");
			this.connectionStatus$.next(true);
		});

		this.socket.on(SocketEvents.DISCONNECT, () => {
			console.log("Socket disconnected");
			this.connectionStatus$.next(false);
		});

		this.socket.on(SocketEvents.CONNECT_ERROR, (err) => {
			console.log("connection error");
			console.log(err);
			this.connectionStatus$.next(false);
		});

		this.socket.on(SocketEvents.ERROR, (err) => {
			console.log("Socket error:");
			console.log(err);
			this.connectionStatus$.next(false);
		});

		this.socket.on(SocketEvents.RECONNECT, () => {
			console.log("Socket reconnected");
			this.connectionStatus$.next(true);
		});

		this.socket.on(SocketEvents.DOCUMENT_UPDATED, (data: any) => {
			this.documentUpdate$.next(data);
		});

		this.socket.on(SocketEvents.USER_JOINED, (data: any) => {
			console.log("User joined:", data);
			this.collaboratorUpdate$.next(data);
		});
	}

	public initiateSocketClient(): void {
		this.socket.connect();
	}

	public joinDocumentRoom(documentId: string): void {
		this.socket.emit(SocketEvents.JOIN_ROOM, { documentId }, (ack: any) => {
			console.log(`Joined document room: ${documentId}`, ack);
		});
	}
}
