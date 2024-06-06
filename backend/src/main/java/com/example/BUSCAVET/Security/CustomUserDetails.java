package com.example.BUSCAVET.Security;

import com.example.BUSCAVET.Entities.Rol;
import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetails extends UserDetails {
    String getNombre();
    Long getId();
    Rol getRol();
}
