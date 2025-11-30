import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './core/home/home';
import { Notfound } from './core/notfound/notfound';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },   // route par défaut
  { path: 'home', component: Home },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { path: 'suggestions', loadChildren: () => import('./features/suggestions/suggestions-module').then(m => m.SuggestionsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users-module').then(m => m.UsersModule) },
  { path: '**', component: Notfound }           // page 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
