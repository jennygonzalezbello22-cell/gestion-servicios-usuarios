import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.URL_API, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.URL_API}/${usuario.id}`, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}