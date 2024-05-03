package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class VeterinariaService {

    @Autowired
    VeterinariaRepository veterinariaRepository;

    public void guardarVeterinaria(){
        VeterinariaEntity veterinaria = new VeterinariaEntity();
    }

    public ArrayList<VeterinariaEntity> obtenerVeterinarias(){
        return (ArrayList<VeterinariaEntity>) veterinariaRepository.findAll();}

}
