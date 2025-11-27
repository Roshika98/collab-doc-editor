import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document, Collaborator } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private currentDocumentSubject = new BehaviorSubject<Document | null>(null);
  public currentDocument$ = this.currentDocumentSubject.asObservable();

  private collaboratorsSubject = new BehaviorSubject<Collaborator[]>([]);
  public collaborators$ = this.collaboratorsSubject.asObservable();

  private isConnectedSubject = new BehaviorSubject<boolean>(false);
  public isConnected$ = this.isConnectedSubject.asObservable();

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
      title: 'Untitled Document',
      content: '',
      ownerId: 'current-user-id',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.currentDocumentSubject.next(mockDoc);

    this.loadMockCollaborators();
  }

  private loadMockCollaborators(): void {
    const mockCollaborators: Collaborator[] = [
      {
        id: 'current-user-id',
        name: 'You',
        email: 'you@example.com',
        color: '#4F46E5',
        isActive: true
      }
    ];
    this.collaboratorsSubject.next(mockCollaborators);
  }

  updateCursorPosition(userId: string, position: number): void {
    const collaborators = this.collaboratorsSubject.value;
    const updated = collaborators.map(c =>
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
    this.collaboratorsSubject.next(current.filter(c => c.id !== userId));
  }
}
