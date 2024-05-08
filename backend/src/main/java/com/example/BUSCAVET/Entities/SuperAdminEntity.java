package com.example.BUSCAVET.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "SuperAdmin")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SuperAdminEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String correo;
    private String contrasenia;

    @OneToMany(mappedBy = "superAdmin",cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<VeterinariaEntity> veterinarios = new ArrayList<>();

}
