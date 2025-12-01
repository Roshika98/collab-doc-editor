export enum SocketEvents {
	DOCUMENT_UPDATE = "edit_document",
	COLLABORATOR_UPDATED = "collaborator-updated",
	CONNECT = "connect",
	DISCONNECT = "disconnect",
	CONNECT_ERROR = "connect_error",
	ERROR = "error",
	RECONNECT = "reconnect",
	JOIN_ROOM = "join_room",
	BC_USER_JOINED = "broadcast_user_joined",
	CURSOR_POSITION_UPDATE = "cursor_position_update",
	BC_CURSOR_POSITION = "broadcast_cursor_position",
	BC_DOCUMENT_EDIT = "broadcast_document_edit",
}
