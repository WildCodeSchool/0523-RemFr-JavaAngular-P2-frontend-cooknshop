import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-recette',
  templateUrl: './details-recette.component.html',
  styleUrls: ['./details-recette.component.scss'],
})
export class DetailsRecetteComponent {
  public status = 'notready';
  public myRecipe: any;
  public allIngredients: any;
  public id = 0;
  public utilisateur: any;
  public cartId: any;
  public recetteAjouteeAuPanier = false;
  @ViewChild('nbPersonnesInput', { static: false }) nbPersonnesInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private apiCallService: ApiCallService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    const userData = localStorage.getItem('user');
    this.utilisateur = userData ? JSON.parse(userData) : null;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.initRecipe(this.id);
    });
  }

  initRecipe(myid: any) {
    this.apiCallService.GetResponse(`recipes/${myid}`).subscribe((data: any) => {
      this.status = 'ready';
      this.myRecipe = data;
    });
  }

  ajouterRecetteAuPanierUtilisateur() {
    if (this.utilisateur != null) {
      const idUtilisateur = this.utilisateur.id;

      this.apiCallService.GetResponse(`cart/user/${idUtilisateur}`).subscribe(
        (donneesUtilisateur: any) => {
          const idPanier = donneesUtilisateur;
          const nbPersonnes = this.nbPersonnesInputRef.nativeElement.value;
          this.http
            .post(environment.apiUrl + `/cart/${idPanier}/addRecipe/${this.id}?nb_person=${nbPersonnes}`, {})
            .subscribe(
              (reponse: any) => {
                this.toastr.success('Recette ajoutée au panier avec succès !');
                this.recetteAjouteeAuPanier = true;
              },
              (erreur: any) => {
                this.toastr.error("Erreur lors de l'ajout de la recette au panier");
              }
            );
        },
        (erreur: any) => {
          this.toastr.error("Erreur lors de la récupération des informations de l'utilisateur");
        }
      );
    } else {
      this.toastr.error("Erreur lors de la récupération des informations de l'utilisateur");
      this.router.navigate(['connexion']);
    }
  }
}
