package com.example.BUSCAVET;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class BuscavetApplication {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private MascotaRepository mascotaRepository;

	@Autowired
	private VeterinariaRepository veterinariaRepository;

	public static void main(String[] args) {
		SpringApplication.run(BuscavetApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadData() {
		return (args) -> {
			// Crear y guardar un Usuario
			UsuarioEntity usuario = new UsuarioEntity(
					null, "hola", 1, "19.986.731-8", "Orlando", "Nicolas", "Solís", "Domínguez",
					1, 11, 6, 1999, 1, "hola", "Eucaliptus Seis", "18885", "casa", 1, 1, 1, 1,
					"En la tierra", 1, "hola", "+56957257105", "asd", "+56957257105", "orlando.solis.d@usach.cl",
					"instagram", "facebook", "asd", List.of()
			);
			usuarioRepository.save(usuario);

			// Crear y guardar una Veterinaria
			VeterinariaEntity veterinaria = new VeterinariaEntity(
					null, "hoa", 1, 1, 1, 1, "19.986.731-8", "razon social", "Veterinaria 1",
					"orlando", "felipe", "resenia 1", "resenia confirmada", "parque central", "13",
					"oficina", "+56957257105", "1", "+56957257105", 1, 1, 1, 1, "En la tierra", 1, 1, false, List.of()
			);
			veterinariaRepository.save(veterinaria);

			// Crear y guardar un Doctor
			DoctorEntity doctor = new DoctorEntity(
					null, "asd1234", 1, 2, 3, 1, "19.986.731-8", "18887d56x", "Orlando", "Nicolas",
					"Solis", "Dominguez", 1, 11, 6, 1999, 1, 1, 2, 3, "es buen doctor", "si", 1,
					"+56957257105", "area codigo", "+56957257105", 1, "orlando.solis.d@usach.cl", "facebook",
					"instagram", "Felipe", "+56957257105", "123t5", "+56957257105", "asdasd", false, veterinaria
			);
			doctorRepository.save(doctor);

			// Crear y guardar una Mascota
			MascotaEntity mascota = new MascotaEntity(
					null, 1, 1, 1, 1, "Spike", 7, 10, 2023, "hola", "Todas las vacunas al dia",
					0.50, "Cafe", 12.5, "holaaaa", usuario
			);
			mascotaRepository.save(mascota);
		};
	}
}
