import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiCallService {
  constructor(private httpClient: HttpClient) {}

  public GetResponse(customURI: string): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + `/${customURI}`);
  }

  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password,
    }
    return this.httpClient
      .post<User>(environment.apiUrl + '/users/login', formData);
  }

  register(email: string, password: string, pseudo: string) {
    const formData = {
      email: email,
      password: password,
      pseudo: pseudo,
    }
    return this.httpClient
      .post<User>(environment.apiUrl + '/users/register', formData);
  }


}
