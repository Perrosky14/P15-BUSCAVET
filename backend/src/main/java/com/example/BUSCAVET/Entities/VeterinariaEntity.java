package com.example.BUSCAVET.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Table(name = "Veterinaria", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@NoArgsConstructor
@AllArgsConstructor
@Data
public class VeterinariaEntity implements UserDetails {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    @Column(nullable = false)
    private String email;
    private String contrasenia;
    private int id_pais;
    private int id_segmento;
    private int id_tipo_institucion_vet;
    private int id_estado_institucion;
    private String rut;
    private String razon_social;
    private String nombre_comercial;
    private String nombre_1_rep_legal;
    private String nombre_2_rep_legal;
    private String resenia;
    private String resenia_confirmada;
    private String direccion;
    private String numero;
    private String tipo;
    private String telefono;
    private String codigo_area;
    private String celular;
    private int id_codigo_postal;
    private int id_comuna;
    private int id_provincia;
    private int id_region;
    private String geolocalizacion;
    private int id_zona_BDoc;
    private int id_servicio;
    private Boolean validado;
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToMany(mappedBy = "veterinaria", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<DoctorEntity> doctores = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(rol.name()));
    }

    @Override
    public String getPassword() {
        return this.contrasenia;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
