import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAnatomy } from '../models/anatomy.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  // private urlBase = 'http://localhost/get_recursos.php';  // Cambia a la URL de tu API si es en la nube
  private urlBase = 'http://localhost:8080/get_recursos.php';

  constructor(private http: HttpClient) {}

  getRecursos(): Observable<IAnatomy[]> {
    return this._http.get<IAnatomy[]>(this.urlBase);
  }

  getRecurso(id: number):Observable<IAnatomy>{
    // return this._http.get<IAnatomy>(`${this.urlBase}/${id}`);
    return this._http.get<IAnatomy>(`${this.urlBase}?id=${id}`);
  }

}
