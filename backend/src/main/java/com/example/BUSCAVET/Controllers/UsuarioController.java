package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Services.MascotaService;
import com.example.BUSCAVET.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    MascotaService mascotaService;

    @GetMapping("/")
    public ArrayList<UsuarioEntity> obtenerUsuarios(){return usuarioService.obtenerUsuarios();}

    @GetMapping("/{id}")
    public UsuarioEntity obtenerUsuarioPorId(@PathVariable Long id){return usuarioService.obtenerPorId(id);}

    @GetMapping("/nuevo-usuario")
    public String usuario(){
        return "nuevo-usuario";
    }

    @PostMapping("/nuevo-usuario")
    public String guardarUsuario(@RequestBody UsuarioEntity usuario){
        usuarioService.guardarUsuario(usuario);
        return "redirect:/nuevo-usuario";
    }

    @PutMapping("/{id}")
    public UsuarioEntity actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioEntity usuarioActualizado){
        return usuarioService.actualizarUsuario(id, usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id){usuarioService.eliminarUsuario(id);}

    @PostMapping("/crear-mascota/{idUsuario}")
    public ResponseEntity<?> registrarMascota(@PathVariable Long idUsuario, @RequestBody MascotaEntity mascota){
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            mascota.setUsuario(usuario);
            mascotaService.guardarMascota(mascota);
            return ResponseEntity.status(HttpStatus.CREATED).body("La mascota " + mascota.getNombre() + " ha sido registrada correctamente por " + "el usuario con el ID: " + idUsuario);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun usuario que tenga el id: " + idUsuario);
        }
    }

    @PutMapping("/modificar-mascota/{idUsuario}/{idMascota}")
    public ResponseEntity<?> actualizarMascota(@PathVariable Long idUsuario, @PathVariable Long idMascota, @RequestBody MascotaEntity mascotaActualizada){
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
            if (mascota != null) {
                if (usuario.equals(mascota.getUsuario())) {
                    mascotaService.actualizarMascota(idMascota, mascotaActualizada);
                    return ResponseEntity.status(HttpStatus.CREATED).body("La mascota " + mascotaActualizada.getNombre() + " ha sido modificado correctamente por el usuario con el ID: " + idMascota);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El usuario con id: " + idUsuario + "no puede modificar la mascota con id: " + idMascota + ", ya que el usuario no creó dicha mascota. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna mascota que tenga id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga el id: " + idUsuario);
        }
    }

    @DeleteMapping("/eliminar-mascota/{idUsuario}/{idMascota}")
    public ResponseEntity<?> eliminarDoctor(@PathVariable Long idUsuario, @PathVariable Long idMascota){
        UsuarioEntity usuario = usuarioService.obtenerPorId(idUsuario);
        if (usuario != null) {
            MascotaEntity mascota = mascotaService.obtenerPorId(idMascota);
            if (mascota != null) {
                if (usuario.equals(mascota.getUsuario())) {
                    mascotaService.eliminarMascota(idMascota);
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota con id: "+ idMascota + ", se ha eliminado correctamente.");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("El usuario con id: " + idUsuario + " no puede eliminar la mascota con id: " + idMascota + ", ya que el usuario no creó dicha mascota. No tiene dicha autorización.");
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ninguna mascota que tenga id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún usuario que tenga el id: " + idUsuario + ", para eliminar la mascota.");
        }
    }

}
