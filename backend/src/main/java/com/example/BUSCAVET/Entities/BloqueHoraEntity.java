package com.example.BUSCAVET.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "BloqueHora")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BloqueHoraEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    private int idCentro;
    private String motivo;
    private Boolean activo;
    private Boolean tomadoTemporal;
    private Boolean agendadoPorUsuario;
    private LocalDate fecha;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime tiempoAtencion;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime horaInicio;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime bloqueoTemporal;


    @ManyToOne
    @JoinColumn(name = "id_usuario_asociado")
    @JsonBackReference(value = "usuario_bloqueHora")
    private UsuarioEntity usuario;

    @ManyToOne
    @JoinColumn(name = "id_veterinario_asociado")
    @JsonBackReference(value = "doctor_bloqueHora")
    private DoctorEntity doctor;

    @ManyToOne
    @JoinColumn(name = "id_mascota_asociada")
    @JsonBackReference(value = "mascota_bloqueHora")
    private MascotaEntity mascota;

}
