import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  public recipeInput: any;
  public recipeResponse: any;
  public query = 'nothing';
  public status = 'notready';
  constructor(private ApiCallService: ApiCallService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.query = params['query'];
      this.initRecipe(this.query);
    });
  }

  onSubmit(): void {
    if (this.recipeInput && this.recipeInput != 'nothing') {
      const apiRoute = `/recherche/${encodeURIComponent(this.recipeInput)}`;
      this.router.navigateByUrl(apiRoute);
    }
  }

  initRecipe(query: any) {
    this.ApiCallService.GetResponse(`recipes/both/containing/${query}`).subscribe((data: any) => {
      this.status = 'ready';
      this.recipeResponse = data;
    });
  }
}
