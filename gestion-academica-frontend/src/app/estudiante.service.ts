import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Estudiante {
  cedula: string;
  nombre: string;
  apellido: string;
  nivel: number;
  rol?: string;
}

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private apiUrl = 'http://localhost:3000/api/estudiantes';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  getPorCedula(cedula: string): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${cedula}`);
  }

  actualizar(cedula: string, data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.apiUrl}/${cedula}`, data);
  }
} 