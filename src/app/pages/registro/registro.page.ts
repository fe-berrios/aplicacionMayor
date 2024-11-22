import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    tipo_usuario: new FormControl('adulto_mayor', []),
    contrasena: new FormControl('', [Validators.required])
  })

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  public async registrarUsuario(){
    if (await this.usuarioService.createUsuario(this.usuario.value))
      this.router.navigate(['/login']);
      this.usuario.reset();
      alert("Usuario registrado!")
  }

}
