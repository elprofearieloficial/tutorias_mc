const estudiantes = [
  {
    matricula: '2021001',
    nombre: 'Ana Paula Mendoza Ruiz',
    carrera: 'Ing. en Computación',
    semestre: 2,
    tutor: 'Mtro. Carlos Jiménez'
  },
  {
    matricula: '2021008',
    nombre: 'Diego Alfonso Vega Torres',
    carrera: 'Ing. en Computación',
    semestre: 4,
    tutor: 'Dra. Verónica Salazar'
  },
  {
    matricula: '2021015',
    nombre: 'María Fernanda Cruz López',
    carrera: 'Ing. en Computación',
    semestre: 6,
    tutor: 'Mtro. José Luis Paredes'
  },
  {
    matricula: '2021024',
    nombre: 'Luis Alberto García Flores',
    carrera: 'Ing. en Computación',
    semestre: 8,
    tutor: 'Dra. Verónica Salazar'
  },
  {
    matricula: '2021031',
    nombre: 'Paula Daniela Ortiz Salas',
    carrera: 'Ing. en Mecatrónica',
    semestre: 1,
    tutor: 'Mtro. Raúl Hernández'
  },
  {
    matricula: '2021044',
    nombre: 'Jorge Iván Campos Medina',
    carrera: 'Ing. en Mecatrónica',
    semestre: 3,
    tutor: 'Mtra. Sandra Velasco'
  },
  {
    matricula: '2021052',
    nombre: 'Valeria Núñez Ponce',
    carrera: 'Ing. en Mecatrónica',
    semestre: 5,
    tutor: 'Mtro. Raúl Hernández'
  },
  {
    matricula: '2021060',
    nombre: 'Ricardo Soto Hernández',
    carrera: 'Ing. en Mecatrónica',
    semestre: 7,
    tutor: 'Dra. Alicia Montaño'
  }
];

const filtroCarrera = document.getElementById('filtroCarrera');
const filtroSemestre = document.getElementById('filtroSemestre');
const tablaEstudiantes = document.getElementById('tablaEstudiantes');
const resumenRegistros = document.getElementById('resumenRegistros');

function renderFilas(lista) {
  if (!lista.length) {
    tablaEstudiantes.innerHTML =
      '<tr><td colspan="4" class="text-center text-secondary py-4">No hay alumnos para los filtros seleccionados.</td></tr>';
    resumenRegistros.textContent = '0 alumnos encontrados.';
    return;
  }

  tablaEstudiantes.innerHTML = lista
    .map(
      (alumno) => `
      <tr>
        <td>${alumno.matricula}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.semestre}</td>
        <td>${alumno.tutor}</td>
      </tr>
    `
    )
    .join('');

  resumenRegistros.textContent = `${lista.length} alumno(s) encontrados.`;
}

function cargarSemestres(carrera) {
  filtroSemestre.innerHTML = '<option value="">Todos los semestres</option>';

  if (!carrera) {
    filtroSemestre.disabled = true;
    return;
  }

  const semestres = [...new Set(estudiantes.filter((e) => e.carrera === carrera).map((e) => e.semestre))].sort((a, b) => a - b);

  semestres.forEach((semestre) => {
    const option = document.createElement('option');
    option.value = String(semestre);
    option.textContent = `${semestre}° semestre`;
    filtroSemestre.appendChild(option);
  });

  filtroSemestre.disabled = false;
}

function aplicarFiltros() {
  const carreraSeleccionada = filtroCarrera.value;
  const semestreSeleccionado = filtroSemestre.value;

  if (!carreraSeleccionada) {
    tablaEstudiantes.innerHTML =
      '<tr><td colspan="4" class="text-center text-secondary py-4">Selecciona una carrera para mostrar los alumnos.</td></tr>';
    resumenRegistros.textContent = 'Sin carrera seleccionada.';
    return;
  }

  const listaFiltrada = estudiantes.filter((alumno) => {
    const coincideCarrera = alumno.carrera === carreraSeleccionada;
    const coincideSemestre = semestreSeleccionado ? String(alumno.semestre) === semestreSeleccionado : true;
    return coincideCarrera && coincideSemestre;
  });

  renderFilas(listaFiltrada);
}

filtroCarrera.addEventListener('change', () => {
  cargarSemestres(filtroCarrera.value);
  aplicarFiltros();
});

filtroSemestre.addEventListener('change', aplicarFiltros);

aplicarFiltros();
