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
  public myList: any;
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

  initList() {
    this.ApiCallService.GetResponse(`shoppinglists/${this.user.id}`).subscribe((data: any) => {
      this.myList = data;
      this.status = 'ready';
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
    const ingredient = this.myList.find((ingredient: any) => ingredient.id === rowId)
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
}
