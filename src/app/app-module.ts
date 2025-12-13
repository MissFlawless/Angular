import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { Home } from './core/home/home';
import { Notfound } from './core/notfound/notfound';
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
    ListSuggestionComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
