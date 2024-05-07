package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Repositories.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    public void guardarDoctor(DoctorEntity doctor){
        doctorRepository.save(doctor);
    }

    public ArrayList<DoctorEntity> obtenerDoctor(){
        return (ArrayList<DoctorEntity>) doctorRepository.findAll();}

    public DoctorEntity obtenerPorId(Long id){
        return doctorRepository.findById(id).orElse(null);}

    public DoctorEntity actualizarDoctor(Long id, DoctorEntity doctorActualizado){
        DoctorEntity doctorExistente = doctorRepository.findById(id).orElse(null);
        if (doctorExistente != null){
            doctorExistente.setContrasenia(doctorActualizado.getContrasenia());
            doctorExistente.setId_institucion_vet_1(doctorActualizado.getId_institucion_vet_1());
            doctorExistente.setId_institucion_vet_2(doctorActualizado.getId_institucion_vet_2());
            doctorExistente.setId_institucion_vet_3(doctorActualizado.getId_institucion_vet_3());
            doctorExistente.setId_pais(doctorActualizado.getId_pais());
            doctorExistente.setRut(doctorActualizado.getRut());
            doctorExistente.setMatricula(doctorActualizado.getMatricula());
            doctorExistente.setNombre1(doctorActualizado.getNombre1());
            doctorExistente.setNombre2(doctorActualizado.getNombre2());
            doctorExistente.setApellido1(doctorActualizado.getApellido1());
            doctorExistente.setApellido2(doctorActualizado.getApellido2());
            doctorExistente.setId_genero(doctorActualizado.getId_genero());
            doctorExistente.setDia_nac(doctorActualizado.getDia_nac());
            doctorExistente.setMes_nac(doctorActualizado.getMes_nac());
            doctorExistente.setAnio_nac(doctorActualizado.getAnio_nac());
            doctorExistente.setId_nacionalidad(doctorActualizado.getId_nacionalidad());
            doctorExistente.setId_especialidad_1(doctorActualizado.getId_especialidad_1());
            doctorExistente.setId_especialidad_2(doctorActualizado.getId_especialidad_2());
            doctorExistente.setId_especialidad_3(doctorActualizado.getId_especialidad_3());
            doctorExistente.setResenia(doctorActualizado.getResenia());
            doctorExistente.setResenia_confirmada(doctorActualizado.getResenia_confirmada());
            doctorExistente.setId_estado_medico_vet(doctorActualizado.getId_estado_medico_vet());
            doctorExistente.setTelefono(doctorActualizado.getTelefono());
            doctorExistente.setCodigo_area(doctorActualizado.getCodigo_area());
            doctorExistente.setCelular(doctorActualizado.getCelular());
            doctorExistente.setId_convenio(doctorActualizado.getId_convenio());
            doctorExistente.setEmail(doctorActualizado.getEmail());
            doctorExistente.setRRSS1(doctorActualizado.getRRSS1());
            doctorExistente.setRRSS2(doctorActualizado.getRRSS2());
            doctorExistente.setAsistente_nom(doctorActualizado.getAsistente_nom());
            doctorExistente.setAsistente_telefono(doctorActualizado.getAsistente_telefono());
            doctorExistente.setAsistente_codigo_area(doctorActualizado.getAsistente_codigo_area());
            doctorExistente.setAsistente_celular(doctorActualizado.getAsistente_celular());
            doctorExistente.setOtro(doctorActualizado.getOtro());
            return doctorRepository.save(doctorExistente);
        }
        return null;
    }

    public void eliminarDoctor(Long id){doctorRepository.deleteById(id);}

}
