import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Collaborator } from '../../models/document.model';

@Component({
  selector: 'app-collaborators-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaborators-bar.component.html',
  styleUrls: ['./collaborators-bar.component.css']
})
export class CollaboratorsBarComponent {
  @Input() collaborators: Collaborator[] = [];

  getActiveCollaborators(): Collaborator[] {
    return this.collaborators.filter(c => c.isActive);
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
