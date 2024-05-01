package Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;


@Entity
@Table(name = "Mascota")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MascotaEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int id_usuario;
    private int id_categoria_animal;
    private int id_especie;
    private int id_raza;
    private int id_sexo;
    private String nombre;
    private int dia_nac;
    private int mes_nac;
    private int año_nac;
    private String otro;
    private String historial_consulta;
    private Double estatura;
    private String color;
    private Double peso;
    private String otro2;

}
