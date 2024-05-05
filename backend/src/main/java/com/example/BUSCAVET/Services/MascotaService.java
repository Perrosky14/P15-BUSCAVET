package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Repositories.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class MascotaService {

    @Autowired
    MascotaRepository mascotaRepository;

    public void guardarMascota(int id_usuario,int id_categoria_animal,int id_especie,int id_raza, int id_sexo,
                               String nombre,int dia_nac,int mes_nac,int anio_nac,String otro, String historial_consulta,
                               Double estatura,String color,Double peso,String otro2){
        MascotaEntity mascota = new MascotaEntity();
        mascota.setId_usuario(id_usuario);
        mascota.setId_categoria_animal(id_categoria_animal);
        mascota.setId_especie(id_especie);
        mascota.setId_raza(id_raza);
        mascota.setId_sexo(id_sexo);
        mascota.setNombre(nombre);
        mascota.setDia_nac(dia_nac);
        mascota.setMes_nac(mes_nac);
        mascota.setAnio_nac(anio_nac);
        mascota.setOtro(otro);
        mascota.setHistorial_consulta(historial_consulta);
        mascota.setEstatura(estatura);
        mascota.setColor(color);
        mascota.setPeso(peso);
        mascota.setOtro2(otro2);
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
    public void eliminarMascota(Long id){
        mascotaRepository.deleteById(id);
    }
}
