import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { ApiCallService } from 'src/app/services/api-call.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

  loginError: string = '';

  loginForm = this.fb.group({
    email: [`${environment.email}` || '', [Validators.required, Validators.email]],
    password: [`${environment.password}` || '', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private apiCallService: ApiCallService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.loginForm.value);
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';
    localStorage.removeItem('user');
    this.apiCallService
      .login(email, password, 'users/login')
      .subscribe(
        {
          next: (response) => {
            const user = new User(response.id, response.email, '', response.pseudo) ;
            localStorage.setItem('user', JSON.stringify(user));
            this.toastr.success("Vous êtes connecté !");
            this.router.navigate([""]);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === HttpStatusCode.Unauthorized
                || error.status === HttpStatusCode.BadRequest) {
              this.toastr.warning("Les identifiants sont incorrects");
            } else {
              this.toastr.error("Une erreur survenue");
            }
          }
        }
      )
  }

}
