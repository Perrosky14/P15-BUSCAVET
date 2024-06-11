package com.example.BUSCAVET.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "Mascota")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MascotaEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String id_categoria_animal;
    private String id_especie;
    private String id_raza;
    private String id_sexo;
    private String nombre;
    private int dia_nac;
    private int mes_nac;
    private int anio_nac;
    private String otro;
    private String historial_consulta;
    private Integer estatura;
    private String color;
    private Integer peso;
    private String otro2;

    @ManyToOne
    @JoinColumn(name = "id_usuario_asociado")
    @JsonBackReference
    private UsuarioEntity usuario;

}
