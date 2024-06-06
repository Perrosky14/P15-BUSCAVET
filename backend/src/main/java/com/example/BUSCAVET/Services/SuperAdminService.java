package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

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

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthResponse guardarSuperAdmin(SuperAdminEntity superAdmin){
        superAdmin.setRol(Rol.SUPERADMIN);
        superAdmin.setContrasenia(passwordEncoder.encode(superAdmin.getContrasenia()));
        superAdminRepository.save(superAdmin);
        return AuthResponse.builder().token(jwtService.getToken(superAdmin)).build();
    }

    public ArrayList<SuperAdminEntity> obtenerSuperAdmin(){
        return (ArrayList<SuperAdminEntity>) superAdminRepository.findAll();}

    public SuperAdminEntity obtenerPorId(Long id){
        return superAdminRepository.findById(id).orElse(null);}

    public Optional<SuperAdminEntity> obtenerPorEmail(String email) {
        return superAdminRepository.findByEmail(email);
    }

    public SuperAdminEntity actualizarSuperAdmin(Long id, SuperAdminEntity superAdminActualizado){
        SuperAdminEntity superAdminExistente = superAdminRepository.findById(id).orElse(null);
        if (superAdminExistente != null){
            superAdminExistente.setEmail(superAdminActualizado.getEmail());
            superAdminExistente.setContrasenia(superAdminActualizado.getContrasenia());
            return superAdminRepository.save(superAdminExistente);
        }
        return null;
    }

    public SuperAdminEntity transformarSuperAdmin(Map<String, Object> superAdminData) {
        SuperAdminEntity superAdmin = new SuperAdminEntity();
        superAdmin.setEmail((String) superAdminData.get("correo"));
        superAdmin.setContrasenia((String) superAdminData.get("contrasenia"));
        return superAdmin;
    }
    public void eliminarSuperAdmin(Long id){superAdminRepository.deleteById(id);}

}
