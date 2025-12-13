import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './suggestion-form.html',
  styleUrls: ['./suggestion-form.css']
})
export class SuggestionFormComponent {
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  suggestionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  // Getter pratique pour le template
  get f() {
    return this.suggestionForm.controls;
  }

  submit() {
    if (this.suggestionForm.valid) {
      const newSuggestion: Suggestion = {
        id: Date.now(),
        title: this.suggestionForm.value.title,
        description: this.suggestionForm.value.description,
        category: this.suggestionForm.value.category,
        date: new Date(),
        status: 'en_attente',
        likes: 0
      };

      console.log('Nouvelle suggestion:', newSuggestion);

      // ⚡ Ajouter à la liste des suggestions (ex: service ou localStorage)
      // suggestionService.add(newSuggestion);

      alert('Suggestion ajoutée !');

      // Redirection automatique vers la liste
      this.router.navigate(['/suggestions']);
    }
  }
}
