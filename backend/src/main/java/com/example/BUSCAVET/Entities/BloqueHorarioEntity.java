package com.example.BUSCAVET.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalTime;

@Entity
@Table(name = "BloqueHorario")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BloqueHorarioEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    private String turno;
    private Integer cantidadBloquesPorDia;
    private LocalTime tiempoBloques;
    private LocalTime tiempoPausas;
    private LocalTime tiempoTrabajoTurno;
    private LocalTime horaInicio;
    private LocalTime horaFinal;

    @OneToOne
    @JoinColumn(name = "id_veterinario_asociado")
    @JsonBackReference(value = "doctor_bloqueHorario")
    private DoctorEntity doctor;
}
