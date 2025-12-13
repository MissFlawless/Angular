// src/app/core/Services/suggestion.ts
import { Injectable } from '@angular/core';
import { Suggestion } from '../../models/suggestion';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  // Backend API endpoint
  private suggestionUrl = 'http://localhost:3000/suggestions';

  constructor(private http: HttpClient) {}

  // 🔹 Retourne la liste complète des suggestions depuis la base
  getSuggestionsList(): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(this.suggestionUrl);
  }

  // 🔹 Retourne une suggestion par son id
  getSuggestionById(id: number): Observable<Suggestion> {
    return this.http.get<Suggestion>(`${this.suggestionUrl}/${id}`);
  }

  // 🔹 Ajoute une nouvelle suggestion
  addSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    suggestion.date = new Date();
    suggestion.status = 'en_attente';
    suggestion.likes = 0;
    return this.http.post<Suggestion>(this.suggestionUrl, suggestion);
  }

  // 🔹 Met à jour une suggestion existante
  updateSuggestion(suggestion: Suggestion): Observable<Suggestion> {
    return this.http.put<Suggestion>(`${this.suggestionUrl}/${suggestion.id}`, suggestion);
  }

  // 🔹 Supprime une suggestion
  deleteSuggestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.suggestionUrl}/${id}`);
  }

  // 🔹 Incrémente le nbLikes d'une suggestion
  likeSuggestion(id: number): Observable<Suggestion> {
    return this.getSuggestionById(id).pipe(
      switchMap((suggestion) => {
        suggestion.likes++;
        return this.updateSuggestion(suggestion);
      })
    );
  }
}
