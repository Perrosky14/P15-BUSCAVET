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
@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @Autowired
    VeterinariaService veterinariaService;

    @GetMapping("/")
    public ArrayList<DoctorEntity> obtenerDoctores(){
        return doctorService.obtenerDoctor();
    }

    @GetMapping("/{id}")
    public DoctorEntity obtenerDoctorPorId(@PathVariable Long id){
        return doctorService.obtenerPorId(id);
    }

    @GetMapping("/nuevo-doctor")
    public String doctor(){
        return "nuevo-doctor";
    }
    @PostMapping("/nuevo-doctor")
    public String guardarDoctor(@RequestBody DoctorEntity doctor) {
        doctorService.guardarDoctor(doctor);
        return "redirect:/nuevo-doctor";
    }

    @PutMapping("/{id}")
    public DoctorEntity actualizarDoctor(@PathVariable Long id, @RequestBody DoctorEntity doctorActualizado){
        return doctorService.actualizarDoctor(id, doctorActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarDoctor(@PathVariable Long id){
        doctorService.eliminarDoctor(id);
    }

    @PostMapping("/{idVeterinaria}")
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
}
