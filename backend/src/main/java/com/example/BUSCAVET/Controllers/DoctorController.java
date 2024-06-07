package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Services.DoctorService;
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

    @GetMapping("/obtener-doctores")
    public ArrayList<DoctorEntity> obtenerDoctores(){
        return doctorService.obtenerDoctor();
    }

    @GetMapping("/obtener-doctor")
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
    public ResponseEntity<?> guardarDoctor(@RequestBody DoctorEntity doctor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.guardarDoctor(doctor));
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
