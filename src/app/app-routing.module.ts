import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './pages/demo/demo.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

const routes: Routes = [
  //{ path: '', component: DemoPageComponent },
  { path: '', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
