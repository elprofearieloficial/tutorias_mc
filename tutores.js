const tutoresFallback = [
  { id: 't1', nombre: 'Dr. Carlos Jiménez Ortega', carrera: 'Ing. en Computación' },
  { id: 't2', nombre: 'Mtra. Verónica Salazar Pineda', carrera: 'Ing. en Computación' },
  { id: 't3', nombre: 'Mtro. José Luis Paredes Mejía', carrera: 'Ing. en Computación' },
  { id: 't4', nombre: 'Mtro. Raúl Hernández Castillo', carrera: 'Ing. en Mecatrónica' },
  { id: 't5', nombre: 'Mtra. Sandra Velasco Ramos', carrera: 'Ing. en Mecatrónica' },
  { id: 't6', nombre: 'Dra. Alicia Montaño Soto', carrera: 'Ing. en Mecatrónica' }
];

const tutoradosPorTutor = {
  'Dr. Carlos Jiménez Ortega': [
    { matricula: '2021001', nombre: 'Ana Paula Mendoza Ruiz', carrera: 'Ing. en Computación', semestre: 2 },
    { matricula: '2021018', nombre: 'Fernando Díaz Alvarado', carrera: 'Ing. en Computación', semestre: 4 },
    { matricula: '2021030', nombre: 'Patricia Morales Castañeda', carrera: 'Ing. en Computación', semestre: 6 }
  ],
  'Mtra. Verónica Salazar Pineda': [
    { matricula: '2021008', nombre: 'Diego Alfonso Vega Torres', carrera: 'Ing. en Computación', semestre: 4 },
    { matricula: '2021024', nombre: 'Luis Alberto García Flores', carrera: 'Ing. en Computación', semestre: 8 }
  ],
  'Mtro. José Luis Paredes Mejía': [
    { matricula: '2021015', nombre: 'María Fernanda Cruz López', carrera: 'Ing. en Computación', semestre: 6 }
  ],
  'Mtro. Raúl Hernández Castillo': [
    { matricula: '2021031', nombre: 'Paula Daniela Ortiz Salas', carrera: 'Ing. en Mecatrónica', semestre: 1 },
    { matricula: '2021052', nombre: 'Valeria Núñez Ponce', carrera: 'Ing. en Mecatrónica', semestre: 5 }
  ],
  'Mtra. Sandra Velasco Ramos': [
    { matricula: '2021044', nombre: 'Jorge Iván Campos Medina', carrera: 'Ing. en Mecatrónica', semestre: 3 }
  ],
  'Dra. Alicia Montaño Soto': [
    { matricula: '2021060', nombre: 'Ricardo Soto Hernández', carrera: 'Ing. en Mecatrónica', semestre: 7 }
  ]
};

let tutores = [];

const filtroCarreraTutor = document.getElementById('filtroCarreraTutor');
const tablaTutores = document.getElementById('tablaTutores');
const resumenTutores = document.getElementById('resumenTutores');
const nombreTutorModal = document.getElementById('nombreTutorModal');
const tablaTutoradosModal = document.getElementById('tablaTutoradosModal');
const modalTutorados = new bootstrap.Modal(document.getElementById('modalTutorados'));

function obtenerTutorados(nombreTutor) {
  return tutoradosPorTutor[nombreTutor] ?? [];
}

function renderTutoradosModal(tutor) {
  const tutorados = obtenerTutorados(tutor.nombre);
  nombreTutorModal.textContent = tutor.nombre;

  if (!tutorados.length) {
    tablaTutoradosModal.innerHTML =
      '<tr><td colspan="4" class="text-center text-secondary py-3">No hay tutorados asignados para este profesor.</td></tr>';
    modalTutorados.show();
    return;
  }

  tablaTutoradosModal.innerHTML = tutorados
    .map(
      (alumno) => `
      <tr>
        <td>${alumno.matricula}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.semestre}</td>
      </tr>
    `
    )
    .join('');

  modalTutorados.show();
}

function renderTutores(lista) {
  if (!lista.length) {
    tablaTutores.innerHTML =
      '<tr><td colspan="3" class="text-center text-secondary py-4">Selecciona una carrera para consultar tutores.</td></tr>';
    resumenTutores.textContent = 'Sin carrera seleccionada.';
    return;
  }

  tablaTutores.innerHTML = lista
    .map(
      (tutor) => `
      <tr>
        <td>${tutor.nombre}</td>
        <td><span class="badge text-bg-primary">${obtenerTutorados(tutor.nombre).length}</span></td>
        <td><button class="btn btn-link p-0 link-primary" data-id="${tutor.id}">Ver listado de tutorados</button></td>
      </tr>
    `
    )
    .join('');

  resumenTutores.textContent = `${lista.length} tutor(es) encontrados.`;
}

function aplicarFiltroCarrera() {
  const carrera = filtroCarreraTutor.value;
  if (!carrera) {
    renderTutores([]);
    return;
  }

  const lista = tutores.filter((tutor) => tutor.carrera === carrera);
  renderTutores(lista);
}

async function cargarTutoresDesdeApi() {
  try {
    const response = await fetch('http://localhost:8080/api/profesores');
    if (!response.ok) {
      throw new Error('No fue posible consultar /api/profesores');
    }

    const data = await response.json();
    tutores = data.map((profesor, index) => ({
      id: String(profesor.id ?? `api-${index + 1}`),
      nombre: profesor.gradoAcademico ? `${profesor.gradoAcademico} ${profesor.nombreCompleto}` : profesor.nombreCompleto,
      carrera: profesor.carrera
    }));
  } catch {
    tutores = tutoresFallback;
  }
}

filtroCarreraTutor.addEventListener('change', aplicarFiltroCarrera);

tablaTutores.addEventListener('click', (event) => {
  const boton = event.target.closest('button[data-id]');
  if (!boton) return;

  const tutor = tutores.find((item) => item.id === boton.dataset.id);
  if (!tutor) return;

  renderTutoradosModal(tutor);
});

async function inicializarVistaTutores() {
  await cargarTutoresDesdeApi();
  renderTutores([]);
}

inicializarVistaTutores();
