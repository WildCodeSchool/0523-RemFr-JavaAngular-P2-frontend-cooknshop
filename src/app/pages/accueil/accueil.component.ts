import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  public status = 'notready';
  public allRecipes: any;
  public allCategories: string[] = [];
  constructor(private ApiCallService: ApiCallService) {}
  ngOnInit(): void {
    this.initRecipes();
  }

  initRecipes() {
    this.ApiCallService.GetResponse('recipes').subscribe((data: any) => {
      this.allRecipes = data;
      this.status = 'ready';
      for (let i = 0; i < data.length; i++) {
        if (data[i].recipeCategories[0].id != undefined && data[i].recipeCategories[0].name != undefined) {
          const key = data[i].recipeCategories[0].id;
          const value = data[i].recipeCategories[0].name;
          this.allCategories[key] = value;
        }
        if (data[i].recipeCategories[0].name == undefined) {
          data[i].recipeCategories[0] = {
            id: data[i].recipeCategories[0],
            name: this.allCategories[data[i].recipeCategories[0]],
          };
        }
      }
    });
  }
}
