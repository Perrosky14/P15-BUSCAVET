package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
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
@RequestMapping("/veterinaria")
public class VeterinariaController {

    @Autowired
    VeterinariaService veterinariaService;

    @Autowired
    DoctorService doctorService;

    @GetMapping("/obtener-veterinarias")
    public ArrayList<VeterinariaEntity> obtenerVeterinaria(){return veterinariaService.obtenerVeterinarias();}

    @GetMapping("/obtener-veterinaria")
    public ResponseEntity<?> obtenerVeterinariaPorId(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado niguna veterinaria que tenga id: " + idVeterinaria);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(veterinaria);
    }

    @GetMapping("/obtener-veterinaria-email")
    public ResponseEntity<?> obtenerVeterinariaPorEmail(@RequestBody Map<String, Object> requestBody) {
        String email = ((String) requestBody.get("email"));
        Optional<VeterinariaEntity> veterinaria = veterinariaService.obtenerPorEmail(email);
        if (!veterinaria.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga el email: " + email);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(veterinaria.get());
    }

    @PostMapping("/nueva-veterinaria")
    public ResponseEntity<?> guardarVeterinaria(@RequestBody VeterinariaEntity veterinaria){
        return ResponseEntity.status(HttpStatus.CREATED).body(veterinariaService.guardarVeterinaria(veterinaria));
    }

    @PutMapping("/actualizar-veterinaria")
    public ResponseEntity<?> actualizarVeterinaria(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        if (veterinariaService.obtenerPorId(idVeterinaria) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
        }
        VeterinariaEntity veterinariaActualizada = veterinariaService.transformarDatosVeterinaria((Map<String, Object>) requestBody.get("veterinariaActualizada"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(veterinariaService.actualizarVeterinaria(idVeterinaria, veterinariaActualizada));
    }

    @DeleteMapping("/eliminar-veterinaria")
    public ResponseEntity<?> eliminarVeterinaria(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        if (veterinariaService.obtenerPorId(idVeterinaria) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria con la id: " + idVeterinaria);
        }
        veterinariaService.eliminarVeterinaria(idVeterinaria);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("La veterinaria con la id: " + idVeterinaria + " se ha eliminado correctamente");
    }

    @PostMapping("/obtener-doctores-veterinaria")
    public ResponseEntity<?> obtenerDoctores(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        if (veterinariaService.obtenerPorId(idVeterinaria) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria con la id: " + idVeterinaria);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctorService.obtenerPorVeterinaria(idVeterinaria));
    }

    @PostMapping("/crear-doctor")
    public ResponseEntity<?> registrarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        DoctorEntity doctor = doctorService.transformarDatosDoctor((Map<String, Object>) requestBody.get("doctor"));
        if (idVeterinaria == 0) {
            doctorService.guardarDoctor(doctor);
            return ResponseEntity.status(HttpStatus.CREATED).body("El doctor " + doctor.getNombre1() + " " + doctor.getApellido1() + " independiente ha sido registrado correctamente.");
        }
        else {
            VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
            if (veterinaria != null) {
                doctor.setVeterinaria(veterinaria);
                doctorService.guardarDoctor(doctor);
                return ResponseEntity.status(HttpStatus.CREATED).body("El doctor " + doctor.getNombre1() + " " + doctor.getApellido1() + " ha sido registrado correctamente por la veterinaria con la id: " + idVeterinaria);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
            }
        }
    }

    @PutMapping("/modificar-doctor")
    public ResponseEntity<?> modificarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
            DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
            if (doctor != null) {
                if (veterinaria.equals(doctor.getVeterinaria())) {
                    doctor = doctorService.transformarDatosDoctor((Map<String, Object>) requestBody.get("doctorActualizado"));
                    doctorService.actualizarDoctor(idDoctor, doctor);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con la id: " + idDoctor + " se ha modificado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("La veterinaria con la id: " + idVeterinaria + " no puede modificar el doctor con id: " + idDoctor + ", ya que la veterinaria no creó dicho doctor. No tiene dicha autorización.");
                }
            } else  {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria + " para eliminar el doctor.");
        }
    }

    @DeleteMapping("/eliminar-doctor")
    public ResponseEntity<?> eliminarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
            DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
            if (doctor != null) {
                if (veterinaria.equals(doctor.getVeterinaria())) {
                    doctorService.eliminarDoctor(idDoctor);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con la id: "+ idDoctor + " se ha eliminado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("La veterinaria con la id: " + idVeterinaria + " no puede eliminar el doctor con la id: " + idDoctor + ", ya que la veterinaria no creó dicho doctor. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria + " para eliminar el doctor.");
        }
    }

}
