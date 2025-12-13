import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.html',
  styleUrls: ['./suggestion-details.css'],
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion;

  suggestions: Suggestion[] = [
    { id: 1, title: 'Organiser une journée team building', description: 'Suggestion pour organiser une journée de team building...', category: 'Événements', date: new Date('2025-01-20'), status: 'acceptee', likes: 0 },
    { id: 2, title: 'Améliorer le système de réservation', description: 'Proposition pour améliorer la gestion des réservations...', category: 'Technologie', date: new Date('2025-01-15'), status: 'refusee', likes: 0 },
    { id: 3, title: 'Créer un système de récompenses', description: 'Mise en place d\'un programme de récompenses...', category: 'Ressources Humaines', date: new Date('2025-01-25'), status: 'refusee', likes: 0 },
    { id: 4, title: 'Moderniser l\'interface utilisateur', description: 'Refonte complète de l\'interface utilisateur...', category: 'Technologie', date: new Date('2025-01-30'), status: 'en_attente', likes: 0 },
    { id: 5, title: 'Formation à la sécurité informatique', description: 'Organisation d\'une formation sur les bonnes pratiques...', category: 'Formation', date: new Date('2025-02-05'), status: 'acceptee', likes: 0 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadSuggestion();
  }

  loadSuggestion(): void {
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestion = this.suggestions.find(s => s.id === this.suggestionId)!;
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  nextSuggestion(): void {
    const currentIndex = this.suggestions.findIndex(s => s.id === this.suggestionId);
    const nextIndex = (currentIndex + 1) % this.suggestions.length; // loops to first suggestion
    const nextId = this.suggestions[nextIndex].id;

    this.router.navigate(['/suggestions', nextId]).then(() => {
      this.loadSuggestion(); // reload the suggestion after navigation
    });
  }
}
