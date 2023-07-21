import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public allRecipes: any;
  constructor(private ApiCallService: ApiCallService) {}
  ngOnInit(): void {
    this.initRecipes();
  }

  initRecipes() {
    this.ApiCallService.GetRecipes().subscribe((data: any) => {
      this.allRecipes = data;
      console.log(data);
    });
  }
}
