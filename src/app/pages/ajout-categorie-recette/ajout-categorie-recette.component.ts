import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-ajout-categorie-recette',
  templateUrl: './ajout-categorie-recette.component.html',
  styleUrls: ['./ajout-categorie-recette.component.scss']
})
export class AjoutCategorieRecetteComponent {
  formulaire: FormGroup;
  allRecipes: any[] = [];
  allCategories: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private ApiCallService: ApiCallService, private router: Router) {
    this.formulaire = this.formBuilder.group({
      recette: ['', Validators.required],
      recipeCategories: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initCategories();
    this.initRecipes();
    this.formulaire = this.formBuilder.group({
      recette: ['', Validators.required],
      recipeCategories: ['', Validators.required]
    });
  }

  initRecipes() {
    this.ApiCallService.GetResponse('recipes').subscribe(
      (recipe) => {
        this.allRecipes = recipe;
      }
    );
  }

  initCategories() {
    this.ApiCallService.GetResponse('categories').subscribe(
      (categorie) => {
        this.allCategories = categorie;
      }
    );
  }

  enregistrer() {
    if (this.formulaire && this.formulaire.valid) {
      const selectedRecipeName = this.formulaire.value.recette;
      const selectedRecipe = this.allRecipes.find(recipe => recipe.title === selectedRecipeName);

      if (selectedRecipe) {
        const selectedRecipeId = selectedRecipe.id;
        const selectedCategoryName = this.formulaire.value.recipeCategories;
        const selectedCategory = this.allCategories.find(category => category.name === selectedCategoryName);

        if (selectedCategory) {
          const selectedCategoryId = selectedCategory.id;
          const formData = {
            recette: selectedRecipeId,
            recipeCategories: selectedCategoryId,
          };

          this.http.post(`${environment.baseApiUrl}/recipes/${selectedRecipeId}/categories/${selectedCategoryId}/recipecategories`, formData).subscribe((response) => {
            this.router.navigate(['/ajout-ingredient']);
          });
        }
      }
    }
  }
}
