package com.example.BUSCAVET.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BloqueHoraDTO {
    private Long id;
    private String motivo;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private DoctorDTO doctor;
    private MascotaDTO mascota;

}
