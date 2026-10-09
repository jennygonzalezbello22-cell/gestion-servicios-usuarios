import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html'
})
export class UsuariosComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  usuarios: Usuario[] = [];
  selectedUsuario: Usuario = { nombre: '', email: '', password: '', rol: 'Cliente' };

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((res: Usuario[]) => this.usuarios = res);
  }

  saveUsuario(): void {
    if (this.selectedUsuario._id) {
      this.usuarioService.updateUsuario(this.selectedUsuario).subscribe(() => {
        this.resetForm();
        this.getUsuarios();
      });
    } else {
      this.usuarioService.createUsuario(this.selectedUsuario).subscribe(() => {
        this.resetForm();
        this.getUsuarios();
      });
    }
  }

  editUsuario(usuario: Usuario): void {
    this.selectedUsuario = { ...usuario };
  }

  deleteUsuario(id?: string): void {
    if (id && confirm('¿Desea eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => this.getUsuarios());
    }
  }

  resetForm(): void {
    this.selectedUsuario = { nombre: '', email: '', password: '', rol: 'Cliente' };
  }
}