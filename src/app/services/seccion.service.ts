import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private storage: Storage) { 
    this.initStorage();
  }

  initStorage(){
    this.storage.create();
  }

  async createSeccion(seccion: any): Promise<any>{
    let secciones: any[] = await this.storage.get("secciones") || [];
    if (secciones.find(sec => sec.id == seccion.id) != undefined){
      console.log("ERROR! la seccion ya existe!");
      return false;
    }
    secciones.push(seccion);
    this.storage.set("secciones", secciones);
    console.log("Seccion creada!");
    return true;
  }

  async getSeccion(id: string): Promise<any>{
    let secciones: any[] = await this.storage.get("secciones") || [];
    return secciones.find(sec => sec.id == id);
  }

  async getSecciones(): Promise<any>{
    let secciones: any[] = await this.storage.get("secciones") || [];
    return secciones;
  }

  async updateSeccion(id: string, nuevaSeccion: any): Promise<any>{
    let secciones: any[] = await this.storage.get("secciones") || [];
    let index = secciones.findIndex(sec => sec.id == id);
    if (index == -1){
      console.log("ERROR! seccion no existe!");
      return false;
    }
    secciones[index] = nuevaSeccion;
    this.storage.set("secciones", secciones);
    console.log("Seccion modificada!");
    return true;
  }

  async deleteSeccion(id: string): Promise<any>{
    let secciones: any[] = await this.storage.get("secciones") || [];
    let index = secciones.findIndex(sec => sec.id == id);
    if (index == -1){
      console.log("ERROR! la seccion no existe!");
      return false;
    }
    secciones.splice(index, 1);
    this.storage.set("secciones", secciones);
    console.log("Seccion eliminada!");
    return true;
  }
}
