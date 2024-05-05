package com.example.BUSCAVET.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "Doctor")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class DoctorEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String contrasenia;
    private int id_institucion_vet_1;
    private int id_institucion_vet_2;
    private int id_institucion_vet_3;
    private int id_pais;
    private String rut;
    private String matricula;
    private String nombre1;
    private String nombre2;
    private String apellido1;
    private String apellido2;
    private int id_genero;
    private int dia_nac;
    private int mes_nac;
    private int anio_nac;
    private int id_nacionalidad;
    private int id_especialidad_1;
    private int id_especialidad_2;
    private int id_especialidad_3;
    private String resenia;
    private String resenia_confirmada;
    private int id_estado_medico_vet;
    private String telefono;
    private String codigo_area;
    private String celular;
    private int id_convenio;
    private String email;
    private String RRSS1;
    private String RRSS2;
    private String asistente_nom;
    private String asistente_telefono;
    private String asistente_codigo_area;
    private String asistente_celular;
    private String otro;

}
