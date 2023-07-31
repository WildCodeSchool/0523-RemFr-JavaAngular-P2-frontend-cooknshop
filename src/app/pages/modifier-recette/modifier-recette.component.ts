import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-modifier-recette',
  templateUrl: './modifier-recette.component.html',
  styleUrls: ['./modifier-recette.component.scss']
})
export class ModifierRecetteComponent {
  formulaire: FormGroup;
  allRecipes: any[] = [];
  allIngredient: any[] = [];
  allUnits: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private ApiCallService: ApiCallService, private router: Router) {
    this.formulaire = this.formBuilder.group({
      recette: ['', Validators.required],
      recipeIngredient: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.initRecipes();
    this.initIngredients();
    this.initUnits();
  }

  initRecipes() {
    this.ApiCallService.GetResponse('recipes').subscribe(
      (recipe) => {
        this.allRecipes = recipe;
      }
    );
  }
  initIngredients() {
    this.ApiCallService.GetResponse('ingredients').subscribe(
      (ingredient) => {
        this.allIngredient = ingredient;
      }
    );
  }
  initUnits() {
    this.ApiCallService.GetResponse('units').subscribe(
      (unit) => {
        this.allUnits = unit;
      }
    );
  }

  get recipeIngredient(): FormArray {
    return this.formulaire.get('recipeIngredient') as FormArray;
  }

  ajouterIngredient() {
    const nouvelIngredient = this.formBuilder.group({
      nom: ['', Validators.required],
      quantite: ['', Validators.required],
      unite: ['', Validators.required]
    });

    this.recipeIngredient.push(nouvelIngredient);
  }

  supprimerIngredient(index: number) {
    this.recipeIngredient.removeAt(index);
  }

  enregistrer() {
    if (this.formulaire && this.formulaire.valid) {
      const selectedRecipeName = this.formulaire.value.recette;
      const selectedRecipe = this.allRecipes.find(recipe => recipe.title === selectedRecipeName);

      if (selectedRecipe) {
        const selectedRecipeId = selectedRecipe.id;
        const formData = [];
        const ingredientsFormArray = this.formulaire.get('recipeIngredient') as FormArray;
        for (const ingredientGroup of ingredientsFormArray.controls) {
          const quantity = ingredientGroup.get('quantite')?.value;
          const selectedIngredientName = ingredientGroup.get('nom')?.value;
          const selectedIngredient = this.allIngredient.find(ingredient => ingredient.name === selectedIngredientName);
          const selectedUnitName = ingredientGroup.get('unite')?.value;
          const selectedUnit = this.allUnits.find(unit => unit.name === selectedUnitName);

          if (selectedIngredient && selectedUnit) {
            const ingredientData = {
              quantity: quantity,
              recipe: selectedRecipeId,
              unit: { id: selectedUnit.id },
              ingredient: { id: selectedIngredient.id }
            };

            formData.push(ingredientData);
          }
        }
        const url = environment.apiUrl + `/recipes/${selectedRecipeId}/ingredients`;
        this.http.post(url, formData).subscribe((response) => {
          this.router.navigate([`/details-recette/${selectedRecipeId}`]);
        });
      }
    }
  }
}
