package com.tutoriasmc.backend.dto;

public record TutoradoTutorDto(
    String matricula,
    String nombreCompleto,
    String carrera,
    Integer semestre,
    String tutor
) {
}
