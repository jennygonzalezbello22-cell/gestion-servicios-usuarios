import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  selectedUsuario: Usuario = {
    nombre: '',
    email: '',
    password: ''
  };

  constructor(public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  guardarUsuario() {
    if (this.selectedUsuario.id) {
      this.usuarioService.updateUsuario(this.selectedUsuario).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al actualizar usuario:', err)
      });
    } else {
      this.usuarioService.createUsuario(this.selectedUsuario).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.limpiarFormulario();
        },
        error: (err) => console.error('Error al registrar usuario:', err)
      });
    }
  }

  editarUsuario(usuario: Usuario) {
    this.selectedUsuario = { ...usuario };
  }

  eliminarUsuario(id: number | undefined) {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe({
        next: () => this.obtenerUsuarios(),
        error: (err) => console.error('Error al eliminar usuario:', err)
      });
    }
  }

  limpiarFormulario() {
    this.selectedUsuario = {
      nombre: '',
      email: '',
      password: ''
    };
  }
}