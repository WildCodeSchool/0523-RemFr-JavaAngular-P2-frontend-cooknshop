import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

interface StepGroupValue {
  number: number;
  description: string;
}

@Component({
  selector: 'app-new-recette',
  templateUrl: './new-recette.component.html',
  styleUrls: ['./new-recette.component.scss']
})
export class NewRecetteComponent implements OnInit {
  formulaire: FormGroup;
  allCategories: any[] = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private ApiCallService: ApiCallService, private router: Router) {
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

  get stepList(): FormArray {
    return this.formulaire.get('stepList') as FormArray;
  }

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
      const prepTimeH = (this.formulaire.value.prepTime / 60);
      const cookTimeH = (this.formulaire.value.cookTime / 60);
      const formData = {
        title: this.formulaire.value.title,
        difficulty: this.formulaire.value.difficulty,
        budget: this.formulaire.value.budget,
        prepTime: prepTimeH,
        cookTime: cookTimeH,
        imageLink: this.formulaire.value.imageLink,
        stepList: [] as StepGroupValue[]
      };

      const stepsFormArray = this.formulaire.get('stepList') as FormArray;
      for (const stepGroup of stepsFormArray.controls) {
        formData.stepList.push({
          number: stepGroup.value.number,
          description: stepGroup.value.description
        });
      }

      this.http.post(environment.apiUrl + "/recipes", formData).subscribe((response) => {
        this.router.navigate(['/ajout-categorie']);
      });
    }
  }
}
