package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.MascotaEntity;
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

    public MascotaEntity transformarMascota(Map<String, Object> mascotaData) {
        MascotaEntity mascota = new MascotaEntity();
        mascota.setId_categoria_animal(Integer.parseInt(mascotaData.get("id_categoria_animal").toString()));
        mascota.setId_especie(Integer.parseInt(mascotaData.get("id_especie").toString()));
        mascota.setId_raza(Integer.parseInt(mascotaData.get("id_raza").toString()));
        mascota.setId_sexo(Integer.parseInt(mascotaData.get("id_sexo").toString()));
        mascota.setNombre(mascotaData.get("nombre").toString());
        mascota.setDia_nac(Integer.parseInt(mascotaData.get("dia_nac").toString()));
        mascota.setMes_nac(Integer.parseInt(mascotaData.get("mes_nac").toString()));
        mascota.setAnio_nac(Integer.parseInt(mascotaData.get("anio_nac").toString()));
        mascota.setOtro(mascotaData.get("otro").toString());
        mascota.setHistorial_consulta(mascotaData.get("historial_consulta").toString());
        mascota.setEstatura(Double.parseDouble(mascotaData.get("estatura").toString()));
        mascota.setColor(mascotaData.get("color").toString());
        mascota.setPeso(Double.parseDouble(mascotaData.get("peso").toString()));
        mascota.setOtro2(mascotaData.get("otro2").toString());
        return mascota;
    }


    public void eliminarMascota(Long id){
        mascotaRepository.deleteById(id);
    }
}
