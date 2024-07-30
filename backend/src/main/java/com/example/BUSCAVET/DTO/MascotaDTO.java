package com.example.BUSCAVET.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MascotaDTO {
    private Long id;
    private String nombre;
    private String id_sexo;
    private String id_especie;
}
