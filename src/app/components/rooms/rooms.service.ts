import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';// Asegúrate de tener un modelo Room
import { Room } from './room';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = `${environment.apiUrl}/rooms`; // Suponiendo que apiUrl está configurado

  constructor(private http: HttpClient) { }

  // Método para registrar una sala
  registerRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiUrl}/register`, room);
  }

  // Método para obtener la lista de ambientes
  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}
