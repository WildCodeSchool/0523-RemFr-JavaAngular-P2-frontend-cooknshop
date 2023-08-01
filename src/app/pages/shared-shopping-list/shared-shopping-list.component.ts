import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shared-shopping-list',
  templateUrl: './shared-shopping-list.component.html',
  styleUrls: ['./shared-shopping-list.component.scss']
})
export class SharedShoppingListComponent {

  public status = 'notready';
  public myListeCourses: any;
  public myShoppingList: any;
  public shoppingListId: any;
  public user: any;
  public ingredients: any[] = [];
  units: any[] = [];

  constructor(
    private http: HttpClient,
    private ApiCallService: ApiCallService,
    private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router
    ) {}

  ngOnInit(): void {
    this.shoppingListId = this.route.snapshot.paramMap.get("id");
    this.shoppingListId = parseInt(this.shoppingListId);
    this.initShoppingList();
  }

  initShoppingList() {
    this.ApiCallService.GetResponse(`shoppinglists/${this.shoppingListId}/shared`)
    .subscribe(
      {
        next: (data: any) => {
          this.myShoppingList = data;
          if (this.myShoppingList.shared) {
            this.ApiCallService.GetResponse(`shoppinglists/${this.shoppingListId}/ingredients`).subscribe((data: any) => {
              this.myListeCourses = data;
            })
          } else {
            this.toastr.warning("Cette liste de course n'est pas accessible");
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound
              || error.status === HttpStatusCode.BadRequest) {
            this.toastr.warning("Cette liste de course n'existe pas");
          } else {
            this.toastr.error("Une erreur survenue");
          }
        }
      }
    )
  }

  togglePurchased(rowId: number, purchased: boolean){
    const ingredient = this.myListeCourses.find((ingredient: any) => ingredient.id === rowId)
    ingredient.purchased = !purchased;

    this.http.put(`${environment.apiUrl}/shoppinglists/ingredients/${rowId}`, ingredient)
    .subscribe(
      {
        next: () => {
          // this.initShoppingList();
          },
        error: () => {
            this.toastr.warning("Erreur lors du changement de purchased");
          }
      }
    );
  }


}

