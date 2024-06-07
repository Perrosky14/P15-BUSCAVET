package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.BloqueHoraEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Repositories.BloqueHoraRepository;
import com.example.BUSCAVET.Repositories.DoctorRepository;
import com.example.BUSCAVET.Repositories.MascotaRepository;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Map;

@Service
public class BloqueHoraService {

    @Autowired
    BloqueHoraRepository bloqueHoraRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    MascotaRepository mascotaRepository;

    public void guardarBloqueHora(BloqueHoraEntity bloqueHora) {
        bloqueHoraRepository.save(bloqueHora);
    }

    public ArrayList<BloqueHoraEntity> obtenerBloquesHoras() {
        return (ArrayList<BloqueHoraEntity>) bloqueHoraRepository.findAll();
    }

    public BloqueHoraEntity obtenerPorId(Long id) {
        return bloqueHoraRepository.findById(id).orElse(null);
    }

    public ArrayList<BloqueHoraEntity> obtenerPorUsuario(Long idUsuario) {
        UsuarioEntity usuario = usuarioRepository.findById(idUsuario).orElse(null);
        if (usuario != null) {
            return bloqueHoraRepository.findAllByUsuario(usuario);
        }
        return null;
    }

    public ArrayList<BloqueHoraEntity> obtenerPorVeterinario(Long idVeterinario) {
        DoctorEntity veterinario = doctorRepository.findById(idVeterinario).orElse(null);
        if (veterinario != null) {
            return bloqueHoraRepository.findAllByDoctor(veterinario);
        }
        return null;
    }

    public ArrayList<BloqueHoraEntity> obtenerPorMascota(Long idMascota) {
        MascotaEntity mascota = mascotaRepository.findById(idMascota).orElse(null);
        if (mascota != null) {
            return bloqueHoraRepository.findAllByMascota(mascota);
        }
        return null;
    }

    public BloqueHoraEntity actualizarBloqueHora(Long id, BloqueHoraEntity bloqueHoraActualizado) {
        BloqueHoraEntity bloqueHoraExistente= bloqueHoraRepository.findById(id).orElse(null);
        if (bloqueHoraExistente != null) {
            bloqueHoraExistente.setIdCentro(bloqueHoraActualizado.getIdCentro());
            bloqueHoraExistente.setMotivo(bloqueHoraActualizado.getMotivo());
            bloqueHoraExistente.setActivo(bloqueHoraActualizado.getActivo());
            bloqueHoraExistente.setTiempoAtencion(bloqueHoraActualizado.getTiempoAtencion());
            bloqueHoraExistente.setHoraInicio(bloqueHoraActualizado.getHoraInicio());
            bloqueHoraExistente.setBloqueoTemporal(bloqueHoraActualizado.getBloqueoTemporal());
            return bloqueHoraRepository.save(bloqueHoraExistente);
        }
        return null;
    }

    public BloqueHoraEntity transformarBloqueHora(Map<String, Object> bloqueHoraData) {
        BloqueHoraEntity bloqueHora = new BloqueHoraEntity();
        bloqueHora.setIdCentro((Integer) bloqueHoraData.get("idCentro"));
        bloqueHora.setMotivo((String) bloqueHoraData.get("motivo"));
        bloqueHora.setActivo((Boolean) bloqueHoraData.get("activo"));
        bloqueHora.setTiempoAtencion(LocalTime.parse((String) bloqueHoraData.get("tiempoAtencion")));
        bloqueHora.setHoraInicio(LocalTime.parse((String) bloqueHoraData.get("horaInicio")));
        bloqueHora.setBloqueoTemporal(LocalTime.parse((String) bloqueHoraData.get("bloqueoTemporal")));
        return bloqueHora;
    }

    public void eliminarBloquehora(Long id) {
        bloqueHoraRepository.deleteById(id);
    }

}
