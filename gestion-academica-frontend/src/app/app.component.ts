import { Component } from '@angular/core';
import { EstudianteService, Estudiante } from './estudiante.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  cedula = '';
  estudiante: Estudiante | null = null;
  mensaje = '';
  editando = false;
  editNombre = '';
  editApellido = '';
  editNivel: number | undefined = undefined;

  constructor(private estudianteService: EstudianteService) {}

  buscar() {
    this.mensaje = '';
    this.estudianteService.getPorCedula(this.cedula).subscribe({
      next: (est: Estudiante) => {
        this.estudiante = est;
        this.editando = true;
        this.editNombre = est.nombre;
        this.editApellido = est.apellido;
        this.editNivel = est.nivel;
      },
      error: () => {
        this.estudiante = null;
        this.editando = false;
        this.mensaje = 'Estudiante no encontrado';
      }
    });
  }

  actualizar() {
    if (!this.estudiante) return;
    this.estudianteService.actualizar(this.estudiante.cedula, {
      nombre: this.editNombre,
      apellido: this.editApellido,
      nivel: this.editNivel
    }).subscribe({
      next: (est: Estudiante) => {
        this.estudiante = est;
        this.mensaje = '¡Estudiante actualizado con éxito!';
        this.editando = false;
      },
      error: () => {
        this.mensaje = 'Error al actualizar.';
      }
    });
  }
} 