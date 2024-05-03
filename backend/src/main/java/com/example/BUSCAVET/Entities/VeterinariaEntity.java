package com.example.BUSCAVET.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "Veterinaria")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VeterinariaEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_pais;
    private int id_segmento;
    private int id_tipo_institucion_vet;
    private int id_estado_institucion;
    private String rut;
    private String razon_social;
    private String nombre_comercial;
    private String nombre_1_rep_legal;
    private String nombre_2_rep_legal;
    private String reseña;
    private String reseña_confirmada;
    private String direccion;
    private String numero;
    private String tipo;
    private String telefono;
    private String codigo_area;
    private String celular;
    private int id_codigo_postal;
    private int id_comuna;
    private int id_provincia;
    private int id_region;
    private String geolocaclizacion;
    private int id_zona_BDoc;
    private int id_servicio;
}
