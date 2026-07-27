package com.radiolajefa.api.controller;

import com.radiolajefa.api.model.Programa;
import com.radiolajefa.api.service.ProgramaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programas")
@CrossOrigin(origins = "*")
public class ProgramaController {

    private final ProgramaService programaService;

    public ProgramaController(ProgramaService programaService) {
        this.programaService = programaService;
    }

    @GetMapping
    public List<Programa> listarTodos() {
        return programaService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Programa> obtenerPorId(@PathVariable Long id) {
        return programaService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Programa> crear(@RequestBody Programa programa) {
        Programa nuevo = programaService.guardar(programa);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Programa> actualizar(@PathVariable Long id, @RequestBody Programa programa) {
        try {
            Programa actualizado = programaService.actualizar(id, programa);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        programaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
