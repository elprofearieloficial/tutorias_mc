package com.tutoriasmc.backend.controller;

import com.tutoriasmc.backend.dto.ProfesorDto;
import com.tutoriasmc.backend.service.ProfesorService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {

    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping
    public List<ProfesorDto> listarProfesores() {
        return profesorService.obtenerProfesores();
    }
}
