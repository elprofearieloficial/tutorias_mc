# Backend Spring Boot (TutoríasMC)

Este backend expone APIs REST para consumir información de la base de datos MySQL.

## Requisitos
- Java 21+
- Maven 3.9+
- MySQL con la base de datos ya cargada

## Configuración rápida
1. Edita `src/main/resources/application.properties` con tus credenciales reales de MySQL.
2. Si tu tabla/columnas de profesores tienen nombres diferentes, ajusta `app.sql.profesores`.

> La consulta debe devolver estos alias exactos:
- `id`
- `nombre_completo`
- `grado_academico`
- `carrera`

## Ejecutar
```bash
cd backend
mvn spring-boot:run
```

## Endpoint inicial
- `GET /api/profesores`

Ejemplo de respuesta:
```json
[
  {
    "id": 1,
    "nombreCompleto": "Dr. Carlos Jiménez Ortega",
    "gradoAcademico": "Doctorado",
    "carrera": "Ing. en Computación"
  }
]
```
