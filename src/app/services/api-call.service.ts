import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class ApiCallService {
  constructor(private httpClient: HttpClient) {}

  public GetResponse(customURI: string): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/${customURI}`);
  }

  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password,
    }
    return this.httpClient
      .post<User>('http://localhost:8080/users/login', formData);
  }

  register(email: string, password: string, pseudo: string) {
    const formData = {
      email: email,
      password: password,
      pseudo: pseudo,
    }
    return this.httpClient
      .post<User>('http://localhost:8080/users/register', formData);
  }


}
