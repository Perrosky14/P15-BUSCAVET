package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.DTO.BloqueHoraDTO;
import com.example.BUSCAVET.DTO.DoctorDTO;
import com.example.BUSCAVET.DTO.MascotaDTO;
import com.example.BUSCAVET.Entities.BloqueHoraEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.MascotaEntity;
import org.springframework.stereotype.Service;

@Service
public class DTOService {
    public static DoctorDTO toDoctorDTO(DoctorEntity doctor) {
        return new DoctorDTO(
                doctor.getId(),
                doctor.getNombre1(),
                doctor.getApellido1()

        );
    }

    public static MascotaDTO toMascotaDTO(MascotaEntity mascota) {
        return new MascotaDTO(
                mascota.getId(),
                mascota.getNombre()
        );
    }

    public static BloqueHoraDTO toBloqueHoraDTO(BloqueHoraEntity bloqueHora) {
        return new BloqueHoraDTO(
                bloqueHora.getId(),
                bloqueHora.getMotivo(),
                bloqueHora.getFecha(),
                bloqueHora.getHoraInicio(),
                toDoctorDTO(bloqueHora.getDoctor()),
                toMascotaDTO(bloqueHora.getMascota())
        );
    }
}
