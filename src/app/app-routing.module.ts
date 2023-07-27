import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from './pages/accueil/accueil.component';
import { RechercheComponent } from './pages/recherche/recherche.component';
import { NewRecetteComponent } from './pages/new-recette/new-recette.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { DetailsRecetteComponent } from './pages/details-recette/details-recette.component';
import { PanierRecettesComponent } from './pages/panier-recettes/panier-recettes.component';
import { ListeCoursesComponent } from './pages/liste-courses/liste-courses.component';
import { ModifierRecetteComponent } from './pages/modifier-recette/modifier-recette.component';
import { AjoutCategorieRecetteComponent } from './pages/ajout-categorie-recette/ajout-categorie-recette.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'recherche/:query', component: RechercheComponent },
  { path: 'nouvelle-recette', component: NewRecetteComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'details-recette/:id', component: DetailsRecetteComponent },
  { path: 'panier-recettes', component: PanierRecettesComponent },
  { path: 'liste-courses', component: ListeCoursesComponent },
  { path: 'ajout-ingredient', component: ModifierRecetteComponent },
  { path: 'ajout-categorie', component: AjoutCategorieRecetteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
