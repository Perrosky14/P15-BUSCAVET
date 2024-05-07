package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Services.VeterinariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/veterinaria")
public class VeterinariaController {

    @Autowired
    VeterinariaService veterinariaService;

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

}
