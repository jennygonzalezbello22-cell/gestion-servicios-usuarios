import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private URL_API = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.URL_API);
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(this.URL_API, producto);
  }

  updateProducto(producto: Producto): Observable<any> {
    return this.http.put(`${this.URL_API}/${producto.id}`, producto);
  }

  deleteProducto(id: number): Observable<any> {
    return this.http.delete(`${this.URL_API}/${id}`);
  }
}