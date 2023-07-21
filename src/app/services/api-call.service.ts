import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiCallService {
  constructor(private httpClient: HttpClient) {}

  public GetRecipes(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/recipes');
  }
}
