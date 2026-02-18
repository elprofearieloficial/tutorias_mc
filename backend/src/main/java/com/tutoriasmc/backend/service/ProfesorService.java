package com.tutoriasmc.backend.service;

import com.tutoriasmc.backend.dto.ProfesorDto;
import com.tutoriasmc.backend.dto.TutoradoTutorDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProfesorService {

    private final JdbcTemplate jdbcTemplate;
    private final String queryProfesores;
    private final String queryTutoradosConTutor;

    public ProfesorService(
        JdbcTemplate jdbcTemplate,
        @Value("${app.sql.profesores}") String queryProfesores,
        @Value("${app.sql.tutorados-con-tutor}") String queryTutoradosConTutor
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryProfesores = queryProfesores;
        this.queryTutoradosConTutor = queryTutoradosConTutor;
    }

    public List<ProfesorDto> obtenerProfesores() {
        return jdbcTemplate.query(
            queryProfesores,
            (rs, rowNum) -> new ProfesorDto(
                rs.getLong("id"),
                rs.getString("nombre_completo"),
                rs.getString("grado_academico"),
                rs.getString("carrera")
            )
        );
    }

    public List<TutoradoTutorDto> obtenerTutoradosConTutor() {
        return jdbcTemplate.query(
            queryTutoradosConTutor,
            (rs, rowNum) -> new TutoradoTutorDto(
                rs.getString("matricula"),
                rs.getString("nombre_completo"),
                rs.getString("carrera"),
                rs.getInt("semestre"),
                rs.getString("tutor")
            )
        );
    }
}
