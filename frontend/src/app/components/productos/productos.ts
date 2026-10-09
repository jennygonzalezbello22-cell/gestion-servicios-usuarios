import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos: Producto[] = [];
  selectedProducto: Producto = { nombre: '', categoria: 'Producto', precio: 0, stock: 0, descripcion: '' };

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe(res => this.productos = res);
  }

  saveProducto(): void {
    if (this.selectedProducto._id) {
      this.productoService.updateProducto(this.selectedProducto).subscribe(() => {
        this.resetForm();
        this.getProductos();
      });
    } else {
      this.productoService.createProducto(this.selectedProducto).subscribe(() => {
        this.resetForm();
        this.getProductos();
      });
    }
  }

  editProducto(producto: Producto): void {
    this.selectedProducto = { ...producto };
  }

  deleteProducto(id?: string): void {
    if (id && confirm('¿Desea eliminar este registro?')) {
      this.productoService.deleteProducto(id).subscribe(() => this.getProductos());
    }
  }

  resetForm(): void {
    this.selectedProducto = { nombre: '', categoria: 'Producto', precio: 0, stock: 0, descripcion: '' };
  }
}