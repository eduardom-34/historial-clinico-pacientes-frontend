import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Sesion } from '../interfaces/sesion';
import { Login } from '../interfaces/login';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = environment.apiUrl + "Usuario/"

  constructor( private http: HttpClient) { }

  iniciarSesion( request: Login ): Observable<Sesion>{
    return this.http.post<Sesion>(`${this.baseUrl}login`,request);
  }
}
