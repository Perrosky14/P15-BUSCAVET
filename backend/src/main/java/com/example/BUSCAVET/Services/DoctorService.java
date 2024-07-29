package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.DTO.CrearDoctorDTO;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.Rol;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Repositories.DoctorRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    VeterinariaRepository veterinariaRepository;

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthResponse guardarDoctor(DoctorEntity doctor){
        doctor.setRol(Rol.VETERINARIO);
        doctor.setContrasenia(passwordEncoder.encode(doctor.getContrasenia()));
        doctorRepository.save(doctor);
        return AuthResponse.builder().token(jwtService.getToken(doctor)).build();
    }

    public ArrayList<DoctorEntity> obtenerDoctor(){
        return (ArrayList<DoctorEntity>) doctorRepository.findAll();}

    public DoctorEntity obtenerPorId(Long id){
        return doctorRepository.findById(id).orElse(null);}

    public Optional<DoctorEntity> obtenerPorEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public ArrayList<DoctorEntity> obtenerPorVeterinaria(Long idVeterinaria) {
        VeterinariaEntity veterinaria = veterinariaRepository.findById(idVeterinaria).orElse(null);
        if (veterinaria != null) {
            return doctorRepository.findAllByVeterinaria(veterinaria);
        }
        return null;
    }

    public DoctorEntity actualizarDoctor(Long id, DoctorEntity doctorActualizado){
        DoctorEntity doctorExistente = doctorRepository.findById(id).orElse(null);
        if (doctorExistente != null){
            doctorExistente.setContrasenia(passwordEncoder.encode(doctorActualizado.getContrasenia()));
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

    public DoctorEntity transformarDatosDoctor(CrearDoctorDTO doctorData) {
        DoctorEntity doctor = new DoctorEntity();
        doctor.setContrasenia((String) doctorData.contrasenia);
        doctor.setId_institucion_vet_1((String) doctorData.id_institucion_vet_1);
        doctor.setId_institucion_vet_2((String) doctorData.id_institucion_vet_2);
        doctor.setId_institucion_vet_3((String) doctorData.id_institucion_vet_3);
        doctor.setId_pais((Integer) doctorData.id_pais);
        doctor.setRut((String) doctorData.rut);
        doctor.setMatricula((String) doctorData.matricula);
        doctor.setNombre1((String) doctorData.nombre1);
        doctor.setNombre2((String) doctorData.nombre2);
        doctor.setApellido1((String) doctorData.apellido1);
        doctor.setApellido2((String) doctorData.apellido2);
        doctor.setId_genero((Integer) doctorData.id_genero);
        doctor.setDia_nac((Integer) doctorData.dia_nac);
        doctor.setMes_nac((Integer) doctorData.mes_nac);
        doctor.setAnio_nac((Integer) doctorData.anio_nac);
        doctor.setId_nacionalidad((Integer) doctorData.id_nacionalidad);
        doctor.setId_especialidad_1((String) doctorData.id_especialidad_1);
        doctor.setId_especialidad_2((Integer) doctorData.id_especialidad_2);
        doctor.setId_especialidad_3((Integer) doctorData.id_especialidad_3);
        doctor.setResenia((String) doctorData.resenia);
        doctor.setResenia_confirmada((String) doctorData.resenia_confirmada);
        doctor.setId_estado_medico_vet((Integer) doctorData.id_estado_medico_vet);
        doctor.setTelefono((String) doctorData.telefono);
        doctor.setCodigo_area((String) doctorData.codigo_area);
        doctor.setCelular((String) doctorData.celular);
        doctor.setId_convenio((Integer) doctorData.id_convenio);
        doctor.setEmail((String) doctorData.email);
        doctor.setRRSS1((String) doctorData.RRSS1);
        doctor.setRRSS2((String) doctorData.RRSS2);
        doctor.setAsistente_nom((String) doctorData.asistente_nom);
        doctor.setAsistente_telefono((String) doctorData.asistente_telefono);
        doctor.setAsistente_codigo_area((String) doctorData.asistente_codigo_area);
        doctor.setAsistente_celular((String) doctorData.asistente_celular);
        doctor.setOtro((String) doctorData.otro);
        doctor.setValidado((Boolean) doctorData.validado);
        return doctor;
    }

    public void eliminarDoctor(Long id){doctorRepository.deleteById(id);}

}
