import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  readonly URL_API = 'http://localhost:3000/api/productos';

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL_API);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.URL_API, producto);
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.URL_API}/${producto._id}`, producto);
  }

  deleteProducto(_id: string): Observable<any> {
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}