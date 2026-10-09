export interface Producto {
  _id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
}