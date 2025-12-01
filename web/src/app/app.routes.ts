import { Routes } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';
import { DocumentsDashboardComponent } from "../components/documents-dashboard/documents-dashboard";

export const routes: Routes = [
	{
		path: "",
		component: DocumentsDashboardComponent,
		pathMatch: "full",
	},
	{
		path: "editor/:id",
		component: EditorComponent,
	},
];
