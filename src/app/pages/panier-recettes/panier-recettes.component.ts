import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panier-recettes',
  templateUrl: './panier-recettes.component.html',
  styleUrls: ['./panier-recettes.component.scss'],
})
export class PanierRecettesComponent implements OnInit {
  public status = 'notready';
  public myCart: any;
  public id = 0;
  constructor(private ApiCallService: ApiCallService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = 1; // TODO: no user for now so using 1 instead of : this.id = params['id'];
      this.initCart(this.id);
    });
  }

  initCart(myid: any) {
    this.ApiCallService.GetResponse(`cart/${myid}`).subscribe((data: any) => {
      this.myCart = data;
      this.status = 'ready';
    });
  }
}
