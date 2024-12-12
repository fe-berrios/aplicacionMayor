import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TallerService } from 'src/app/services/taller.service';

@Component({
  selector: 'app-mis-talleres',
  templateUrl: './mis-talleres.page.html',
  styleUrls: ['./mis-talleres.page.scss'],
})
export class MisTalleresPage implements OnInit {
  usuario: any = {}; // Usuario actual
  misTalleres: any[] = []; // Talleres donde está inscrito

  constructor(private tallerService: TallerService, private router: Router) {}

  ngOnInit() {
    // Obtener el usuario del localStorage una sola vez
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (!this.usuario || !this.usuario.rut) {
      console.error("No se encontró el usuario o el RUT no está definido.");
      return;
    }
  }

  async ionViewWillEnter() {
    // Cada vez que la página se carga o se muestra, actualiza los talleres
    if (!this.usuario || !this.usuario.rut) {
      console.error("No se encontró el usuario o el RUT no está definido.");
      return;
    }

    // Obtener talleres desde el servicio
    const talleres = await this.tallerService.getTalleres();

    // Filtrar talleres en los que está inscrito el usuario
    this.misTalleres = talleres.filter((taller: any) =>
      taller.alumnos.includes(this.usuario.rut)
    );

    if (this.misTalleres.length === 0) {
      console.warn("El usuario no está inscrito en ningún taller.");
    }
  }

  async abandonarTaller(id: number) {
    const taller = this.misTalleres.find(tal => tal.id === id);
    if (!taller) {
      console.error("Taller no encontrado");
      return;
    }

    // Remover al usuario del taller
    taller.alumnos = taller.alumnos.filter((rut: string) => rut !== this.usuario.rut);

    // Actualizar en el servicio
    await this.tallerService.updateTaller(taller.id, taller);

    // Actualizar lista de talleres
    this.misTalleres = this.misTalleres.filter(tal => tal.id !== id);

    alert(`Has abandonado el taller: ${taller.nombre}`);
  }

  volver() {
    this.router.navigate(['/home/perfil']); // Redirige a la página de perfil
  }
}
