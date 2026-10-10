import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[] = [];
  
  // Modelo para el formulario
  selectedProducto: Producto = {
    nombre: '',
    categoria: '',
    precio: 0,
    stock: 0,
    descripcion: ''
  };

  constructor(public productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe({
      next: (res) => {
        this.productos = res;
      },
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  guardarProducto() {
    if (this.selectedProducto.id) {
      // Actualizar
      this.productoService.updateProducto(this.selectedProducto).subscribe({
        next: () => {
          this.obtenerProductos();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // Crear nuevo
      this.productoService.createProducto(this.selectedProducto).subscribe({
        next: () => {
          this.obtenerProductos();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al guardar:', err)
      });
    }
  }

  editarProducto(producto: Producto) {
    this.selectedProducto = { ...producto };
  }

  eliminarProducto(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => this.obtenerProductos(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  limpiarFormulario() {
    this.selectedProducto = {
      nombre: '',
      categoria: '',
      precio: 0,
      stock: 0,
      descripcion: ''
    };
  }
}