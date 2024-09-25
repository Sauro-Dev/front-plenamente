import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Método para login y guardar el token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // Guardamos el token en localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Método para obtener usuarios desde el backend
  getUsers(): Observable<any[]> {
    const token: string | null = localStorage.getItem('token');  // Obtiene el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });  // Corrige la opción `headers`
  }

  // Método para obtener un usuario por su ID
  getUserDetails(userId: number): Observable<any> {
    const token: string | null = localStorage.getItem('token'); // Obtiene el token de localStorage
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers });
  }

}
