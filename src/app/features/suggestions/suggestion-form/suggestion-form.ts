import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuggestionService } from '../../../core/Services/suggestion';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './suggestion-form.html',
  styleUrls: ['./suggestion-form.css']
})
export class SuggestionFormComponent implements OnInit {
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
  suggestionId?: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {
    this.suggestionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[A-Z][a-zA-Z]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  ngOnInit(): void {
    // Check if we are editing an existing suggestion
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.suggestionId = Number(id);
      const suggestion = this.suggestionService.getSuggestionById(this.suggestionId);
      if (suggestion) {
        this.suggestionForm.patchValue(suggestion);
      }
    }
  }

  // Getter pratique pour le template
  get f() {
    return this.suggestionForm.controls;
  }

  submit() {
  if (this.suggestionForm.valid) {
    const suggestionData: Suggestion = {
      id: this.suggestionId || Date.now(),
      title: this.suggestionForm.value.title,
      description: this.suggestionForm.value.description,
      category: this.suggestionForm.value.category,
      date: new Date(),
      status: 'en_attente',
      likes: 0
    };

    if (this.suggestionId) {
      this.suggestionService.updateSuggestion(suggestionData).subscribe(() => {
        alert('Suggestion mise à jour !');
        this.router.navigate(['/suggestions']);
      });
    } else {
      this.suggestionService.addSuggestion(suggestionData).subscribe(() => {
        alert('Nouvelle suggestion ajoutée !');
        this.router.navigate(['/suggestions']);
      });
    }
  }
}

}
