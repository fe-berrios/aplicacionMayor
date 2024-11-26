import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  constructor(private storage: Storage) {
    this.initStorage();
   }

  initStorage(){
    this.storage.create();
  }

  async createTaller(taller: any): Promise<any>{
    let talleres: any[] = await this.storage.get('talleres') || [];
    if (talleres.find(tal => tal.id == taller.id) != undefined){
      console.log("ERROR! taller no pudo ser creado.")
      return false;
    }
    talleres.push(taller);
    this.storage.set("talleres", talleres)
    console.log("Taller creado");
    return true;
  }

  async getTaller(id: string): Promise<any>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    return talleres.find(tal => tal.id == id);
  }

  async getTalleres(): Promise<any>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    return talleres;
  }

  async updateTaller(id: string, nuevoTaller: any): Promise<any>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    let index = talleres.findIndex(tal => tal.id == id);
    if (index == -1){
      console.log("ERROR! taller no existe!")
      return false;
    }
    talleres[index] = nuevoTaller;
    this.storage.set("talleres", talleres);
    console.log("Taller modificado!");
    return true;
  }

  async deleteTaller(id: string): Promise<any>{
    let talleres: any[] = await this.storage.get("talleres") || [];
    let index = talleres.findIndex(tal => tal.id == id)
    if (index == -1){
      console.log("ERROR! taller no existe")
      return false;
    }
    talleres.splice(index, 1);
    this.storage.set("talleres", talleres);
    console.log("Taller eliminado");
    return true;
  }
}
