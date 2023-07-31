import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panier-recettes',
  templateUrl: './panier-recettes.component.html',
  styleUrls: ['./panier-recettes.component.scss'],
})
export class PanierRecettesComponent implements OnInit {
  public status = 'notready';
  public myCart: any;
  public utilisateur: any;
  constructor(
    private http: HttpClient,
    private ApiCallService: ApiCallService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {
    const userData = localStorage.getItem('user');
    this.utilisateur = userData ? JSON.parse(userData) : null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.initCart();
    });
    if (this.utilisateur != null) {
      const idUtilisateur = this.utilisateur.id;
    } else {
      this.toastr.error("Erreur, vous n'êtes pas connecté");
      this.router.navigate(['connexion']);
    }
  }

  initCart() {
    const idUser = this.utilisateur.id;
    this.ApiCallService.GetResponse(`cart/user/${idUser}`).subscribe((donneesUtilisateur: any) => {
      const idPanier = donneesUtilisateur;
      this.ApiCallService.GetResponse(`cart/${idPanier}`).subscribe((data: any) => {
        this.myCart = data;
        this.status = 'ready';
      });
    });
  }
  supprimerRecetteDuPanier(recipeId: number) {
    if (this.utilisateur) {
      const idUtilisateur = this.utilisateur.id;

      this.ApiCallService.GetResponse(`cart/user/${idUtilisateur}`).subscribe(
        (donneesUtilisateur: any) => {
          const idPanier = donneesUtilisateur;

          this.http.delete(environment.apiUrl + `/cart/${idPanier}/recipe/${recipeId}`).subscribe(
            () => {
              this.initCart();
              this.toastr.success('La recette a été supprimée du panier avec succès !');
            },
            (erreur: any) => {
              this.toastr.error('Erreur lors de la suppression de la recette du panier');
            }
          );
        },
        (erreur: any) => {
          this.toastr.error("Erreur lors de la récupération des informations de l'utilisateur");
        }
      );
    }
  }

  genererShoppingList() {
    if (this.utilisateur) {
      const userId = this.utilisateur.id;

      this.http.post(environment.apiUrl + `/shoppinglists/${userId}`, "")
      .subscribe(
        {
          next: () => {
            this.router.navigate([environment.apiUrl + '/liste-courses'])
            this.toastr.success("La liste de course a bien été créée");
            },
          error: () => {
              this.toastr.warning("Erreur lors lors de la création de la liste de course");
            }
        }
      );
      }
  }
}
