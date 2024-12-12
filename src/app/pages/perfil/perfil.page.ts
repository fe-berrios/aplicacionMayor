import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};
  mostrarPerfil: boolean = true;
  editandoPerfil: boolean = false; // Controla si se está editando el perfil

  constructor(private router: Router) {}

  ngOnInit() {
    // Carga el usuario desde el localStorage
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  eliminarPerfil() {
    if (confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    }
  }

  mostrarEditarPerfil() {
    this.editandoPerfil = true; // Muestra la vista de edición

    // Espera un momento para asegurarse de que la tarjeta esté visible
    setTimeout(() => {
      const editarPerfilCard = document.getElementById('editarPerfilCard');
      if (editarPerfilCard) {
        editarPerfilCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Retraso breve para garantizar la renderización
  }

  guardarPerfil() {
    // Validaciones básicas
    if (!this.usuario.nombre || !this.usuario.apellido || !this.usuario.correo || !this.usuario.telefono) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Actualiza el perfil en el localStorage
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    alert('Perfil actualizado correctamente.');

    // Cambia de vista
    this.mostrarPerfil = true;
    this.editandoPerfil = false;
  }

  cancelarEditarPerfil() {
    // Cancela la edición y recarga los datos originales
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.editandoPerfil = false;
  }

  verMisTalleres() {
    this.router.navigate(['/home/mis-talleres']); // Navega a la página de Mis Talleres
  }
}
