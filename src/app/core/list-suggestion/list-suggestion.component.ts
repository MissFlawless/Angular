import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔹 Needed for ngModel

export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  status: 'acceptee' | 'refusee' | 'en_attente';
  likes: number;
}

@Component({
  selector: 'app-list-suggestion',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔹 Add FormsModule here
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent {
  searchText: string = '';

  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: 'Suggestion pour organiser une journée de team building...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', likes: 0 },
    { id: 2, title: 'Améliorer le système de réservation', description: 'Proposition pour améliorer la gestion des réservations...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', likes: 0 },
    { id: 3, title: 'Créer un système de récompenses', description: 'Mise en place d\'un programme de récompenses...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', likes: 0 },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: 'Refonte complète de l\'interface utilisateur...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', likes: 0 },
    { id: 5, title: 'Formation à la sécurité informatique', description: 'Organisation d\'une formation sur les bonnes pratiques...', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', likes: 0 }
  ];

  favorites: Suggestion[] = [];

  get filteredSuggestions(): Suggestion[] {
    const text = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(text) ||
      s.category.toLowerCase().includes(text)
    );
  }

  getStatusClass(status: Suggestion['status']): string {
    const statusMap: Record<Suggestion['status'], string> = {
      acceptee: 'status-accepted',
      refusee: 'status-refused',
      en_attente: 'status-pending'
    };
    return statusMap[status] || '';
  }

  // 🔹 Increment likes
  likeSuggestion(s: Suggestion) {
    s.likes++;
  }

  // 🔹 Add to favorites
  addToFavorites(s: Suggestion) {
    if (!this.favorites.find(f => f.id === s.id)) {
      this.favorites.push(s);
    }
  }
}
