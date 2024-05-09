package com.example.BUSCAVET.Controllers;


import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Services.MascotaService;
import com.example.BUSCAVET.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/mascota")
public class MascotaController {
    @Autowired
    MascotaService mascotaService;

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/")
    public ArrayList<MascotaEntity> obtenerMascotas(){
        return mascotaService.obtenerMascotas();
    }

    @GetMapping("/{id}")
    public MascotaEntity obtenerMascotaPorID(@PathVariable Long id){
        return mascotaService.obtenerPorId(id);
    }

    @GetMapping("/nueva-mascota")
    public String mascota(){
        return "nueva-mascota";
    }
    @PostMapping("/nueva-mascota")
    public String guardarMascota(@RequestBody MascotaEntity mascota){
        mascotaService.guardarMascota(mascota);
        return "redirect:/nueva-mascota";
    }

    @PutMapping("/{id}")
    public MascotaEntity actualizarMascota(@PathVariable Long id, @RequestBody MascotaEntity mascotaActualizada){
        return mascotaService.actualizarMascota(id, mascotaActualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminarMascota(@PathVariable Long id){
        mascotaService.eliminarMascota(id);
    }

}

