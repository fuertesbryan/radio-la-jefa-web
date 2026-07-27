package com.radiolajefa.api.service;

import com.radiolajefa.api.model.Programa;
import com.radiolajefa.api.repository.ProgramaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramaService {

    private final ProgramaRepository programaRepository;

    public ProgramaService(ProgramaRepository programaRepository) {
        this.programaRepository = programaRepository;
    }

    public List<Programa> obtenerTodos() {
        return programaRepository.findAll();
    }

    public Optional<Programa> obtenerPorId(Long id) {
        return programaRepository.findById(id);
    }

    public Programa guardar(Programa programa) {
        return programaRepository.save(programa);
    }

    public Programa actualizar(Long id, Programa programaActualizado) {
        return programaRepository.findById(id).map(programa -> {
            programa.setTitulo(programaActualizado.getTitulo());
            programa.setLocutor(programaActualizado.getLocutor());
            programa.setHorario(programaActualizado.getHorario());
            programa.setCategoria(programaActualizado.getCategoria());
            programa.setEstado(programaActualizado.getEstado());
            programa.setAudienciaEstimada(programaActualizado.getAudienciaEstimada());
            programa.setDescripcion(programaActualizado.getDescripcion());
            return programaRepository.save(programa);
        }).orElseThrow(() -> new RuntimeException("Programa no encontrado con id: " + id));
    }

    public void eliminar(Long id) {
        programaRepository.deleteById(id);
    }
}
