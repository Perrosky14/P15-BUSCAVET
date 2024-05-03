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

    public void guardarSuperAdmin(){
        SuperAdminEntity superAdmin = new SuperAdminEntity();
    }

    public ArrayList<SuperAdminEntity> obtenerSuperAdmin(){
        return (ArrayList<SuperAdminEntity>) superAdminRepository.findAll();}

}
