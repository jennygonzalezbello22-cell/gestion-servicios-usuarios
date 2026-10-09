import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './components/usuarios/usuarios';
import { ProductosComponent } from './components/productos/productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UsuariosComponent, ProductosComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  activeTab: 'usuarios' | 'productos' = 'usuarios';
}

export { AppComponent as App };