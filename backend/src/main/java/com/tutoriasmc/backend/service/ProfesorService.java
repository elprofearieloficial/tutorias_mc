package com.tutoriasmc.backend.service;

import com.tutoriasmc.backend.dto.ProfesorDto;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProfesorService {

    private final JdbcTemplate jdbcTemplate;
    private final String queryProfesores;

    public ProfesorService(
        JdbcTemplate jdbcTemplate,
        @Value("${app.sql.profesores}") String queryProfesores
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryProfesores = queryProfesores;
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
}
