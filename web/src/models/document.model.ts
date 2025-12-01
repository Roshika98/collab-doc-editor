export interface Document {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  color: string;
  isActive: boolean;
  cursorPosition?: number;
}

export interface DocumentPermission {
  documentId: string;
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
}


export interface DocumentItem extends Document {
	ownerName: string;
	role: "owner" | "editor" | "viewer";
	sharedWith: number;
}
