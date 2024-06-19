package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.BloqueHoraEntity;
import com.example.BUSCAVET.Entities.BloqueHorarioEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Services.BloqueHoraService;
import com.example.BUSCAVET.Services.BloqueHorarioService;
import com.example.BUSCAVET.Services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/bloqueHorario")
public class BloqueHorarioController {

    @Autowired
    BloqueHorarioService bloqueHorarioService;

    @Autowired
    DoctorService doctorService;


    @GetMapping("/obtener-bloquesHorario")
    public ArrayList<BloqueHorarioEntity> obtenerBloquesHorario() {
        return bloqueHorarioService.obtenerBloquesHorario();
    }

    @GetMapping("/obtener-bloqueHorario")
    public ResponseEntity<?> obtenerBloqueHorarioPorId(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHorario = ((Number) requestBody.get("idBloqueHorario")).longValue();
        BloqueHorarioEntity bloqueHorario = bloqueHorarioService.obtenerPorId(idBloqueHorario);
        if (bloqueHorario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de horarios que tenga la id: " + idBloqueHorario);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHorario);
    }

    @GetMapping("/obtener-bloqueHorario-veterinario")
    public ResponseEntity<?> obtenerBloqueHorarioPorVeterinario(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinario = ((Number) requestBody.get("idVeterinario")).longValue();
        DoctorEntity veterinario = doctorService.obtenerPorId(idVeterinario);
        if (veterinario != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHorarioService.obtenerPorVeterinario(idVeterinario));
        }
        return null;
    }

    @PostMapping("/nuevo-bloqueHorario")
    public ResponseEntity<?> guardarBloqueHorario(@RequestBody BloqueHorarioEntity bloqueHorario) {
        bloqueHorarioService.guardarBloqueHorario(bloqueHorario);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El bloque de horarios se ha registrado correctamente.");
    }

    @PostMapping("/nuevo-bloqueHorario-doctor")
    public ResponseEntity<?> guardarBloqueHorario(@RequestBody Map<String, Object> requestBody) {
        Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
        DoctorEntity doctor = doctorService.obtenerPorId(idDoctor);
        if (doctor != null) {
            BloqueHorarioEntity bloqueHorario = bloqueHorarioService.transformarBloqueHorario((Map<String, Object>) requestBody.get("bloqueHorario"));
            bloqueHorarioService.crearBloquesHoras(doctor, bloqueHorario);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("El bloque de horarios se ha registrado correctamente.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + idDoctor);
    }


    @PutMapping("/actualizar-bloqueHorario")
    public ResponseEntity<?> actualizarBloqueHorario(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHorario = ((Number) requestBody.get("idBloqueHorario")).longValue();
        if (bloqueHorarioService.obtenerPorId(idBloqueHorario) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de horarios que tenga la id: " + idBloqueHorario);
        }
        BloqueHorarioEntity bloqueHorarioActualizado = bloqueHorarioService.transformarBloqueHorario((Map<String, Object>) requestBody.get("bloqueHorarioActualizada"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHorarioService.actualizarBloqueHorario(idBloqueHorario, bloqueHorarioActualizado));
    }

    @DeleteMapping("/eliminar-bloqueHorario")
    public ResponseEntity<?> eliminarBloqueHorario(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHorario = ((Number) requestBody.get("idBloqueHorario")).longValue();
        if (bloqueHorarioService.obtenerPorId(idBloqueHorario) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de horarios que tenga la id: " + idBloqueHorario);
        }
        bloqueHorarioService.eliminarBloqueHorario(idBloqueHorario);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El bloque de horarios con la id" + idBloqueHorario + " se ha eliminado correctamente.");
    }

}
