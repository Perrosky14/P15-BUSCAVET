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

    public void guardarDoctor(){
        DoctorEntity doctor = new DoctorEntity();
    }

    public ArrayList<DoctorEntity> obtenerDoctor(){
        return (ArrayList<DoctorEntity>) doctorRepository.findAll();}
}
