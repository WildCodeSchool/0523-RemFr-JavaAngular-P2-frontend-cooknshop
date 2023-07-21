import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { HeaderComponent } from './components/header/header.component';

import { AccueilComponent } from './pages/accueil/accueil.component';
import { BouttonFavComponent } from './components/boutton-fav/boutton-fav.component';
import { RechercheComponent } from './pages/recherche/recherche.component';
import { BouttonNewRecetteComponent } from './components/boutton-new-recette/boutton-new-recette.component';
import { NewRecetteComponent } from './pages/new-recette/new-recette.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DetailsRecetteComponent } from './pages/details-recette/details-recette.component';
import { PanierRecettesComponent } from './pages/panier-recettes/panier-recettes.component';
import { ListeCoursesComponent } from './pages/liste-courses/liste-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
    HeaderComponent,
    AccueilComponent,
    BouttonFavComponent,
    RechercheComponent,
    BouttonNewRecetteComponent,
    NewRecetteComponent,
    InscriptionComponent,
    ConnexionComponent,
    DetailsRecetteComponent,
    PanierRecettesComponent,
    ListeCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
