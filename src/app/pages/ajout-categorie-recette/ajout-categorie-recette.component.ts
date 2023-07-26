import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-ajout-categorie-recette',
  templateUrl: './ajout-categorie-recette.component.html',
  styleUrls: ['./ajout-categorie-recette.component.scss']
})
export class AjoutCategorieRecetteComponent {
  formulaire: FormGroup;
  allRecipes: any[] = [];
  allCategories: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private ApiCallService: ApiCallService) {
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
      const formData = {
        recette: this.formulaire.value.recette,
        recipeCategories: this.formulaire.value.recipeCategories,
      };
      console.log(formData);
      this.http.post(`http://localhost:8080/recipes/${this.formulaire.value.recette}/categories/${this.formulaire.value.recipeCategories}/recipecategories`, formData).subscribe((response) => console.table(response));
    }
  }
}
