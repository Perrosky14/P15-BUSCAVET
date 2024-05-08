package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.SuperAdminEntity;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
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
    SuperAdminService superAdminService;

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

    @PostMapping("/{idSuperAdmin}")
    public ResponseEntity<?> registrarVeterinaria(@PathVariable Long idSuperAdmin, @RequestBody VeterinariaEntity veterinaria){
        SuperAdminEntity superAdmin = superAdminService.obtenerPorId(idSuperAdmin);
        if (superAdmin != null) {
            veterinaria.setSuperAdmin(superAdmin);
            veterinariaService.guardarVeterinaria(veterinaria);
            return ResponseEntity.status(HttpStatus.CREATED).body("La veterinaria " + veterinaria.getNombre_comercial() + " ha sido registrada correctamente por el superAdmin con el ID: " + idSuperAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

}
