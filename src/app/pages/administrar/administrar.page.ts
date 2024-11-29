import { SeccionService } from './../../services/seccion.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {

  secciones: any = [];

  seccion = new FormGroup({
    id: new FormControl('', []),
    sala: new FormControl('', []),
    taller: new FormControl('', []),
    instructor: new FormControl('', []),
    almunos: new FormControl('', []),
    fecha_inicio: new FormControl('', []),
    fecha_termino: new FormControl('', [])
  })

  constructor(private seccionService: SeccionService) { }

  async ngOnInit() {
    this.secciones = await this.seccionService.getSecciones();
  }

  // Administrar secciones
  async createSeccion(){
    if (await this.seccionService.createSeccion(this.seccion.value)){
      console.log("Seccion creada!");
      this.seccion.reset();
      this.secciones = await this.seccionService.getSecciones();
    }
    console.log("ERROR! no se pudo crear la seccion.");
  }

  async getSeccion(id: string){
    this.seccion.setValue(await this.seccionService.getSeccion(id));
  }

  async updateSeccion(){
    var id = this.seccion.controls.id.value || "";
    if (await this.seccionService.updateSeccion(id, this.seccion.value)){
      console.log("Seccion modificada!");
      this.secciones = await this.seccionService.getSecciones();
    }
    console.log("ERROR! no se pudo modificar la sección.")
  }

  async deleteSeccion(id: string){
    if (await this.seccionService.deleteSeccion(id)){
      console.log("Seccion eliminada!");
      this.secciones = await this.seccionService.getSecciones();
    }
    console.log("ERROR! no se pudo eliminar la sección.")
  }

}
