package com.example.BUSCAVET.Entities;

        import com.fasterxml.jackson.annotation.JsonBackReference;
        import com.fasterxml.jackson.annotation.JsonFormat;
        import jakarta.persistence.*;
        import lombok.AllArgsConstructor;
        import lombok.Data;
        import lombok.NoArgsConstructor;
        import org.antlr.v4.runtime.misc.NotNull;

        import java.time.LocalTime;

@Entity
@Table(name = "BloqueHorario")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BloqueHorarioEntity {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;
    private String turno;
    private Integer cantidadBloquesPorDia;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime tiempoBloques;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime tiempoPausas;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime tiempoTrabajoTurno;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime horaInicio;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime horaFinal;

    @OneToOne
    @JoinColumn(name = "id_veterinario_asociado")
    @JsonBackReference(value = "doctor_bloqueHorario")
    private DoctorEntity doctor;
}
