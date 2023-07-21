import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-recette',
  templateUrl: './details-recette.component.html',
  styleUrls: ['./details-recette.component.scss'],
})
export class DetailsRecetteComponent {
  public myRecipe: any;
  public allIngredients: any;
  public id = 0;
  constructor(private ApiCallService: ApiCallService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.initRecipe(this.id);
      this.initIngredients();
    });
  }

  initRecipe(myid: any) {
    this.ApiCallService.GetResponse(`recipes/${myid}`).subscribe((data: any) => {
      this.myRecipe = data;
      console.log(data);
    });
  }

  initIngredients() {
    this.ApiCallService.GetResponse(`ingredients`).subscribe((data: any) => {
      this.allIngredients = data;
      console.log(data);
    });
  }
}
