package com.example.BUSCAVET.Config;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.SuperAdminEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Repositories.DoctorRepository;
import com.example.BUSCAVET.Repositories.SuperAdminRepository;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    VeterinariaRepository veterinariaRepository;

    @Autowired
    SuperAdminRepository superAdminRepository;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public UserDetailsService userDetailService() {
        return email -> {
            Optional<UsuarioEntity> usuario = usuarioRepository.findByEmail(email);
            Optional<DoctorEntity> doctor = doctorRepository.findByEmail(email);
            Optional<VeterinariaEntity> veterinaria = veterinariaRepository.findByEmail(email);
            Optional<SuperAdminEntity> superAdmin = superAdminRepository.findByEmail(email);
            if (usuario.isPresent()) {
                return usuario.get();
            } else if (doctor.isPresent()) {
                return doctor.get();
            } else if (veterinaria.isPresent()) {
                return veterinaria.get();
            } else if (superAdmin.isPresent()) {
                return superAdmin.get();
            }
            throw new UsernameNotFoundException("Usuario no encontrado");
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
