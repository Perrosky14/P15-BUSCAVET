package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Services.MascotaService;
import com.example.BUSCAVET.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    MascotaService mascotaService;

    @GetMapping("/obtener-usuarios")
    public ArrayList<UsuarioEntity> obtenerUsuarios(){return usuarioService.obtenerUsuarios();}

    @GetMapping("/obtener-usuario")
    public ResponseEntity<?> obtenerUsuarioPorId(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(usuario);
    }

    @PostMapping("/nuevo-usuario")
    public ResponseEntity<?> guardarUsuario(@RequestBody UsuarioEntity usuario){
        usuarioService.guardarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse());
    }

    @PutMapping("/actualizar-usuario")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        if (usuarioService.obtenerPorId(idUsuario) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
        }
        UsuarioEntity usuarioActualizado = usuarioService.transformarDatosUsuario((Map<String, Object>) requestBody.get("usuarioActualizado"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(usuarioService.actualizarUsuario(idUsuario, usuarioActualizado));
    }

    @DeleteMapping("/eliminar-usuario")
    public ResponseEntity<?> eliminarUsuario(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        if (usuarioService.obtenerPorId(idUsuario) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
        }
        usuarioService.eliminarUsuario(idUsuario);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El usuario con la id: " + idUsuario + " se ha eliminado correctamente.");
    }

    @PostMapping("/crear-mascota")
    public ResponseEntity<?> registrarMascota(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            MascotaEntity mascota = mascotaService.transformarMascota((Map<String, Object>) requestBody.get("mascota"));
            mascota.setUsuario(usuario);
            mascotaService.guardarMascota(mascota);
            return ResponseEntity.status(HttpStatus.CREATED).body("La mascota " + mascota.getNombre() + " ha sido registrada correctamente por " + "el usuario con la id: " + idUsuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun usuario que tenga la id: " + idUsuario);
        }
    }

    @PutMapping("/modificar-mascota")
    public ResponseEntity<?> actualizarMascota(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
            MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
            if (mascota != null) {
                if (usuario.equals(mascota.getUsuario())) {
                    mascota = mascotaService.transformarMascota((Map<String, Object>) requestBody.get("mascotaActualizada"));
                    mascotaService.actualizarMascota(idMascota, mascota);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota " + mascota.getNombre() + " ha sido modificado correctamente por el usuario con la id: " + idMascota);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El usuario con id: " + idUsuario + " no puede modificar la mascota con la id: " + idMascota + ", ya que el usuario no creó dicha mascota. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna mascota que tenga la id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario);
        }
    }

    @DeleteMapping("/eliminar-mascota")
    public ResponseEntity<?> eliminarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
            MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
            if (mascota != null) {
                if (usuario.equals(mascota.getUsuario())) {
                    mascotaService.eliminarMascota(idMascota);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota con id: "+ idMascota + ", se ha eliminado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El usuario con la id: " + idUsuario + " no puede eliminar la mascota con la id: " + idMascota + ", ya que el usuario no creó dicha mascota. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga la id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga la id: " + idUsuario + ", para eliminar la mascota.");
        }
    }

}
