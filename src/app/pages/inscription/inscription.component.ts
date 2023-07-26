import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {

  registerError: string = '';

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    pseudo: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    const email = this.registerForm.value.email || '';
    const password = this.registerForm.value.password || '';
    const pseudo = this.registerForm.value.pseudo || '';
    this.apiCallService
      .register(email, password, pseudo)
      .subscribe(
        {
          next: (response) => {
            const user = response;
            this.toastr.success("Votre compte est créé !");
            this.router.navigate(["connexion"]);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized
                || error.status === HttpStatusCode.BadRequest) {
              this.registerError = "Les identifiants sont incorrects";
            } else {
              this.registerError = "Une erreur survenue";
            }
          }
        }
      )
  }

}
