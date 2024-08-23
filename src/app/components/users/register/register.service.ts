import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/users/register`;

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
