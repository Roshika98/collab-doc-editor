import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document, Collaborator, DocumentItem } from "../models/document.model";
import { ApiService } from "./api-service";

@Injectable({
	providedIn: "root",
})
export class DocumentService {
	private currentDocumentSubject = new BehaviorSubject<Document | null>(null);
	public currentDocument$ = this.currentDocumentSubject.asObservable();

	private collaboratorsSubject = new BehaviorSubject<Collaborator[]>([]);
	public collaborators$ = this.collaboratorsSubject.asObservable();

	private isConnectedSubject = new BehaviorSubject<boolean>(false);
	public isConnected$ = this.isConnectedSubject.asObservable();

	private myDocumentsSubject = new BehaviorSubject<DocumentItem[]>([]);
	public myDocuments$ = this.myDocumentsSubject.asObservable();

	private sharedDocumentsSubject = new BehaviorSubject<DocumentItem[]>([]);
	public sharedDocuments$ = this.sharedDocumentsSubject.asObservable();

	private newDocumentSubject = new BehaviorSubject<{
		status: number;
		data?: string;
		error?: any;
	} | null>(null);
	public newDocument$ = this.newDocumentSubject.asObservable();

	constructor(private apiService: ApiService) {}

	getDocument(documentId: string): Observable<Document | null> {
		return this.currentDocument$;
	}

	updateDocumentContent(documentId: string, content: string): void {
		const currentDoc = this.currentDocumentSubject.value;
		if (currentDoc) {
			const updatedDoc = { ...currentDoc, content, updatedAt: new Date() };
			this.currentDocumentSubject.next(updatedDoc);
		}
	}

	loadMockDocument(documentId: string): void {
		const mockDoc: Document = {
			id: documentId,
			title: "Untitled Document",
			content: "",
			ownerId: "current-user-id",
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		this.currentDocumentSubject.next(mockDoc);

		this.loadMockCollaborators();
	}

	private loadMockCollaborators(): void {
		const mockCollaborators: Collaborator[] = [
			{
				id: "current-user-id",
				name: "You",
				email: "you@example.com",
				color: "#4F46E5",
				isActive: true,
			},
		];
		this.collaboratorsSubject.next(mockCollaborators);
	}

	updateCursorPosition(userId: string, position: number): void {
		const collaborators = this.collaboratorsSubject.value;
		const updated = collaborators.map((c) =>
			c.id === userId ? { ...c, cursorPosition: position } : c
		);
		this.collaboratorsSubject.next(updated);
	}

	addCollaborator(collaborator: Collaborator): void {
		const current = this.collaboratorsSubject.value;
		this.collaboratorsSubject.next([...current, collaborator]);
	}

	removeCollaborator(userId: string): void {
		const current = this.collaboratorsSubject.value;
		this.collaboratorsSubject.next(current.filter((c) => c.id !== userId));
	}

	loadMyDocuments(): void {
		const mockDocuments: DocumentItem[] = [
			{
				id: "doc-1",
				title: "Project Proposal",
				content: "",
				ownerId: "current-user-id",
				createdAt: new Date(2024, 10, 15),
				updatedAt: new Date(2024, 11, 1),
				ownerName: "You",
				role: "owner",
				sharedWith: 2,
			},
			{
				id: "doc-2",
				title: "Meeting Notes",
				content: "",
				ownerId: "current-user-id",
				createdAt: new Date(2024, 10, 20),
				updatedAt: new Date(2024, 10, 28),
				ownerName: "You",
				role: "owner",
				sharedWith: 1,
			},
			{
				id: "doc-3",
				title: "Budget 2025",
				content: "",
				ownerId: "current-user-id",
				createdAt: new Date(2024, 9, 10),
				updatedAt: new Date(2024, 11, 2),
				ownerName: "You",
				role: "owner",
				sharedWith: 0,
			},
		];
		this.myDocumentsSubject.next(mockDocuments);
	}

	loadSharedDocuments(): void {
		const mockSharedDocuments: DocumentItem[] = [
			{
				id: "shared-1",
				title: "Q4 Strategy",
				content: "",
				ownerId: "user-2",
				createdAt: new Date(2024, 10, 1),
				updatedAt: new Date(2024, 11, 1),
				ownerName: "Sarah Johnson",
				role: "editor",
				sharedWith: 3,
			},
			{
				id: "shared-2",
				title: "Design System",
				content: "",
				ownerId: "user-3",
				createdAt: new Date(2024, 8, 5),
				updatedAt: new Date(2024, 10, 25),
				ownerName: "Mike Chen",
				role: "viewer",
				sharedWith: 5,
			},
		];
		this.sharedDocumentsSubject.next(mockSharedDocuments);
	}

	createNewDocument(): void {
		this.apiService.postData("docs", {}).subscribe({
			next: (response) => {
				console.log(response);

				const newDocId = response.data.document.id;
				this.newDocumentSubject.next({ status: 1, data: newDocId });
			},
			error: (err) => {
				console.error("Error creating document:", err);
				this.newDocumentSubject.next({ status: 0, error: err });
			},
		});
	}
}
