package com.example.BUSCAVET.Controllers;


import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/mascota")
public class MascotaController {
    @Autowired
    MascotaService mascotaService;

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
    public String guardarMascota(@RequestParam("id_usuario") int id_usuario,
                                 @RequestParam("id_categoria_animal") int id_categoria_animal,
                                 @RequestParam("id_especie") int id_especie,
                                 @RequestParam("id_raza") int id_raza,
                                 @RequestParam("id_sexo") int id_sexo,
                                 @RequestParam("nombre") String nombre,
                                 @RequestParam("dia_nac") int dia_nac,
                                 @RequestParam("mes_nac") int mes_nac,
                                 @RequestParam("anio_nac") int anio_nac,
                                 @RequestParam("otro") String otro,
                                 @RequestParam("historial_consulta") String historial_consulta,
                                 @RequestParam("estatura") Double estatura,
                                 @RequestParam("color") String color,
                                 @RequestParam("peso") Double peso,
                                 @RequestParam("otro2") String otro2){
        mascotaService.guardarMascota(id_usuario, id_categoria_animal, id_especie, id_raza, id_sexo, nombre, dia_nac,
                mes_nac, anio_nac, otro, historial_consulta, estatura, color, peso, otro2);
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

