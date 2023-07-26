import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';

interface StepGroupValue {
  number: number;
  description: string;
}

@Component({
  selector: 'app-new-recette',
  templateUrl: './new-recette.component.html',
  styleUrls: ['./new-recette.component.scss']
})
export class NewRecetteComponent  implements OnInit {
  formulaire: FormGroup;
  allCategories: any[] =[];

  constructor(private formBuilder: FormBuilder,private http: HttpClient,private ApiCallService: ApiCallService) {
    this.formulaire = this.formBuilder.group({
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      budget: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      imageLink: ['', Validators.required],
      stepList: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    //this.initCategories();
    this.formulaire = this.formBuilder.group({
      title: ['', Validators.required],
      difficulty: ['', Validators.required],
      budget: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      imageLink: ['', Validators.required],
      stepList: this.formBuilder.array([]),
    });
  }

  /*initCategories(){
    this.ApiCallService.GetResponse('categories').subscribe(
      (categorie) => {
        this.allCategories = categorie;
      }
    );
  }*/


  /*get recipeIngredient(): FormArray {
    return this.formulaire.get('recipeIngredient') as FormArray;
  }*/

  get stepList(): FormArray {
    return this.formulaire.get('stepList') as FormArray;
  }

  /*ajouterIngredient() {
    const nouvelIngredient = this.formBuilder.group({
      nom: ['', Validators.required],
      quantite: ['', Validators.required],
      unite: ['', Validators.required]
    });

    this.recipeIngredient.push(nouvelIngredient);
  }

  supprimerIngredient(index: number) {
    this.recipeIngredient.removeAt(index);
  }*/

  ajouterEtape() {
    const nouvelleEtape = this.formBuilder.group({
      number: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.stepList.push(nouvelleEtape);
  }

  supprimerEtape(index: number) {
    this.stepList.removeAt(index);
  }

  enregistrer() {
    if (this.formulaire && this.formulaire.valid) {
      const formData = {
        title: this.formulaire.value.title,
        difficulty: this.formulaire.value.difficulty,
        budget: this.formulaire.value.budget,
        prepTime: this.formulaire.value.prepTime,
        cookTime: this.formulaire.value.cookTime,
        imageLink: this.formulaire.value.imageLink,
        stepList: [] as StepGroupValue[]
      };
  

      /*const selectedCategoryId = this.formulaire.value.recipeCategories;
      const selectedCategory = this.allCategories.find(category => category.id == selectedCategoryId);
  
      if (selectedCategory) {
        formData.recipeCategories = {
          id: selectedCategory.id,
          name: selectedCategory.name
        };
      }*/
  
      const stepsFormArray = this.formulaire.get('stepList') as FormArray;
      for (const stepGroup of stepsFormArray.controls) {
        formData.stepList.push({
          number: stepGroup.value.number,
          description: stepGroup.value.description
        });
      }
  
      console.log(formData);
      this.http.post("http://localhost:8080/recipes", formData).subscribe((response) => console.table(response));
    }
  }
}
