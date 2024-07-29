package com.example.BUSCAVET.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Autowired
    JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    AuthenticationProvider authProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf ->
                        csrf.disable())
                .authorizeHttpRequests(authRequest -> authRequest
                                .requestMatchers(HttpMethod.POST,"/login", "/doctor/nuevo-doctor", "/superAdmin/nuevo-superAdmin", "/usuario/nuevo-usuario", "/veterinaria/nueva-veterinaria", "/registroEmail", "/veterinaria/crear-doctor").permitAll()
                                .requestMatchers(HttpMethod.GET,"/veterinaria/obtener-veterinarias").permitAll()
                                .anyRequest().authenticated()
                        )
                .sessionManagement( sessionManager -> sessionManager
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}