package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

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
}
