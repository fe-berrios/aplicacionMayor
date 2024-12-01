import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuario: any = {}; // Usuario actual
  talleres: any[] = []; // Lista de talleres

  constructor() {}

  ngOnInit() {
    // Recuperar usuario del localStorage
    this.usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Inicializar talleres predeterminados
    this.talleres = [
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

    // Guardar siempre los talleres predeterminados en el Storage
    localStorage.setItem('talleres', JSON.stringify(this.talleres));
    console.log("Talleres predeterminados cargados:", this.talleres);
  }

  unirTaller(id: number) {
    // Buscar el taller por ID
    const taller = this.talleres.find(tal => tal.id === id);
    if (!taller) {
      console.error("ERROR! Taller no encontrado");
      return;
    }

    // Verificar si el usuario ya está inscrito
    if (!taller.alumnos.includes(this.usuario.rut)) {
      taller.alumnos.push(this.usuario.rut); // Añadir al usuario al taller
      this.guardarTalleresEnStorage(); // Guardar los talleres actualizados en el Storage
      console.log(taller);
      alert("Te has unido al taller!");
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
