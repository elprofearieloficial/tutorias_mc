import { bootstrapApplication } from 'https://esm.sh/@angular/platform-browser@17.3.12';
import { Component, computed, inject, signal } from 'https://esm.sh/@angular/core@17.3.12';
import { NgFor, NgIf } from 'https://esm.sh/@angular/common@17.3.12';
import { HttpClient, provideHttpClient } from 'https://esm.sh/@angular/common@17.3.12/http';

const datosFallback = [
  { matricula: '2021001', nombreCompleto: 'Ana Paula Mendoza Ruiz', carrera: 'Ing. en Computación', semestre: 2, tutor: 'Dr. Carlos Jiménez Ortega' },
  { matricula: '2021008', nombreCompleto: 'Diego Alfonso Vega Torres', carrera: 'Ing. en Computación', semestre: 4, tutor: 'Mtra. Verónica Salazar Pineda' },
  { matricula: '2021015', nombreCompleto: 'María Fernanda Cruz López', carrera: 'Ing. en Computación', semestre: 6, tutor: 'Mtro. José Luis Paredes Mejía' },
  { matricula: '2021044', nombreCompleto: 'Jorge Iván Campos Medina', carrera: 'Ing. en Mecatrónica', semestre: 3, tutor: 'Mtra. Sandra Velasco Ramos' },
  { matricula: '2021052', nombreCompleto: 'Valeria Núñez Ponce', carrera: 'Ing. en Mecatrónica', semestre: 5, tutor: 'Mtro. Raúl Hernández Castillo' },
  { matricula: '2021060', nombreCompleto: 'Ricardo Soto Hernández', carrera: 'Ing. en Mecatrónica', semestre: 7, tutor: 'Dra. Alicia Montaño Soto' }
];

@Component({
  selector: 'app-tutorados-angular',
  standalone: true,
  template: `
    <section class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-12 col-md-6">
            <label class="form-label fw-semibold">Carrera</label>
            <select class="form-select" [value]="carreraSeleccionada()" (change)="cambiarCarrera($event)">
              <option value="">Todas las carreras</option>
              <option *ngFor="let carrera of carreras()" [value]="carrera">{{ carrera }}</option>
            </select>
          </div>
          <div class="col-12 col-md-6">
            <label class="form-label fw-semibold">Semestre</label>
            <select class="form-select" [value]="semestreSeleccionado()" (change)="cambiarSemestre($event)">
              <option value="">Todos los semestres</option>
              <option *ngFor="let semestre of semestresDisponibles()" [value]="semestre">{{ semestre }}° semestre</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <section class="card border-0 shadow-sm">
      <div class="card-body">
        <h2 class="h5 mb-3">Listado de tutorados con tutor</h2>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th>Matrícula</th>
                <th>Nombre completo</th>
                <th>Carrera</th>
                <th>Semestre</th>
                <th>Tutor</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of tutoradosFiltrados()">
                <td>{{ item.matricula }}</td>
                <td>{{ item.nombreCompleto }}</td>
                <td>{{ item.carrera }}</td>
                <td>{{ item.semestre }}</td>
                <td>{{ item.tutor || '-' }}</td>
              </tr>
              <tr *ngIf="!tutoradosFiltrados().length">
                <td colspan="5" class="text-center text-secondary py-4">No hay resultados para los filtros seleccionados.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-secondary small mt-3 mb-0">{{ tutoradosFiltrados().length }} registro(s).</p>
      </div>
    </section>
  `,
  imports: [NgFor, NgIf],
  styles: []
})
class TutoradosAngularComponent {
  http = inject(HttpClient);

  tutorados = signal([]);
  carreraSeleccionada = signal('');
  semestreSeleccionado = signal('');

  carreras = computed(() => [...new Set(this.tutorados().map((item) => item.carrera))].sort());

  semestresDisponibles = computed(() => {
    const carrera = this.carreraSeleccionada();
    const base = carrera ? this.tutorados().filter((item) => item.carrera === carrera) : this.tutorados();
    return [...new Set(base.map((item) => item.semestre))].sort((a, b) => a - b);
  });

  tutoradosFiltrados = computed(() => {
    return this.tutorados().filter((item) => {
      const coincideCarrera = this.carreraSeleccionada() ? item.carrera === this.carreraSeleccionada() : true;
      const coincideSemestre = this.semestreSeleccionado() ? String(item.semestre) === this.semestreSeleccionado() : true;
      return coincideCarrera && coincideSemestre;
    });
  });

  constructor() {
    this.cargarTutorados();
  }

  cambiarCarrera(event) {
    this.carreraSeleccionada.set(event.target.value);
    this.semestreSeleccionado.set('');
  }

  cambiarSemestre(event) {
    this.semestreSeleccionado.set(event.target.value);
  }

  cargarTutorados() {
    this.http.get('http://localhost:8080/api/tutorados-tutores').subscribe({
      next: (data) => this.tutorados.set(data),
      error: () => this.tutorados.set(datosFallback)
    });
  }
}

bootstrapApplication(TutoradosAngularComponent, {
  providers: [provideHttpClient()]
}).catch(() => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '<div class="alert alert-danger">No se pudo iniciar Angular en este navegador.</div>';
  }
});
