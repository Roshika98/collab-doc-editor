// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-documents-dashboard',
//   imports: [],
//   templateUrl: './documents-dashboard.html',
//   styleUrl: './documents-dashboard.css',
// })
// export class DocumentsDashboard {

// }
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { DocumentService } from "../../services/document.service";
import { DocumentItem } from "../../models/document.model";

@Component({
	selector: "app-documents-dashboard",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./documents-dashboard.html",
	styleUrls: ["./documents-dashboard.css"],
})
export class DocumentsDashboardComponent implements OnInit, OnDestroy {
	myDocuments: DocumentItem[] = [];
	sharedDocuments: DocumentItem[] = [];
	isCreating: boolean = false;

	private destroy$ = new Subject<void>();

	constructor(private documentService: DocumentService, private router: Router) {}

	ngOnInit(): void {
		this.documentService.loadMyDocuments();
		this.documentService.loadSharedDocuments();

		this.documentService.myDocuments$.pipe(takeUntil(this.destroy$)).subscribe((docs) => {
			this.myDocuments = docs;
		});

		this.documentService.sharedDocuments$.pipe(takeUntil(this.destroy$)).subscribe((docs) => {
			this.sharedDocuments = docs;
		});
	}

	createNewDocument(): void {
		this.isCreating = true;
		setTimeout(() => {
			const newDocId = this.documentService.createNewDocument("Untitled Document");
			this.isCreating = false;
			this.router.navigate(["/editor", newDocId]);
		}, 300);
	}

	openDocument(documentId: string): void {
		this.router.navigate(["/editor", documentId]);
	}

	formatDate(date: Date): string {
		const d = new Date(date);
		return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
	}

	getRoleLabel(role: string): string {
		if (role === "owner") return "Owner";
		if (role === "editor") return "Can edit";
		return "Can view";
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
