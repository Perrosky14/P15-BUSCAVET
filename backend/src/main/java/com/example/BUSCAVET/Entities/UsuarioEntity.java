package com.example.BUSCAVET.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "Usuario")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UsuarioEntity {

    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_pais;
    private String rut;
    private String nombre1;
    private String nombre2;
    private String apellido1;
    private String apellido2;
    private int id_genero;
    private int dia_nac;
    private int mes_nac;
    private int año_nac;
    private int id_nacionalidad;
    private String otro;
    private String direccion;
    private String numero;
    private String tipo;
    private int id_codigo_postal;
    private int id_comuna;
    private int id_provincia;
    private int id_region;
    private String geolocalizacion;
    private int id_zona_BDoc;
    private String otro2;
    private String telefono;
    private String codigo_area;
    private String celular;
    private String email;
    private String RRSS1;
    private String RRSS2;
    private String otro3;
    private int id_usuario;

}
