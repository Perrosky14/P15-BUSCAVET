package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.SuperAdminEntity;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Services.DoctorService;
import com.example.BUSCAVET.Services.SuperAdminService;
import com.example.BUSCAVET.Services.VeterinariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/veterinaria")
public class VeterinariaController {

    @Autowired
    VeterinariaService veterinariaService;

    @Autowired
    DoctorService doctorService;

    @GetMapping("/")
    public ArrayList<VeterinariaEntity> obtenerVeterinaria(){return veterinariaService.obtenerVeterinarias();}

    @GetMapping("/{id}")
    public VeterinariaEntity obtenerVeterinariaPorId(@PathVariable Long id){return veterinariaService.obtenerPorId(id);}

    @GetMapping("/nueva-veterinaria")
    public String veterinaria(){
        return "nueva-veterinaria";
    }

    @PostMapping("/nueva-veterinaria")
    public String guardarVeterinaria(@RequestBody VeterinariaEntity veterinaria){
        veterinariaService.guardarVeterinaria(veterinaria);
        return "redirect:/nueva-veterinaria";
    }

    @PutMapping("/{id}")
    public VeterinariaEntity actualizarVeterinaria(@PathVariable Long id, @RequestBody VeterinariaEntity veterinariaActualizada){
        return veterinariaService.actualizarVeterinaria(id, veterinariaActualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminarVeterinaria(@PathVariable Long id){
        veterinariaService.eliminarVeterinaria(id);
    }

    @PostMapping("/crear-doctor/{idVeterinaria}")
    public ResponseEntity<?> registrarDoctor(@PathVariable Long idVeterinaria, @RequestBody DoctorEntity doctor){
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            doctor.setVeterinaria(veterinaria);
            doctorService.guardarDoctor(doctor);
            return ResponseEntity.status(HttpStatus.CREATED).body("El doctor " + doctor.getNombre1() + " " + doctor.getApellido1() + " ha sido registrado correctamente por la veterinaria con el ID: " + idVeterinaria);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
        }
    }

    @PutMapping("/actualizar-doctor/{idVeterinaria}/{idDoctor}")
    public ResponseEntity<?> modificarDoctor(@PathVariable Long idVeterinaria, @PathVariable Long idDoctor, @RequestBody DoctorEntity doctorActualizado){
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
            if (doctor != null) {
                if (veterinaria.equals(doctor.getVeterinaria())) {
                    doctorService.actualizarDoctor(idDoctor, doctorActualizado);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con id: " + idDoctor + ", se ha modificado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("La veterinaria con id: " + idVeterinaria + " no puede modificar el doctor con id: " + idDoctor + ", ya que la veterinaria no creó dicho doctor. No tiene dicha autorización.");
                }
            } else  {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun doctor que tenga id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga el id: " + idVeterinaria + ", para eliminar el doctor.");
        }
    }

    @DeleteMapping("/eliminar-doctor/{idVeterinaria}/{idDoctor}")
    public ResponseEntity<?> eliminarDoctor(@PathVariable Long idVeterinaria, @PathVariable Long idDoctor){
        VeterinariaEntity veterinaria = veterinariaService.obtenerPorId(idVeterinaria);
        if (veterinaria != null) {
            DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
            if (doctor != null) {
                if (veterinaria.equals(doctor.getVeterinaria())) {
                    doctorService.eliminarDoctor(idDoctor);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con id: "+ idDoctor + ", se ha eliminado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("La veterinaria con id: " + idVeterinaria + " no puede eliminar el doctor con id: " + idDoctor + ", ya que la veterinaria no creó dicho doctor. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna veterinaria que tenga el id: " + idVeterinaria + ", para eliminar el doctor.");
        }
    }

}