import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion';
import { Suggestion } from '../../../models/suggestion';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.html',
  styleUrls: ['./suggestion-details.css'],
  standalone: true
})
export class SuggestionDetailsComponent implements OnInit {
  suggestionId!: number;
  suggestion!: Suggestion;
  suggestions: Suggestion[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    // Load all suggestions once for navigation
    this.loadAllSuggestions();

    // Subscribe to route params and load the corresponding suggestion
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        this.suggestionId = id;
        this.loadSuggestion(id);
      }
    });
  }

  // Load a single suggestion by ID from backend
  loadSuggestion(id: number) {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => this.suggestion = data,
      error: (err) => console.error('Erreur chargement suggestion', err)
    });
  }

  // Load all suggestions for next/previous navigation
  loadAllSuggestions() {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => this.suggestions = data,
      error: (err) => console.error('Erreur chargement liste', err)
    });
  }

  onDelete() {
    this.suggestionService.deleteSuggestion(this.suggestion.id).subscribe({
      next: () => this.router.navigate(['/suggestions']),
      error: (err) => console.error('Erreur suppression', err)
    });
  }

  onUpdate() {
    this.router.navigate(['/suggestions/add', this.suggestion.id]);
  }

  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  nextSuggestion(): void {
    if (this.suggestions.length === 0) return;
    const currentIndex = this.suggestions.findIndex(s => s.id === this.suggestionId);
    const nextIndex = (currentIndex + 1) % this.suggestions.length;
    const nextId = this.suggestions[nextIndex].id;
    this.router.navigate(['/suggestions', nextId]); // route param subscription will reload suggestion
  }
}
