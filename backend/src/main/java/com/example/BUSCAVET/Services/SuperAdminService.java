package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;

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

    public SuperAdminEntity transformarSuperAdmin(Map<String, Object> superAdminData) {
        SuperAdminEntity superAdmin = new SuperAdminEntity();
        superAdmin.setCorreo((String) superAdminData.get("correo"));
        superAdmin.setContrasenia((String) superAdminData.get("contrasenia"));
        return superAdmin;
    }
    public void eliminarSuperAdmin(Long id){superAdminRepository.deleteById(id);}

}
