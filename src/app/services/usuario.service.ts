import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private storage: Storage) { 
    this.initStorage();
  }

  async initStorage(){
    await this.storage.create();
  }
  
  // usuarios(CRUD)
  public async createUsuario(usuario: any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get('usuarios') || [];
    if (usuarios.find(usu => usu.rut == usuario.rut) != undefined){
      return false;
    } 
    usuarios.push(usuario);
    await this.storage.set("usuarios", usuarios);
    return true;
  }

  public async getUsuario(rut: string): Promise<any>{
    let usuarios: any[] = await this.storage.get('usuarios') || [];
    return usuarios.find(usu => usu.rut == rut);
  }

  public async getUsuarios(): Promise<any[]>{
    return this.storage.get("usuarios") || [];
  }

  public async updateUsuario(rut: string, nuevoUsuario: any): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let index: number = usuarios.findIndex(usu => usu.rut == rut);
    if (index == -1){
      return false;
    }
    usuarios[index] = nuevoUsuario;
    await this.storage.set("usuarios", usuarios);
    return true;
  } 

  public async deleteUsuario(rut: string): Promise<boolean>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    let index: number = usuarios.findIndex(usu => usu.rut == rut);
    if (index == -1){
      return false;
    }
    usuarios.splice(index, 1);
    await this.storage.set("usuarios", usuarios);
    return true;
  }

  // usuarios(Auth)
  public async authUsuario(correo: string, contrasena: string): Promise<any>{
    let usuarios: any[] = await this.storage.get("usuarios") || [];
    const usuarioAuth = usuarios.find(usu => usu.correo == correo && usu.contrasena == contrasena);
    if (usuarioAuth){
      localStorage.setItem("usuario", JSON.stringify(usuarioAuth));
      return true;
    }
    return false;
  }
}
