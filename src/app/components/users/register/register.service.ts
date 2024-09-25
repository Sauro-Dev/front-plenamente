import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';
import { RegisterUser } from './register-user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/users/register`;

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterUser): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}