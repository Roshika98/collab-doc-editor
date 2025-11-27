import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, debounceTime } from 'rxjs';
import { DocumentService } from '../../services/document.service';
import { Document, Collaborator } from '../../models/document.model';
import { CollaboratorsBarComponent } from '../collaborators-bar/collaborators-bar.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, CollaboratorsBarComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  document: Document | null = null;
  collaborators: Collaborator[] = [];
  documentContent: string = '';
  documentTitle: string = 'Untitled Document';
  isConnected: boolean = false;
  isSaving: boolean = false;
  lastSaved: Date | null = null;

  private destroy$ = new Subject<void>();
  private contentChange$ = new Subject<string>();

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('id') || 'default-doc';

    this.documentService.loadMockDocument(documentId);

    this.documentService.currentDocument$
      .pipe(takeUntil(this.destroy$))
      .subscribe(doc => {
        if (doc) {
          this.document = doc;
          this.documentContent = doc.content;
          this.documentTitle = doc.title;
        }
      });

    this.documentService.collaborators$
      .pipe(takeUntil(this.destroy$))
      .subscribe(collaborators => {
        this.collaborators = collaborators;
      });

    this.documentService.isConnected$
      .pipe(takeUntil(this.destroy$))
      .subscribe(connected => {
        this.isConnected = connected;
      });

    this.contentChange$
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(content => {
        this.saveContent(content);
      });
  }

  onContentChange(content: string): void {
    this.documentContent = content;
    this.contentChange$.next(content);
  }

  onTitleChange(title: string): void {
    this.documentTitle = title;
  }

  private saveContent(content: string): void {
    if (!this.document) return;

    this.isSaving = true;

    this.documentService.updateDocumentContent(this.document.id, content);

    setTimeout(() => {
      this.isSaving = false;
      this.lastSaved = new Date();
    }, 300);
  }

  getStatusText(): string {
    if (this.isSaving) {
      return 'Saving...';
    }
    if (this.lastSaved) {
      return 'All changes saved';
    }
    return 'Ready';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
