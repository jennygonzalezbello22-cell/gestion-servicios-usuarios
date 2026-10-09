import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject(HttpClient);
  readonly URL_API = 'http://localhost:3000/api/usuarios';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.URL_API, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<any> {
    return this.http.put(`${this.URL_API}/${usuario._id}`, usuario);
  }

  deleteUsuario(_id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}