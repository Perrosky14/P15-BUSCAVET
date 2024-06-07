package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.BloqueHoraEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Services.BloqueHoraService;
import com.example.BUSCAVET.Services.DoctorService;
import com.example.BUSCAVET.Services.MascotaService;
import com.example.BUSCAVET.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/bloqueHora")
public class BloqueHoraController {

    @Autowired
    BloqueHoraService bloqueHoraService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    MascotaService mascotaService;

    @GetMapping("/obtener-bloquesHora")
    public ArrayList<BloqueHoraEntity> obtenerBloquesHora() {
        return bloqueHoraService.obtenerBloquesHoras();
    }

    @GetMapping("/obtener-bloqueHora")
    public ResponseEntity<?> obtenerBloqueHoraPorId(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        BloqueHoraEntity bloqueHora = bloqueHoraService.obtenerPorId(idBloqueHora);
        if (bloqueHora == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHora);
    }

    @GetMapping("/obtener-bloquesHora-usuario")
    public ResponseEntity<?> obtenerBloquesHoraPorUsuario(@RequestBody Map<String, Object> requesBody) {
        Long idUsuario = ((Number) requesBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.obtenerPorUsuario(idUsuario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
    }

    @GetMapping("/obtener-bloquesHora-veterinario")
    public ResponseEntity<?> obtenerBloquesHoraPorVeterinario(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinario = ((Number) requestBody.get("idVeterinario")).longValue();
        DoctorEntity veterinario = doctorService.obtenerPorId(idVeterinario);
        if (veterinario != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.obtenerPorVeterinario(idVeterinario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún veterinario que tenga la id: " + idVeterinario);
    }

    @GetMapping("/obtener-bloquesHora-mascota")
    public ResponseEntity<?> obtenerBloquesHoraPorMascota(@RequestBody Map<String, Object> requestBody) {
        Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
        MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
        if (mascota != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.obtenerPorMascota(idMascota));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
    }

    @PostMapping("/nuevo-bloqueHora")
    public ResponseEntity<?> guardarBloqueHora(@RequestBody BloqueHoraEntity bloqueHora) {
        bloqueHoraService.guardarBloqueHora(bloqueHora);
        return ResponseEntity.status(HttpStatus.CREATED).body("El bloque de hora se ha registrado correctamente.");
    }

    @PutMapping("/actualizar-bloqueHora")
    public ResponseEntity<?> actualizarBloqueHora(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        if (bloqueHoraService.obtenerPorId(idBloqueHora) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
        }
        BloqueHoraEntity bloqueHoraActualizada = bloqueHoraService.transformarBloqueHora((Map<String, Object>) requestBody.get("bloqueHoraActualizada"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.actualizarBloqueHora(idBloqueHora, bloqueHoraActualizada));
    }

    @DeleteMapping("/eliminar-bloqueHora")
    public ResponseEntity<?> eliminarBloqueHora(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        if (bloqueHoraService.obtenerPorId(idBloqueHora) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
        }
        bloqueHoraService.eliminarBloquehora(idBloqueHora);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El bloque de hora con la id: " + idBloqueHora + " se ha eliminado correctamente.");
    }

}
