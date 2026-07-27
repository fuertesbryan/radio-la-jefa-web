package com.radiolajefa.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Programa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String locutor;
    private String horario;
    private String categoria;
    private String estado; // e.g. "EN VIVO", "PROGRAMADO", "GRABADO"
    private Integer audienciaEstimada;
    private String descripcion;

    public Programa() {
    }

    public Programa(Long id, String titulo, String locutor, String horario, String categoria, String estado, Integer audienciaEstimada, String descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.locutor = locutor;
        this.horario = horario;
        this.categoria = categoria;
        this.estado = estado;
        this.audienciaEstimada = audienciaEstimada;
        this.descripcion = descripcion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getLocutor() {
        return locutor;
    }

    public void setLocutor(String locutor) {
        this.locutor = locutor;
    }

    public String getHorario() {
        return horario;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getAudienciaEstimada() {
        return audienciaEstimada;
    }

    public void setAudienciaEstimada(Integer audienciaEstimada) {
        this.audienciaEstimada = audienciaEstimada;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
