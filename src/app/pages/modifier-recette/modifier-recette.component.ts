import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';

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
    /*this.formulaire = this.formBuilder.group({
      recette: ['', Validators.required],
      recipeIngredient: this.formBuilder.array([]),
    });*/
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
      const formData = [];
  
      const recipeId = this.formulaire.value.recette;
  
      const ingredientsFormArray = this.formulaire.get('recipeIngredient') as FormArray;
      for (const ingredientGroup of ingredientsFormArray.controls) {
        const quantity = ingredientGroup.get('quantite')?.value;
        const unitId = ingredientGroup.get('unite')?.value;
        const ingredientId = ingredientGroup.get('nom')?.value;
  
        const ingredientData = {
          quantity: quantity,
          recipe: recipeId,
          unit: { id: unitId },
          ingredient: { id: ingredientId }
        };
  
        formData.push(ingredientData);
      }
  
      console.log(formData);
  
      const url = `http://localhost:8080/recipes/${recipeId}/ingredients`;
      this.http.post(url, formData).subscribe((response) => {
        console.table(response);
        this.router.navigate([`/details-recette/${recipeId}`]);
      });
    }
  }
}