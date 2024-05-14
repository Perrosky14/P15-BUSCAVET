package com.example.BUSCAVET.Controllers;


import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Services.MascotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/mascota")
public class MascotaController {
    @Autowired
    MascotaService mascotaService;

    @GetMapping("/obtener-mascotas")
    public ArrayList<MascotaEntity> obtenerMascotas(){
        return mascotaService.obtenerMascotas();
    }

    @GetMapping("/obtener-mascota")
    public ResponseEntity<?> obtenerMascotaPorID(@RequestBody Map<String, Object> requestBody){
        Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
        MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
        if (mascota == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(mascota);
    }

    @PostMapping("/nueva-mascota")
    public ResponseEntity<?> guardarMascota(@RequestBody MascotaEntity mascota){
        mascotaService.guardarMascota(mascota);
        return ResponseEntity.status(HttpStatus.CREATED).body("La mascota ha sido registrada correctamente.");
    }

    @PutMapping("/actualizar-mascota")
    public ResponseEntity<?> actualizarMascota(@RequestBody Map<String, Object> requestBody){
        Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
        if (mascotaService.obtenerPorId(idMascota) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
        }
        MascotaEntity mascotaActualizada = mascotaService.transformarMascota((Map<String, Object>) requestBody.get("mascotaActualizada"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(mascotaService.actualizarMascota(idMascota, mascotaActualizada));
    }

    @DeleteMapping("/eliminar-mascota")
    public ResponseEntity<?> eliminarMascota(@RequestBody Map<String, Object> requestBody){
        Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
        if (mascotaService.obtenerPorId(idMascota) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
        }
        mascotaService.eliminarMascota(idMascota);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota con la id: " + idMascota + " se ha eliminado correctamente.");
    }

}

