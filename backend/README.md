# Backend Spring Boot (TutoríasMC)

Este backend expone APIs REST para consumir información de la base de datos MySQL.

## Requisitos
- Java 21+
- Maven 3.9+
- MySQL con la base de datos ya cargada

## Configuración rápida
1. Edita `src/main/resources/application.properties` con tus credenciales reales de MySQL.
2. Si tu tabla/columnas tienen nombres diferentes, ajusta:
   - `app.sql.profesores`
   - `app.sql.tutorados-con-tutor`

> `app.sql.profesores` debe devolver alias exactos:
- `id`
- `nombre_completo`
- `grado_academico`
- `carrera`

> `app.sql.tutorados-con-tutor` debe devolver alias exactos:
- `matricula`
- `nombre_completo`
- `carrera`
- `semestre`
- `tutor`

## Ejecutar
```bash
cd backend
mvn spring-boot:run
```

## Endpoints iniciales
- `GET /api/profesores`
- `GET /api/tutorados-tutores`

Ejemplo de respuesta (`/api/tutorados-tutores`):
```json
[
  {
    "matricula": "2021001",
    "nombreCompleto": "Ana Paula Mendoza Ruiz",
    "carrera": "Ing. en Computación",
    "semestre": 2,
    "tutor": "Dr. Carlos Jiménez Ortega"
  }
]
```
