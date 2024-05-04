package com.example.BUSCAVET.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

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

}
