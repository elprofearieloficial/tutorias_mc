const tutorados = [
  { matricula: '2021001', nombre: 'Ana Paula Mendoza Ruiz', carrera: 'Ing. en Computación', semestre: 2, tutor: '' },
  { matricula: '2021008', nombre: 'Diego Alfonso Vega Torres', carrera: 'Ing. en Computación', semestre: 4, tutor: 'Mtra. Verónica Salazar Pineda' },
  { matricula: '2021015', nombre: 'María Fernanda Cruz López', carrera: 'Ing. en Computación', semestre: 6, tutor: 'Mtro. José Luis Paredes Mejía' },
  { matricula: '2021044', nombre: 'Jorge Iván Campos Medina', carrera: 'Ing. en Mecatrónica', semestre: 3, tutor: '' },
  { matricula: '2021052', nombre: 'Valeria Núñez Ponce', carrera: 'Ing. en Mecatrónica', semestre: 5, tutor: 'Mtro. Raúl Hernández Castillo' },
  { matricula: '2021060', nombre: 'Ricardo Soto Hernández', carrera: 'Ing. en Mecatrónica', semestre: 7, tutor: 'Dra. Alicia Montaño Soto' }
];

const tutores = [
  { nombre: 'Dr. Carlos Jiménez Ortega', carrera: 'Ing. en Computación', totalTutorados: 3 },
  { nombre: 'Mtra. Verónica Salazar Pineda', carrera: 'Ing. en Computación', totalTutorados: 2 },
  { nombre: 'Mtro. José Luis Paredes Mejía', carrera: 'Ing. en Computación', totalTutorados: 1 },
  { nombre: 'Mtro. Raúl Hernández Castillo', carrera: 'Ing. en Mecatrónica', totalTutorados: 2 },
  { nombre: 'Mtra. Sandra Velasco Ramos', carrera: 'Ing. en Mecatrónica', totalTutorados: 1 },
  { nombre: 'Dra. Alicia Montaño Soto', carrera: 'Ing. en Mecatrónica', totalTutorados: 1 }
];

const filtroCarrera = document.getElementById('filtroCarreraAsignacion');
const filtroSemestre = document.getElementById('filtroSemestreAsignacion');
const tablaTutorados = document.getElementById('tablaTutoradosAsignacion');
const resumenTutorados = document.getElementById('resumenTutoradosAsignacion');
const datoMatricula = document.getElementById('datoMatricula');
const datoNombre = document.getElementById('datoNombre');
const datoTutorActual = document.getElementById('datoTutorActual');
const btnAbrirModalTutor = document.getElementById('btnAbrirModalTutor');
const descripcionAsignacionModal = document.getElementById('descripcionAsignacionModal');
const tablaTutoresModal = document.getElementById('tablaTutoresModalAsignacion');

const modalAsignarTutor = new bootstrap.Modal(document.getElementById('modalAsignarTutor'));

let alumnoSeleccionado = null;

function resetAlumnoSeleccionado() {
  alumnoSeleccionado = null;
  datoMatricula.textContent = '-';
  datoNombre.textContent = '-';
  datoTutorActual.textContent = '';
  btnAbrirModalTutor.disabled = true;
}

function cargarSemestres(carrera) {
  filtroSemestre.innerHTML = '<option value="">Selecciona un semestre</option>';

  if (!carrera) {
    filtroSemestre.disabled = true;
    return;
  }

  const semestres = [...new Set(tutorados.filter((item) => item.carrera === carrera).map((item) => item.semestre))].sort((a, b) => a - b);

  semestres.forEach((semestre) => {
    const option = document.createElement('option');
    option.value = String(semestre);
    option.textContent = `${semestre}° semestre`;
    filtroSemestre.appendChild(option);
  });

  filtroSemestre.disabled = false;
}

function renderTutorados(lista) {
  if (!lista.length) {
    tablaTutorados.innerHTML =
      '<tr><td colspan="5" class="text-center text-secondary py-4">No hay alumnos para los filtros seleccionados.</td></tr>';
    resumenTutorados.textContent = '0 alumnos encontrados.';
    return;
  }

  tablaTutorados.innerHTML = lista
    .map(
      (alumno) => `
      <tr>
        <td>${alumno.matricula}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.semestre}</td>
        <td><button class="btn btn-sm btn-outline-primary" data-matricula="${alumno.matricula}">Elegir alumno</button></td>
      </tr>
    `
    )
    .join('');

  resumenTutorados.textContent = `${lista.length} alumno(s) encontrados.`;
}

function aplicarFiltros() {
  resetAlumnoSeleccionado();

  const carrera = filtroCarrera.value;
  const semestre = filtroSemestre.value;

  if (!carrera || !semestre) {
    tablaTutorados.innerHTML =
      '<tr><td colspan="5" class="text-center text-secondary py-4">Selecciona carrera y semestre para mostrar alumnos.</td></tr>';
    resumenTutorados.textContent = 'Filtros incompletos.';
    return;
  }

  const lista = tutorados.filter((alumno) => alumno.carrera === carrera && String(alumno.semestre) === semestre);
  renderTutorados(lista);
}

function seleccionarAlumno(matricula) {
  const alumno = tutorados.find((item) => item.matricula === matricula);
  if (!alumno) return;

  alumnoSeleccionado = alumno;
  datoMatricula.textContent = alumno.matricula;
  datoNombre.textContent = alumno.nombre;
  datoTutorActual.textContent = alumno.tutor;
  btnAbrirModalTutor.disabled = false;
}

function renderTutoresModal() {
  if (!alumnoSeleccionado) return;

  const tutoresCarrera = tutores.filter((item) => item.carrera === alumnoSeleccionado.carrera);

  descripcionAsignacionModal.textContent = `Alumno seleccionado: ${alumnoSeleccionado.nombre} (${alumnoSeleccionado.matricula})`;

  tablaTutoresModal.innerHTML = tutoresCarrera
    .map(
      (tutor) => `
      <tr>
        <td>${tutor.nombre}</td>
        <td>${tutor.carrera}</td>
        <td><span class="badge text-bg-primary">${tutor.totalTutorados}</span></td>
        <td><button class="btn btn-sm btn-success" data-tutor="${tutor.nombre}">Seleccionar tutor</button></td>
      </tr>
    `
    )
    .join('');
}

filtroCarrera.addEventListener('change', () => {
  cargarSemestres(filtroCarrera.value);
  aplicarFiltros();
});

filtroSemestre.addEventListener('change', aplicarFiltros);

tablaTutorados.addEventListener('click', (event) => {
  const boton = event.target.closest('button[data-matricula]');
  if (!boton) return;
  seleccionarAlumno(boton.dataset.matricula);
});

btnAbrirModalTutor.addEventListener('click', () => {
  renderTutoresModal();
  modalAsignarTutor.show();
});

tablaTutoresModal.addEventListener('click', (event) => {
  const boton = event.target.closest('button[data-tutor]');
  if (!boton || !alumnoSeleccionado) return;

  alumnoSeleccionado.tutor = boton.dataset.tutor;
  datoTutorActual.textContent = alumnoSeleccionado.tutor;
  modalAsignarTutor.hide();
});

aplicarFiltros();
