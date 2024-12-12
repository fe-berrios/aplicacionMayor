import { Component, OnInit } from '@angular/core';
import { TallerService } from 'src/app/services/taller.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: any = {}; // Usuario actual
  talleres: any[] = []; // Lista de talleres

  constructor(private tallerService: TallerService) {} // Inyecta el servicio

  async ngOnInit() {
    // Recuperar usuario del localStorage
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Obtener talleres del servicio
    this.talleres = await this.tallerService.getTalleres();
  }

  async unirTaller(id: number) {
    const taller = this.talleres.find(tal => tal.id === id);
    if (!taller) {
      console.error("Taller no encontrado");
      return;
    }
  
    // Verificar si el usuario ya está inscrito
    if (!taller.alumnos.includes(this.usuario.rut)) {
      taller.alumnos.push(this.usuario.rut); // Añadir al usuario al taller
  
      // Actualizar el taller en el IndexedDB
      await this.tallerService.updateTaller(taller.id, taller);
  
      console.log(`Te has unido al taller: ${taller.nombre}`);
      alert(`Te has unido al taller: ${taller.nombre}`);
    } else {
      console.warn("Ya estás inscrito en el taller");
    }
  }

  guardarTalleresEnStorage() {
    // Guardar la lista de talleres en el localStorage
    localStorage.setItem('talleres', JSON.stringify(this.talleres));
    console.log("Talleres actualizados guardados en el Storage");
  }
}
