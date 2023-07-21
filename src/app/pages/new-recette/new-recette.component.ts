import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-recette',
  templateUrl: './new-recette.component.html',
  styleUrls: ['./new-recette.component.scss']
})
export class NewRecetteComponent  implements OnInit {
  formulaire: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formulaire = this.formBuilder.group({
      titre: ['', Validators.required],
      difficulty: ['', Validators.required],
      budget: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      imageLink: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.formulaire = this.formBuilder.group({
      titre: ['', Validators.required],
      difficulty: ['', Validators.required],
      budget: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      imageLink: ['', Validators.required],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([])
    });
  }

  get ingredients(): FormArray {
    return this.formulaire.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.formulaire.get('instructions') as FormArray;
  }

  ajouterIngredient() {
    const nouvelIngredient = this.formBuilder.group({
      nom: ['', Validators.required],
      quantite: ['', Validators.required],
      unite: ['', Validators.required]
    });

    this.ingredients.push(nouvelIngredient);
  }

  supprimerIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  ajouterEtape() {
    const nouvelleEtape = this.formBuilder.group({
      numero: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.instructions.push(nouvelleEtape);
  }

  supprimerEtape(index: number) {
    this.instructions.removeAt(index);
  }

  enregistrer() {
    if (this.formulaire && this.formulaire.valid) {
      // Récupérer les données du formulaire
      const titre = this.formulaire.get('titre')?.value;
      const difficulty = this.formulaire.get('difficulty')?.value;
      const budget = this.formulaire.get('budget')?.value;
      const prepTime = this.formulaire.get('prepTime')?.value;
      const cookTime = this.formulaire.get('cookTime')?.value;
      const imageLink = this.formulaire.get('imageLink')?.value;
      const ingredients = this.formulaire.get('ingredients')?.value;
      const instructions = this.formulaire.get('instructions')?.value;
  
      // Faire quelque chose avec les données (par exemple, les envoyer à un service)
      console.log(titre, difficulty, budget, prepTime, cookTime, imageLink, ingredients, instructions);
    }
  }
}
