import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SuggestionService } from '../../../core/Services/suggestion';
import { Suggestion } from '../../../models/suggestion';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-suggestions-list',
  templateUrl: './suggestions-list.html',
  styleUrls: ['./suggestions-list.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, TitleCasePipe]
})
export class SuggestionsList implements OnInit {
  suggestions: Suggestion[] = [];
  loading: boolean = false;

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions() {
    this.loading = true;
    this.suggestionService.getSuggestionsList()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (data) => this.suggestions = data,
        error: (err) => console.error('Erreur chargement suggestions', err)
      });
  }

  onDelete(id: number) {
    this.suggestionService.deleteSuggestion(id).subscribe({
      next: () => this.loadSuggestions(), // refresh list from backend
      error: (err) => console.error('Erreur suppression', err)
    });
  }

  onLike(id: number) {
    this.suggestionService.likeSuggestion(id).subscribe({
      next: () => this.loadSuggestions(), // refresh list to update likes
      error: (err) => console.error('Erreur like', err)
    });
  }
}
