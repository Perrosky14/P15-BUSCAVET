package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Repositories.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

@Service
public class MascotaService {

    @Autowired
    MascotaRepository mascotaRepository;

    public void guardarMascota(MascotaEntity mascota){
        mascotaRepository.save(mascota);
    }

    public ArrayList<MascotaEntity> obtenerMascotas(){
        return (ArrayList<MascotaEntity>) mascotaRepository.findAll();}

    public MascotaEntity obtenerPorId(Long id){
        return mascotaRepository.findById(id).orElse(null);}

    public MascotaEntity actualizarMascota(Long id, MascotaEntity mascotaActualizada){
        MascotaEntity mascotaExistente = mascotaRepository.findById(id).orElse(null);
        if (mascotaExistente != null){
            mascotaExistente.setId_categoria_animal(mascotaActualizada.getId_categoria_animal());
            mascotaExistente.setId_especie(mascotaActualizada.getId_especie());
            mascotaExistente.setId_raza(mascotaActualizada.getId_raza());
            mascotaExistente.setId_sexo(mascotaActualizada.getId_sexo());
            mascotaExistente.setNombre(mascotaActualizada.getNombre());
            mascotaExistente.setDia_nac(mascotaActualizada.getDia_nac());
            mascotaExistente.setMes_nac(mascotaActualizada.getMes_nac());
            mascotaExistente.setAnio_nac(mascotaActualizada.getAnio_nac());
            mascotaExistente.setOtro(mascotaActualizada.getOtro());
            mascotaExistente.setHistorial_consulta(mascotaActualizada.getHistorial_consulta());
            mascotaExistente.setEstatura(mascotaActualizada.getEstatura());
            mascotaExistente.setColor(mascotaActualizada.getColor());
            mascotaExistente.setPeso(mascotaActualizada.getPeso());
            mascotaExistente.setOtro2(mascotaActualizada.getOtro2());
            return mascotaRepository.save(mascotaExistente);
        }
        return null;
    }

    public MascotaEntity transformarMascota(Map<String, Object> mascotaMap) {
        MascotaEntity mascota = new MascotaEntity();

        System.out.println(mascotaMap);
        // Manejo seguro de valores nulos o vacíos con valores predeterminados o lanzando excepciones
        mascota.setId_categoria_animal((String) getOrDefault(mascotaMap.get("id_categoria_animal"), ""));
        mascota.setId_especie((String) getOrDefault(mascotaMap.get("especie"), ""));
        mascota.setId_raza((String) getOrDefault(mascotaMap.get("raza"), ""));
        mascota.setId_sexo((String) getOrDefault(mascotaMap.get("sexo"), ""));
        mascota.setNombre((String) getOrDefault(mascotaMap.get("nombre"), ""));
        mascota.setDia_nac(parseIntOrDefault(mascotaMap.get("dia"), 1));
        mascota.setMes_nac(parseIntOrDefault(mascotaMap.get("mes"), 1));
        mascota.setAnio_nac(parseIntOrDefault(mascotaMap.get("anio"), 2020));
        mascota.setOtro((String) getOrDefault(mascotaMap.get("otro"), ""));
        mascota.setColor((String) getOrDefault(mascotaMap.get("color"), ""));
        mascota.setEstatura(parseIntOrDefault(mascotaMap.get("estatura"), 0));
        mascota.setPeso(parseIntOrDefault(mascotaMap.get("peso"), 0));
        mascota.setOtro2((String) getOrDefault(mascotaMap.get("otro2"), ""));

        return mascota;
    }

    private Integer parseIntOrNull(Object value) {
        if (value == null) {
            return null;
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private Integer parseIntOrDefault(Object value, int defaultValue) {
        if (value == null) {
            return defaultValue;
        }
        try {
            return Integer.parseInt(value.toString());
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    private Object getOrDefault(Object value, Object defaultValue) {
        return value != null ? value : defaultValue;
    }

    public ArrayList<MascotaEntity> buscarTodosPorUsuario(UsuarioEntity usuario){
        return mascotaRepository.findAllByUsuario(usuario);
    }

    public void eliminarMascota(Long id){
        mascotaRepository.deleteById(id);
    }
}
