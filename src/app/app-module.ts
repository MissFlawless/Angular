// src/app/app.module.ts
import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Home } from './core/home/home';
import { Notfound } from './core/notfound/notfound';

// 🔹 Composants standalone
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionDetailsComponent } from './features/suggestions/suggestion-details/suggestion-details';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    Home,
    Notfound
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,                // 🔹 Ajouté pour HttpClient
    ListSuggestionComponent,         // 🔹 composant standalone
    SuggestionDetailsComponent       // 🔹 composant standalone
  ],
  providers: [
    provideHttpClient(),             // 🔹 fourni pour HttpClient
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
