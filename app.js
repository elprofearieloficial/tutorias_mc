const secciones = {
  inicio: {
    titulo: 'Inicio',
    descripcion:
      'Vista principal del panel. Desde aquí puedes acceder a estudiantes, tutores, asignaciones, constancias y reportes.'
  },
  estudiantes: {
    titulo: 'Consultar estudiantes',
    descripcion: 'Aquí podrás buscar, filtrar y consultar el historial académico y de tutorías de estudiantes.'
  },
  tutores: {
    titulo: 'Consultar listado de tutores',
    descripcion: 'Esta sección mostrará los tutores registrados, su disponibilidad y la carga de tutorados por periodo.'
  },
  'tutorados-angular': {
    titulo: 'Consultar tutorados con tutores (Angular)',
    descripcion: 'Vista construida con Angular para consultar tutorados y su tutor asignado con filtros de carrera y semestre.'
  },
  'asignar-tutor': {
    titulo: 'Asignar tutor a tutorado',
    descripcion: 'Permite seleccionar a un tutor y vincularlo con un estudiante tutorado.'
  },
  'asignar-tutorado': {
    titulo: 'Asignar tutorado a un tutor',
    descripcion: 'Permite seleccionar un tutorado y asociarlo con un tutor específico.'
  },
  'constancias-asignacion': {
    titulo: 'Generar constancias de asignación',
    descripcion: 'Generación de documentos oficiales para formalizar asignaciones entre tutor y tutorado.'
  },
  'constancias-participacion': {
    titulo: 'Generar constancias de participación',
    descripcion: 'Generación de constancias de participación para tutores y tutorados.'
  },
  'reportes-entregas': {
    titulo: 'Consultar entregas de reportes',
    descripcion: 'Control y seguimiento de entregas de reportes periódicos de tutoría.'
  },
  'area-reportes': {
    titulo: 'Área de reportes',
    descripcion: 'Sección orientada a indicadores, estadísticas y exportación de datos administrativos.'
  }
};

const menu = document.getElementById('menuAdmin');
const descripcionSeccion = document.getElementById('descripcionSeccion');
const panelSeccion = document.getElementById('panelSeccion');
const tituloSeccion = document.getElementById('tituloSeccion');
const textoSeccion = document.getElementById('textoSeccion');
const tarjetasInicio = document.getElementById('tarjetasInicio');

function activarSeccion(clave) {
  if (clave === 'estudiantes') {
    window.location.href = 'estudiantes.html';
    return;
  }

  if (clave === 'tutores') {
    window.location.href = 'tutores.html';
    return;
  }

  if (clave === 'tutorados-angular') {
    window.location.href = 'tutorados-angular.html';
    return;
  }

  if (clave === 'asignar-tutor') {
    window.location.href = 'asignar-tutor.html';
    return;
  }

  const data = secciones[clave] ?? secciones.inicio;

  menu.querySelectorAll('.nav-link').forEach((item) => {
    item.classList.toggle('active', item.dataset.section === clave);
  });

  descripcionSeccion.textContent = data.descripcion;

  const mostrarInicio = clave === 'inicio';
  tarjetasInicio.classList.toggle('d-none', !mostrarInicio);

  if (mostrarInicio) {
    panelSeccion.classList.add('d-none');
    return;
  }

  tituloSeccion.textContent = data.titulo;
  textoSeccion.textContent = data.descripcion;
  panelSeccion.classList.remove('d-none');
}

menu.addEventListener('click', (event) => {
  const boton = event.target.closest('button[data-section]');
  if (!boton) return;
  activarSeccion(boton.dataset.section);
});

document.querySelectorAll('button[data-section]').forEach((boton) => {
  boton.addEventListener('click', () => activarSeccion(boton.dataset.section));
});

activarSeccion('inicio');
