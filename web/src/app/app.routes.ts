import { Routes } from '@angular/router';
import { EditorComponent } from '../components/editor/editor.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/document/default-doc',
    pathMatch: 'full'
  },
  {
    path: 'document/:id',
    component: EditorComponent
  }
];
