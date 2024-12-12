import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TallerService {

  constructor(private storage: Storage) { 
    this.initStorage();
  }

  async initStorage(){
    await this.storage.create();
    await this.initDefaultTalleres();
  }

  private async initDefaultTalleres(): Promise<void> {
    const existingTalleres = await this.storage.get('talleres');
    if (!existingTalleres || existingTalleres.length === 0) {
      const defaultTalleres = [
        { 
          id: 1, 
          nombre: "Carpintería para principiantes", 
          instructor: "Juan", 
          alumnos: [], 
          sala: "1A",
          dias: "Lunes a viernes",
          horario: "12:00 a 14:00",
          descripcion: "Interesado en aprender las bases de la carpintería? Este es el taller para ti!" 
        },
        { 
          id: 2, 
          nombre: "Carpintería para expertos", 
          instructor: "Leo", 
          alumnos: [], 
          sala: "2A",
          dias: "Lunes a viernes",
          horario: "14:00 a 16:00",
          descripcion: "Perfecciona aún más tus habilidades, aprende nuevas técnicas!" 
        },
        {
          id: 3,
          nombre: "Taller de Memoria y Estimulación Cognitiva",
          instructor: "María",
          alumnos: [],
          sala: "3B",
          dias: "Martes y Jueves",
          horario: "10:00 a 12:00",
          descripcion: "Ejercita tu mente con actividades diseñadas para mejorar la memoria, concentración y creatividad."
        },
        {
          id: 4,
          nombre: "Taller de Baile y Movimiento",
          instructor: "Carlos",
          alumnos: [],
          sala: "1C",
          dias: "Miércoles y Viernes",
          horario: "11:00 a 13:00",
          descripcion: "Disfruta bailando al ritmo de tus canciones favoritas y mantente activo con ejercicios suaves y divertidos."
        },
        {
          id: 5,
          nombre: "Taller de Cocina Saludable",
          instructor: "Ana",
          alumnos: [],
          sala: "2C",
          dias: "Lunes y Miércoles",
          horario: "15:00 a 17:00",
          descripcion: "Aprende a preparar recetas nutritivas, fáciles y deliciosas para cuidar tu salud y la de tu familia."
        },
        {
          id: 6,
          nombre: "Taller de Arte y Pintura",
          instructor: "Laura",
          alumnos: [],
          sala: "4B",
          dias: "Martes y Jueves",
          horario: "09:00 a 11:00",
          descripcion: "Descubre tu lado creativo mientras pintas, dibujas y exploras diferentes técnicas artísticas."
        }
      ];
      await this.storage.set('talleres', defaultTalleres);
    }
  }

  // usuarios(CRUD)
  public async createTaller(taller: any): Promise<boolean>{
    let talleres: any[] = await this.storage.get('talleres') || [];
    if (talleres.find(tal => tal.id == taller.id) != undefined){
      return false;
    } 
    talleres.push(taller);
    await this.storage.set("talleres", talleres);
    return true;
  }

  public async getTaller(id: string): Promise<any>{
    let talleres: any[] = await this.storage.get('talleres') || [];
    return talleres.find(tal => tal.id == id);
  }

  public async getTalleres(): Promise<any[]>{
    return this.storage.get("talleres") || [];
  }

  public async updateTaller(id: string, taller: any): Promise<boolean>{
    let talleres: any[] = await this.storage.get('talleres') || [];
    let index: number = talleres.findIndex(tal => tal.id == id);
    if (index == -1){
      return false;
    }
    talleres[index] = taller;
    await this.storage.set("talleres", talleres);
    return true;
  } 

  public async deleteTaller(id: string): Promise<boolean>{
    let talleres: any[] = await this.storage.get('talleres') || [];
    let index: number = talleres.findIndex(tal => tal.id == id);
    if (index == -1){
      return false;
    }
    talleres.splice(index, 1);
    await this.storage.set("talleres", talleres);
    return true;
  }
}
