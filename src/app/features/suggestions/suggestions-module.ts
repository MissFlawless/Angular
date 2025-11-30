import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsRoutingModule } from './suggestions-routing-module';
import { Suggestions } from './suggestions';
import { SuggestionsList } from './suggestions-list/suggestions-list';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details';
import { RouterModule } from '@angular/router'; // ✅ add this


@NgModule({
  declarations: [
    Suggestions,
    SuggestionsList,
    SuggestionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }
