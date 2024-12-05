import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {};
  talleres: any[] = [];
  talleresUsuario: any[] = [];
  mostrarPerfil: boolean = true;
  editandoPerfil: boolean = false; // Controla si se está editando el perfil

  constructor(private router: Router) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const talleresGuardados = localStorage.getItem('talleres');
    if (talleresGuardados) {
      this.talleres = JSON.parse(talleresGuardados);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  verMisTalleres() {
    this.talleresUsuario = this.talleres.filter(taller => taller.alumnos.includes(this.usuario.rut));
    this.mostrarPerfil = false;
  }

  volver() {
    this.mostrarPerfil = true;
    this.editandoPerfil = false;
  }

  abandonarTaller(tallerId: number) {
    const taller = this.talleres.find(t => t.id === tallerId);
    if (taller) {
      taller.alumnos = taller.alumnos.filter((rut: any) => rut !== this.usuario.rut);
      localStorage.setItem('talleres', JSON.stringify(this.talleres));
      this.verMisTalleres();
      alert(`Has abandonado el taller: ${taller.nombre}`);
    }
  }

  eliminarPerfil() {
    if (confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    }
  }

  mostrarEditarPerfil() {
    this.editandoPerfil = true;
  }

  guardarPerfil() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario));
    alert('Perfil actualizado correctamente.');
    this.editandoPerfil = false;
  }

  cancelarEditarPerfil() {
    this.editandoPerfil = false;
  }
}
