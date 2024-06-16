package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Repositories.DoctorRepository;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResgisterEmailService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    VeterinariaRepository veterinariaRepository;

    @Autowired
    SuperAdminRepository superAdminRepository;

    public boolean emailRegistrado(String email) {
        if(usuarioRepository.findByEmail(email).isPresent()) {
            return true;
        } else if (doctorRepository.findByEmail(email).isPresent()) {
            return true;
        } else if (veterinariaRepository.findByEmail(email).isPresent()) {
            return true;
        } else if (superAdminRepository.findByEmail(email).isPresent()) {
            return true;
        }
        return false;
    }
}
