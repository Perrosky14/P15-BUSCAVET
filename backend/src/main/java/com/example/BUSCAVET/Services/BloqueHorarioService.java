package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.BloqueHorarioEntity;
import com.example.BUSCAVET.DTO.CrearBloques;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Repositories.BloqueHorarioRepository;
import com.example.BUSCAVET.Repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BloqueHorarioService {

    @Autowired
    BloqueHorarioRepository bloqueHorarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    BloqueHoraService bloqueHoraService;

    public void guardarBloqueHorario(BloqueHorarioEntity bloqueHorario) {
        bloqueHorarioRepository.save(bloqueHorario);
    }

    public ArrayList<BloqueHorarioEntity> obtenerBloquesHorario() {
        return (ArrayList<BloqueHorarioEntity>) bloqueHorarioRepository.findAll();
    }

    public BloqueHorarioEntity obtenerPorId(Long id) {
        return bloqueHorarioRepository.findById(id).orElse(null);
    }

    /*public BloqueHorarioEntity obtenerPorVeterinario(Long idVeterinario) {
        DoctorEntity veterinario = doctorRepository.findById(idVeterinario).orElse(null);
        if (veterinario != null) {
            return bloqueHorarioRepository.findByDoctor(veterinario);
        }
        return null;
    }*/

    public List<BloqueHorarioEntity> obtenerPorVeterinario(Long idVeterinario) {
        DoctorEntity veterinario = doctorRepository.findById(idVeterinario).orElse(null);
        if (veterinario != null) {
            return bloqueHorarioRepository.findAllByDoctor(veterinario);
        }
        return null;
    }

    public BloqueHorarioEntity actualizarBloqueHorario(Long id, BloqueHorarioEntity bloqueHorarioActualizado) {
        BloqueHorarioEntity bloqueHorarioExistente = bloqueHorarioRepository.findById(id).orElse(null);
        if (bloqueHorarioExistente != null) {
            bloqueHorarioExistente.setTurno(bloqueHorarioActualizado.getTurno());
            bloqueHorarioExistente.setCantidadBloquesPorDia(bloqueHorarioActualizado.getCantidadBloquesPorDia());
            bloqueHorarioExistente.setTiempoBloques(bloqueHorarioActualizado.getTiempoBloques());
            bloqueHorarioExistente.setTiempoPausas(bloqueHorarioActualizado.getTiempoPausas());
            bloqueHorarioExistente.setTiempoTrabajoTurno(bloqueHorarioActualizado.getTiempoTrabajoTurno());
            bloqueHorarioExistente.setHoraInicio(bloqueHorarioActualizado.getHoraInicio());
            bloqueHorarioExistente.setHoraFinal(bloqueHorarioActualizado.getHoraFinal());
            bloqueHorarioExistente.setDoctor(bloqueHorarioActualizado.getDoctor());
            return bloqueHorarioRepository.save(bloqueHorarioExistente);
        }
        return null;
    }

    public BloqueHorarioEntity transformarBloqueHorario(CrearBloques bloqueHorarioData) {
        BloqueHorarioEntity bloqueHorario = new BloqueHorarioEntity();
        bloqueHorario.setTurno((String) bloqueHorarioData.turno);
        bloqueHorario.setCantidadBloquesPorDia((Integer) bloqueHorarioData.cantidadBloquesPorDia);
        bloqueHorario.setTiempoBloques(LocalTime.parse((String) bloqueHorarioData.tiempoBloques));
        bloqueHorario.setTiempoPausas(LocalTime.parse((String) bloqueHorarioData.tiempoPausas));
        bloqueHorario.setTiempoTrabajoTurno(LocalTime.parse((String) bloqueHorarioData.tiempoTrabajoTurno));
        bloqueHorario.setHoraInicio(LocalTime.parse((String) bloqueHorarioData.horaInicio));
        bloqueHorario.setHoraFinal(LocalTime.parse((String) bloqueHorarioData.horaFinal));
        return bloqueHorario;
    }

    public void crearBloquesHoras(DoctorEntity veterinario, BloqueHorarioEntity bloqueHorario) {
        bloqueHorario.setDoctor(veterinario);
        bloqueHorarioRepository.save(bloqueHorario);
        bloqueHoraService.crearBloquesHoraInicial(veterinario, bloqueHorario);
    }

    public void eliminarBloqueHorario(Long id) {
        bloqueHorarioRepository.deleteById(id);
    }

}
