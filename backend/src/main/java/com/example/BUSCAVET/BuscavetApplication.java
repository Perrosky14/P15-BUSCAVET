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

}
