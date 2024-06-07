package com.example.BUSCAVET.Security;

import com.example.BUSCAVET.Repositories.DoctorRepository;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Security.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTService jwtService;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    VeterinariaRepository veterinariaRepository;

    @Autowired
    SuperAdminRepository superAdminRepository;

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        Optional<?> user = Optional.empty();
        if (usuarioRepository.findByEmail(request.getEmail()).isPresent()) {
            user = usuarioRepository.findByEmail(request.getEmail());
        } else if (doctorRepository.findByEmail(request.getEmail()).isPresent()) {
            user = doctorRepository.findByEmail(request.getEmail());
        } else if (veterinariaRepository.findByEmail(request.getEmail()).isPresent()) {
            user = veterinariaRepository.findByEmail(request.getEmail());
        } else if (superAdminRepository.findByEmail(request.getEmail()).isPresent()) {
            user = superAdminRepository.findByEmail(request.getEmail());
        }
        String token = jwtService.getToken((UserDetails) user.get());
        return AuthResponse.builder().token(token).build();
    }

}
