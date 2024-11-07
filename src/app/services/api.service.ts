import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAnatomy, IAnatomySection } from '../models/anatomy.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private urlBase = 'http://localhost:8080';  // Cambia a la URL base de tu API

  constructor(private http: HttpClient) { }

  getRecursos(): Observable<IAnatomy[]> {
    return this._http.get<IAnatomy[]>(`${this.urlBase}/get_recursos.php`);
  }

  getRecurso(id: number): Observable<IAnatomy> {
    return this._http.get<IAnatomy>(`${this.urlBase}/get_recursos.php?id=${id}`);
  }

  getSeccionesAnatomicas(): Observable<IAnatomySection[]> {
    return this._http.get<IAnatomySection[]>(`${this.urlBase}/get_anatomy_sections.php`);
  }

  getRecursosBySeccion(seccionId: number): Observable<IAnatomy[]> {
    return this._http.get<IAnatomy[]>(`${this.urlBase}/get_recursos.php?seccion_id=${seccionId}`);
  }
}
