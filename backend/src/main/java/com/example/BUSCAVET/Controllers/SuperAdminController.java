package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/superAdmin")
public class SuperAdminController {

    @Autowired
    SuperAdminService superAdminService;

    @Autowired
    VeterinariaService veterinariaService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    MascotaService mascotaService;

    @GetMapping("/")
    public ArrayList<SuperAdminEntity> obtenerSuperAdmin(){return superAdminService.obtenerSuperAdmin();}

    @GetMapping("/{id}")
    public SuperAdminEntity obtenerSuperAdminPorId(@PathVariable Long id){return superAdminService.obtenerPorId(id);}

    @GetMapping("/nuevo-super-admin")
    public String superAdmin(){
        return "nuevo-super-admin";
    }

    @PostMapping("/nuevo-super-admin")
    public String guardarSuperAdmin(@RequestBody SuperAdminEntity superAdmin){
        superAdminService.guardarSuperAdmin(superAdmin);
        return "redirect:/nuevo-super-admin";
    }

    @PutMapping("/{id}")
    public SuperAdminEntity actualizarSuperAdmin(@PathVariable Long id, @RequestBody SuperAdminEntity superAdminActualizado){
        return superAdminService.actualizarSuperAdmin(id,superAdminActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarSuperAdmin(@PathVariable Long id){ superAdminService.eliminarSuperAdmin(id);}


    //Veterinaria
    @PostMapping("/crear-veterinaria/{idSuperAdmin}")
    public ResponseEntity<?> registrarVeterinaria(@PathVariable Long idSuperAdmin, @RequestBody VeterinariaEntity veterinaria){
        SuperAdminEntity superAdmin = superAdminService.obtenerPorId(idSuperAdmin);
        if (superAdmin != null) {
            veterinaria.setSuperAdmin(superAdmin);
            veterinariaService.guardarVeterinaria(veterinaria);
            return ResponseEntity.status(HttpStatus.CREATED).body("La veterinaria " + veterinaria.getNombre_comercial() + " ha sido registrada correctamente por el superAdmin con el ID: " + idSuperAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

    @PutMapping("/modificar-veterinaria/{idSuperAdmin}/{idVeterinaria}")
    public ResponseEntity<?> actualizarVeterinaria(@PathVariable Long idSuperAdmin, @PathVariable Long idVeterinaria, @RequestBody VeterinariaEntity veterinariaActualizada){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (veterinariaService.obtenerPorId(idVeterinaria) != null) {
                veterinariaService.actualizarVeterinaria(idVeterinaria, veterinariaActualizada);
                return ResponseEntity.status(HttpStatus.CREATED).body("La veterinaria " + veterinariaActualizada.getNombre_comercial() + " ha sido modificada correctamente por el superAdmin con el ID: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna veterinaria que tenga id: " + idVeterinaria);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-veterinaria/{idSuperAdmin}/{idVeterinaria}")
    public ResponseEntity<?> eliminarVeterinaria(@PathVariable Long idSuperAdmin, @PathVariable Long idVeterinaria){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (veterinariaService.obtenerPorId(idVeterinaria) != null) {
                veterinariaService.eliminarVeterinaria(idVeterinaria);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("La veterinaria con id: " + idVeterinaria + ", ha sido eliminada correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna veterinaria que tenga id: " + idVeterinaria);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

    //Doctor
    @PutMapping("/modificar-doctor/{idSuperAdmin}/{idDoctor}")
    public ResponseEntity<?> actualizarDoctor(@PathVariable Long idSuperAdmin, @PathVariable Long idDoctor, @RequestBody DoctorEntity doctorActualizado){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (doctorService.obtenerPorId(idDoctor) != null) {
                doctorService.actualizarDoctor(idDoctor, doctorActualizado);
                return ResponseEntity.status(HttpStatus.CREATED).body("El Doctor " + doctorActualizado.getNombre1() + " " + doctorActualizado.getApellido1() + " ha sido modificado correctamente por el superAdmin con el ID: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún doctor que tenga id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-doctor/{idSuperAdmin}/{idDoctor}")
    public ResponseEntity<?> eliminarDoctor(@PathVariable Long idSuperAdmin, @PathVariable Long idDoctor){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (doctorService.obtenerPorId(idDoctor) != null) {
                doctorService.eliminarDoctor(idDoctor);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con id: " + idDoctor + ", ha sido eliminado correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún doctor que tenga id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

    //Usuario
    @PutMapping("/modificar-usuario/{idSuperAdmin}/{idUsuario}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long idSuperAdmin,@PathVariable Long idUsuario, @RequestBody UsuarioEntity usuarioActualizado){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (usuarioService.obtenerPorId(idUsuario) != null) {
                usuarioService.actualizarUsuario(idUsuario, usuarioActualizado);
                return ResponseEntity.status(HttpStatus.CREATED).body("El usuario " + usuarioActualizado.getNombre1() + " " + usuarioActualizado.getApellido1() + " ha sido modificado correctamente por el superAdmin con el ID: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún usuario que tenga id: " + idUsuario);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-usuario/{idSuperAdmin}/{idUsuario}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable long idSuperAdmin, @PathVariable Long idUsuario){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (usuarioService.obtenerPorId(idUsuario) != null) {
                usuarioService.eliminarUsuario(idUsuario);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El usuario con id: " + idUsuario + ", ha sido eliminado correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún usuario que tenga id: " + idUsuario);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

    //Mascota
    @PutMapping("/modificar-mascota/{idSuperAdmin}/{idMascota}")
    public ResponseEntity<?> actualizarMascota(@PathVariable Long idSuperAdmin, @PathVariable Long idMascota, @RequestBody MascotaEntity mascotaActualizada){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (mascotaService.obtenerPorId(idMascota) != null) {
                mascotaService.actualizarMascota(idMascota, mascotaActualizada);
                return ResponseEntity.status(HttpStatus.CREATED).body("La mascota " + mascotaActualizada.getNombre() + " ha sido modificado correctamente por el superAdmin con el ID: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna mascota que tenga id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga el id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-mascota/{idSuperAdmin}/{idMascota}")
    public ResponseEntity<?> eliminarMascota(@PathVariable Long idSuperAdmin, @PathVariable Long idMascota){
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            if (mascotaService.obtenerPorId(idMascota) != null) {
                mascotaService.eliminarMascota(idMascota);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota con id: " + idMascota + ", ha sido eliminada correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna mascota que tenga id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun superAdmin que tenga el id: " + idSuperAdmin);
        }
    }

}
