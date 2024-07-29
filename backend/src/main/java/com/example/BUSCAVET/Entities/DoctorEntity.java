package com.example.BUSCAVET.Entities;

import com.example.BUSCAVET.Security.CustomUserDetails;
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
@Table(name = "Doctor", uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
@NoArgsConstructor
@AllArgsConstructor
@Data

public class DoctorEntity implements CustomUserDetails {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String contrasenia;
    private String id_institucion_vet_1;
    private String id_institucion_vet_2;
    private String id_institucion_vet_3;
    private int id_pais;
    private String rut;
    private String matricula;
    private String nombre1;
    private String nombre2;
    private String apellido1;
    private String apellido2;
    private int id_genero;
    private int dia_nac;
    private int mes_nac;
    private int anio_nac;
    private int id_nacionalidad;
    private String id_especialidad_1;
    private int id_especialidad_2;
    private int id_especialidad_3;
    private String resenia;
    private String resenia_confirmada;
    private int id_estado_medico_vet;
    private String telefono;
    private String codigo_area;
    private String celular;
    private int id_convenio;
    @Column(nullable = false)
    private String email;
    private String RRSS1;
    private String RRSS2;
    private String asistente_nom;
    private String asistente_telefono;
    private String asistente_codigo_area;
    private String asistente_celular;
    private String otro;
    private Boolean validado;
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @ManyToOne
    @JoinColumn(name = "id_veterinaria_asociada")
    @JsonBackReference
    private VeterinariaEntity veterinaria;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "doctor_bloqueHora")
    private List<BloqueHoraEntity> bloqueHoras = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "id_bloque_horario_asociado")
    @JsonBackReference(value = "doctor_bloqueHorario")
    private BloqueHorarioEntity bloqueHorario;

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
    public String getNombre() {
        return this.nombre1;
    }

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    public Rol getRol() {
        return this.rol;
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
