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

    @PostMapping("/obtener-bloqueHora")
    public ResponseEntity<?> obtenerBloqueHoraPorId(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        BloqueHoraEntity bloqueHora = bloqueHoraService.obtenerPorId(idBloqueHora);
        if (bloqueHora == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHora);
    }

    @PostMapping("/obtener-bloquesHora-usuario")
    public ResponseEntity<?> obtenerBloquesHoraPorUsuario(@RequestBody Map<String, Object> requesBody) {
        Long idUsuario = ((Number) requesBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.obtenerPorUsuario(idUsuario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
    }

    @PostMapping("/obtener-bloquesHora-veterinario")
    public ResponseEntity<?> obtenerBloquesHoraPorVeterinario(@RequestBody Map<String, Object> requestBody) {
        Long idVeterinario = ((Number) requestBody.get("idVeterinario")).longValue();
        DoctorEntity veterinario = doctorService.obtenerPorId(idVeterinario);
        if (veterinario != null) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.obtenerPorVeterinario(idVeterinario));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún veterinario que tenga la id: " + idVeterinario);
    }

    @PostMapping("/obtener-bloquesHora-mascota")
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

    @PostMapping("/nuevo-bloqueHora-doctor")
    public ResponseEntity<?> guardarBloqueHora(@RequestBody Map<String, Object> requestBody) {
        Long iddoctor = ((Number) requestBody.get("idDoctor")).longValue();
        DoctorEntity doctor = doctorService.obtenerPorId(iddoctor);
        if (doctor != null) {
            BloqueHoraEntity bloqueHora = new BloqueHoraEntity();
            bloqueHoraService.transformarBloqueHora(bloqueHora, (Map<String, Object>) requestBody.get("bloqueHora"));
            bloqueHora.setDoctor(doctor);
            bloqueHoraService.guardarBloqueHora(bloqueHora);
            return ResponseEntity.status(HttpStatus.CREATED).body("El bloque de hora se ha registrado correctamente.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún doctor que tenga la id: " + iddoctor);
    }

    @PostMapping("/agendar-hora")
    public ResponseEntity<?> agendarBloqueHora(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        BloqueHoraEntity bloqueHora = bloqueHoraService.obtenerPorId(idBloqueHora);
        if (bloqueHora != null) {
            if (!bloqueHora.getAgendadoPorUsuario()) {//Pregunta si no ha sido agendado por un usuario
                Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
                UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
                if (usuario != null) {
                    Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
                    MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
                    if (mascota != null) {
                        if (usuario.equals(mascota.getUsuario())) {
                            String motivo = ((String) requestBody.get("motivo"));
                            bloqueHoraService.agendarBloqueHora(idBloqueHora, motivo, usuario, mascota);
                            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se ha agendado la hora con id: " + idBloqueHora + ", con el usuario con id: " + idUsuario + ", con la mascota con id: " + idMascota + ", de forma exitosa.");
                        }
                        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El usuario con id: " + idUsuario + " no puede agendar hora con la mascota con id: " + idMascota + ", ya que el usuario no creó dicha mascota. No tiene dicha autorización.");
                    }
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
                }
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
            }
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El bloque de hora que se intenta agendar ya ha sido agendado por un usuario.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
    }

    @PutMapping("/actualizar-bloqueHora")
    public ResponseEntity<?> actualizarBloqueHora(@RequestBody Map<String, Object> requestBody) {
        Long idBloqueHora = ((Number) requestBody.get("idBloqueHora")).longValue();
        if (bloqueHoraService.obtenerPorId(idBloqueHora) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún bloque de hora que tenga la id: " + idBloqueHora);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(bloqueHoraService.actualizarBloqueHora(idBloqueHora, (Map<String, Object>) requestBody.get("bloqueHoraActualizada")));
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
