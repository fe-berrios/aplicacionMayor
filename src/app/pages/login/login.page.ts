import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";
  contrasena: string = "";

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
  }

  public async loginUsuario(correo: string, contrasena: string){
    if (await this.usuarioService.authUsuario(correo, contrasena)){
      alert("Usuario autentificado!")
      this.router.navigate(['/home']);
    } else {
      alert("Usuario no se pudo autentificar!")
    }
  }

}
