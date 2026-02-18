package com.tutoriasmc.backend.dto;

public record ProfesorDto(
    Long id,
    String nombreCompleto,
    String gradoAcademico,
    String carrera
) {
}
