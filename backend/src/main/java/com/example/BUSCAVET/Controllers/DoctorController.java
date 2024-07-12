package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.BloqueHorarioEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Services.BloqueHorarioService;
import com.example.BUSCAVET.Services.DoctorService;
import com.example.BUSCAVET.Services.VeterinariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @Autowired
    VeterinariaService veterinariaService;

    @Autowired
    BloqueHorarioService bloqueHorarioService;

    @GetMapping("/obtener-doctores")
    public ArrayList<DoctorEntity> obtenerDoctores(){
        return doctorService.obtenerDoctor();
    }

    @PostMapping("/obtener-doctor")
    public ResponseEntity<?> obtenerDoctorPorId(@RequestBody Map<String, Object> requestBody){
        Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
        DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idDoctor);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctor);
    }

    @GetMapping("/obtener-doctor-email")
    public ResponseEntity<?> obtenerDoctorPorEmail(@RequestBody Map<String, Object> requestBody) {
        String email = ((String) requestBody.get("email"));
        Optional<DoctorEntity> doctor = doctorService.obtenerPorEmail(email);
        if (!doctor.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga el email: " + email);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctor.get());
    }

    @PostMapping("/nuevo-doctor")
    public ResponseEntity<?> guardarDoctor(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            DoctorEntity doctor = doctorService.transformarDatosDoctor((Map<String, Object>) requestBody.get("doctor"));
            doctor.setVeterinaria(veterinaria);
            return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.guardarDoctor(doctor));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
    }

    @PostMapping("/crear-bloquesHora")
    public ResponseEntity<?> crearBloquesHora(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinario = ((Number) requestBody.get("idVeterinario")).longValue();
        DoctorEntity veterinario = doctorService.obtenerPorId(idVeterinario);
        if (veterinario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idVeterinario);
        }
        BloqueHorarioEntity bloqueHorario = bloqueHorarioService.transformarBloqueHorario((Map<String, Object>) requestBody.get("bloqueHorario"));
        bloqueHorarioService.crearBloquesHoras(veterinario, bloqueHorario);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se ha creado los bloques de hora para el veterinario de forma correcta.");
    }

    @PutMapping("/actualizar-doctor")
    public ResponseEntity<?> actualizarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
        if (doctorService.obtenerPorId(idDoctor) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idDoctor);
        }
        DoctorEntity doctorActualizado = doctorService.transformarDatosDoctor((Map<String, Object>) requestBody.get("doctorActualizado"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctorService.actualizarDoctor(idDoctor, doctorActualizado));
    }

    @DeleteMapping("/eliminar-doctor")
    public ResponseEntity<?> eliminarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
        if (doctorService.obtenerPorId(idDoctor) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor con la id: " + idDoctor);
        }
        doctorService.eliminarDoctor(idDoctor);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con la id: " + idDoctor + " se ha eliminado correctamente");
    }

}
