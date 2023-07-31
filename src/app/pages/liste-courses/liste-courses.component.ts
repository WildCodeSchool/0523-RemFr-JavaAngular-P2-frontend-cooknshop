import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-liste-courses',
  templateUrl: './liste-courses.component.html',
  styleUrls: ['./liste-courses.component.scss']
})
export class ListeCoursesComponent {
  public status = 'notready';
  public myListeCourses: any;
  public myShoppingList: any;
  public shoppingListId: any;
  public user: any;
  public ingredients: any[] = [];
  units: any[] = [];

  // ingredientForm = this.fb.group({
  //   id: [''],
  //   purchased: [false],
  //   quantity: [''],
  //   ingredient: this.fb.group({
  //     id: [''],
  //   }),
  //   unit: this.fb.group({
  //     id: [''],
  //   })
  // })

  constructor(
    private http: HttpClient,
    private ApiCallService: ApiCallService,
    private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router,
    private fb: FormBuilder)
    {
      const userData = localStorage.getItem('user');
      this.user = userData ? JSON.parse(userData) : null;
    }

  ngOnInit(): void {
    this.shoppingListId = this.route.snapshot.paramMap.get("id");
    console.log(this.shoppingListId);

    if (this.shoppingListId) {
      this.initShoppingList(parseInt(this.shoppingListId));
    } else {
      this.route.params.subscribe((params) => {
        this.initList();
      });
      if (this.user != null) {
        const userId = this.user.id;
      }
      else {
        this.toastr.error("Attention, vous devez connecté pour la visualiser");
        this.router.navigate(["connexion"]);
      }
      this.initIngredients;
      this.initUnits;
    }
  }

  initShoppingList(shoppingListId: number) {
    this.ApiCallService.GetResponse(`shoppinglists/${shoppingListId}/shared`)
    .subscribe(
      {
        next: (data: any) => {
          this.myShoppingList = data;
          if (this.myShoppingList.shared) {
            this.ApiCallService.GetResponse(`shoppinglists/${parseInt(this.shoppingListId)}/ingredients`).subscribe((data: any) => {
              this.myListeCourses = data;
            })
          } else {
            if (this.user === null) {
              this.toastr.warning("Cette liste de course n'est pas accessible");
            }
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

  initList() {
    this.ApiCallService.GetResponse(`shoppinglists/${this.user.id}`).subscribe((data: any) => {
      this.myListeCourses = data;
      this.initShoppingList(this.myListeCourses[0].shoppingListIngredient.id)
      this.status = 'ready';
    })
  }

  initUser() {
    this.ApiCallService.GetResponse(`users/${this.user.id}`).subscribe((data: any) => {
      this.user = data;
    })
  }

  initIngredients() {
    this.ApiCallService.GetResponse('ingredients').subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      }
    );
  }
  initUnits() {
    this.ApiCallService.GetResponse('units').subscribe(
      (units) => {
        this.units = units;
      }
    );
  }

  // submit() {
  //   console.log("Form Submitted")
  //   console.log(this.ingredientForm.value)
  // }

  togglePurchased(rowId: number, purchased: boolean){
    const ingredient = this.myListeCourses.find((ingredient: any) => ingredient.id === rowId)
    ingredient.purchased = !purchased;

    this.http.put(`${environment.baseApiUrl}/shoppinglists/ingredients/${rowId}`, ingredient)
    .subscribe(
      {
        next: () => {
          this.initList();
          },
        error: () => {
            this.toastr.warning("Erreur lors du changement de purchased");
          }
      }
    );
  }

  deleteIngredient(rowId: number) {

    this.http.delete(`${environment.baseApiUrl}/shoppinglists/ingredients/${rowId}`)
    .subscribe(
      {
        next: () => {
          this.initList();
          this.toastr.success("L'ingrédient a été supprimé de la liste de courses !");
          },
        error: () => {
            this.toastr.warning("Erreur lors de la suppression de la recette du panier");
          }
      }
    );
  }

  toggleShared(shared: boolean){
    this.myShoppingList.shared = !shared
    console.log(this.myShoppingList.shared);

    this.http.put(`${environment.baseApiUrl}/shoppinglists/shared/${this.myShoppingList.id}`,
    this.myShoppingList)
    .subscribe(
      {
        next: () => {
          if (this.myShoppingList.shared) {
            this.toastr.success(`La liste de course est accessible à l'adresse http://localhost/liste-courses/${this.myShoppingList.id}`);
          } else {
            this.toastr.warning("La liste de course n'est plus accessible");
          }
          this.initList();
          },
        error: () => {
            this.toastr.warning("Erreur lors du changement de shared");
          }
      }
    );
  }
}
