package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.SuperAdminEntity;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class SuperAdminService {

    @Autowired
    SuperAdminRepository superAdminRepository;

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
}
