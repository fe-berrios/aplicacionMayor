import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = {}; // Objeto para almacenar datos del usuario
  talleres: any[] = []; // Todos los talleres disponibles
  talleresUsuario: any[] = []; // Talleres en los que está inscrito el usuario
  mostrarPerfil: boolean = true; // Controla qué card mostrar

  constructor(private router: Router) {}

  ngOnInit() {
    // Rescatar el usuario del localStorage
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Rescatar los talleres del localStorage
    const talleresGuardados = localStorage.getItem('talleres');
    if (talleresGuardados) {
      this.talleres = JSON.parse(talleresGuardados);
    }

    console.log('Datos del usuario:', this.usuario);
  }

  cerrarSesion() {
    // Limpia el localStorage
    localStorage.removeItem('usuario');

    // Redirige al login o página inicial
    this.router.navigate(['/login']);
  }

  verMisTalleres() {
    // Filtrar los talleres en los que está inscrito el usuario
    this.talleresUsuario = this.talleres.filter(taller => taller.alumnos.includes(this.usuario.rut));
    this.mostrarPerfil = false; // Muestra la card de "Mis Talleres"
  }

  volver() {
    this.mostrarPerfil = true; // Muestra la card del perfil
  }

  abandonarTaller(tallerId: number) {
    // Encontrar el taller por su ID
    const taller = this.talleres.find(t => t.id === tallerId);
    if (taller) {
      // Eliminar el rut del usuario del array de alumnos, definiendo el tipo de 'rut' explícitamente
      taller.alumnos = taller.alumnos.filter((rut: any) => rut !== this.usuario.rut);
      // Actualizar el localStorage con los talleres modificados
      localStorage.setItem('talleres', JSON.stringify(this.talleres));
      // Actualizar la lista de talleres del usuario
      this.verMisTalleres();
      alert(`Has abandonado el taller: ${taller.nombre}`);
    } else {
      console.error('Taller no encontrado');
    }
  }
}
