package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class SuperAdminService {

    @Autowired
    SuperAdminRepository superAdminRepository;

    @Autowired
    VeterinariaService veterinariaService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    MascotaService mascotaService;

    public void guardarSuperAdmin(SuperAdminEntity superAdmin){;
        superAdminRepository.save(superAdmin);
    }

    public ArrayList<SuperAdminEntity> obtenerSuperAdmin(){
        return (ArrayList<SuperAdminEntity>) superAdminRepository.findAll();}

    public SuperAdminEntity obtenerPorId(Long id){
        return superAdminRepository.findById(id).orElse(null);}

    public SuperAdminEntity actualizarSuperAdmin(Long id, SuperAdminEntity superAdminActualizado){
        SuperAdminEntity superAdminExistente = superAdminRepository.findById(id).orElse(null);
        if (superAdminExistente != null){
            superAdminExistente.setCorreo(superAdminActualizado.getCorreo());
            superAdminExistente.setContrasenia(superAdminActualizado.getContrasenia());
            return superAdminRepository.save(superAdminExistente);
        }
        return null;
    }
    public void eliminarSuperAdmin(Long id){superAdminRepository.deleteById(id);}

    public VeterinariaEntity actualizarVeterinaria(Long idVeterinaria, VeterinariaEntity veterinariaActulizada){
        return veterinariaService.actualizarVeterinaria(idVeterinaria, veterinariaActulizada);
    }

    public DoctorEntity actualizarDoctor(Long idDoctor, DoctorEntity doctorActualizado){
        return doctorService.actualizarDoctor(idDoctor, doctorActualizado);
    }

    public UsuarioEntity actualizarUsuario(Long idUsuario, UsuarioEntity usuarioActulizado){
        return usuarioService.actualizarUsuario(idUsuario, usuarioActulizado);
    }

    public MascotaEntity actualizarMascota(Long idMascota, MascotaEntity mascotaActualizada){
        return mascotaService.actualizarMascota(idMascota, mascotaActualizada);
    }

    public void eliminarVeterinaria(Long idVeterinaria){
        veterinariaService.eliminarVeterinaria(idVeterinaria);
    }

    public void eliminarDoctor(Long idDoctor){
        doctorService.eliminarDoctor(idDoctor);
    }

    public void eliminarUsuario(Long idUsuario){
        usuarioService.eliminarUsuario(idUsuario);
    }

    public void eliminarMascota(Long idMascota){
        mascotaService.eliminarMascota(idMascota);
    }

}
