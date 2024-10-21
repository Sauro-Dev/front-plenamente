import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // Método para login y guardar el token
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (this.isBrowser()) {
          // Guardamos el token en localStorage solo si estamos en el navegador
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  // Método para obtener usuarios desde el backend
  getUsers(): Observable<any[]> {
    const token = this.getToken();  // Obtiene el token de forma más directa
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/all`, { headers });
  }

  // Método para obtener un usuario por su ID
  getUserDetails(userId: number): Observable<any> {
    const token = this.getToken();  // Obtiene el token de forma más directa
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/select/${userId}`, { headers });
  }

  // Método para verificar si el usuario está logeado
  isLoggedIn(): boolean {
    const token = this.getToken();  // Verifica si existe un token
    return !!token;  // Devuelve true si el token existe, de lo contrario false
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Remueve el token del almacenamiento
  }

  // Obtiene el token almacenado en el localStorage
  private getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Método para verificar si estamos en el navegador o no
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
