package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

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

    @GetMapping("/obtener-superAdmins")
    public ArrayList<SuperAdminEntity> obtenerSuperAdmin(){return superAdminService.obtenerSuperAdmin();}

    @GetMapping("/obtener-superAdmin")
    public ResponseEntity<?> obtenerSuperAdminPorId(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        SuperAdminEntity superAdmin = superAdminService.obtenerPorId(idSuperAdmin);
        if (superAdmin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin con la id: " + idSuperAdmin);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(superAdmin);
    }

    @PostMapping("/nuevo-superAdmin")
    public ResponseEntity<?> guardarSuperAdmin(@RequestBody SuperAdminEntity superAdmin){
        superAdminService.guardarSuperAdmin(superAdmin);
        return ResponseEntity.status(HttpStatus.CREATED).body("El superAdmin se ha registrado correctamente.");
    }

    @PutMapping("/actualizar-superAdmin")
    public ResponseEntity<?> actualizarSuperAdmin(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin con la id: " + idSuperAdmin);
        }
        SuperAdminEntity superAdminActualizado = superAdminService.transformarSuperAdmin((Map<String, Object>) requestBody.get("superAdminActualizado"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(superAdminService.actualizarSuperAdmin(idSuperAdmin,superAdminActualizado));
    }

    @DeleteMapping("/eliminar-superAdmin")
    public ResponseEntity<?> eliminarSuperAdmin(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (usuarioService.obtenerPorId(idSuperAdmin) == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin con la id: " + idSuperAdmin);
        }
        superAdminService.eliminarSuperAdmin(idSuperAdmin);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body("El superAdmin con la id: " + idSuperAdmin + " se ha eliminado correctamente.");
    }

    //Veterinaria
    @PostMapping("/crear-veterinaria")
    public ResponseEntity<?> registrarVeterinaria(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        SuperAdminEntity superAdmin = superAdminService.obtenerPorId(idSuperAdmin);
        if (superAdmin != null) {
            VeterinariaEntity veterinaria = veterinariaService.transformarDatosVeterinaria((Map<String, Object>) requestBody.get("veterinaria"));
            veterinariaService.guardarVeterinaria(veterinaria);
            return ResponseEntity.status(HttpStatus.CREATED).body("La veterinaria " + veterinaria.getNombre_comercial() + " ha sido registrada correctamente por el superAdmin con la id: " + idSuperAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }

    @PutMapping("/modificar-veterinaria")
    public ResponseEntity<?> actualizarVeterinaria(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idVeterinaria =  ((Number) requestBody.get("idVeterinaria")).longValue();
            if (veterinariaService.obtenerPorId(idVeterinaria) != null) {
                VeterinariaEntity veterinariaActualizada = veterinariaService.transformarDatosVeterinaria((Map<String, Object>) requestBody.get("veterinariaActualizada"));
                veterinariaService.actualizarVeterinaria(idVeterinaria, veterinariaActualizada);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("La veterinaria " + veterinariaActualizada.getNombre_comercial() + " ha sido modificada correctamente por el superAdmin con la id: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-veterinaria")
    public ResponseEntity<?> eliminarVeterinaria(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idVeterinaria = ((Number) requestBody.get("idVeterinaria")).longValue();
            if (veterinariaService.obtenerPorId(idVeterinaria) != null) {
                veterinariaService.eliminarVeterinaria(idVeterinaria);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("La veterinaria con la id: " + idVeterinaria + ", ha sido eliminada correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna veterinaria que tenga la id: " + idVeterinaria);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }

    //Doctor
    @PutMapping("/modificar-doctor")
    public ResponseEntity<?> actualizarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
            if (doctorService.obtenerPorId(idDoctor) != null) {
                DoctorEntity doctorActualizado = doctorService.transformarDatosDoctor((Map<String, Object>) requestBody.get("doctorActualizado"));
                doctorService.actualizarDoctor(idDoctor, doctorActualizado);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El Doctor " + doctorActualizado.getNombre1() + " " + doctorActualizado.getApellido1() + " ha sido modificado correctamente por el superAdmin con la id: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún doctor que tenga la id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-doctor")
    public ResponseEntity<?> eliminarDoctor(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idDoctor = ((Number) requestBody.get("idDoctor")).longValue();
            if (doctorService.obtenerPorId(idDoctor) != null) {
                doctorService.eliminarDoctor(idDoctor);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El doctor con la id: " + idDoctor + ", ha sido eliminado correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún doctor que tenga la id: " + idDoctor);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }

    //Usuario
    @PutMapping("/modificar-usuario")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
            if (usuarioService.obtenerPorId(idUsuario) != null) {
                UsuarioEntity usuarioActualizado = usuarioService.transformarDatosUsuario((Map<String, Object>) requestBody.get("usuarioActualizado"));
                usuarioService.actualizarUsuario(idUsuario, usuarioActualizado);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El usuario " + usuarioActualizado.getNombre1() + " " + usuarioActualizado.getApellido1() + " ha sido modificado correctamente por el superAdmin con la id: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún usuario que tenga la id: " + idUsuario);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-usuario")
    public ResponseEntity<?> eliminarUsuario(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idUsuario = ((Number) requestBody.get("idUsuario")).longValue();
            if (usuarioService.obtenerPorId(idUsuario) != null) {
                usuarioService.eliminarUsuario(idUsuario);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("El usuario con la id: " + idUsuario + ", ha sido eliminado correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ningún usuario que tenga la id: " + idUsuario);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }

    //Mascota
    @PutMapping("/modificar-mascota")
    public ResponseEntity<?> actualizarMascota(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
            if (mascotaService.obtenerPorId(idMascota) != null) {
                MascotaEntity mascotaActualizada = mascotaService.transformarMascota((Map<String, Object>) requestBody.get("mascotaActualizada"));
                mascotaService.actualizarMascota(idMascota, mascotaActualizada);
                return ResponseEntity.status(HttpStatus.ACCEPTED).body("La mascota " + mascotaActualizada.getNombre() + " ha sido modificado correctamente por el superAdmin con la id: " + idSuperAdmin);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se a encontrado ninguna mascota que tenga la id: " + idMascota);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningún superAdmin que tenga la id: " + idSuperAdmin);
        }
    }
    @DeleteMapping("/eliminar-mascota")
    public ResponseEntity<?> eliminarMascota(@RequestBody Map<String, Object> requestBody){
        Long idSuperAdmin = ((Number) requestBody.get("idSuperAdmin")).longValue();
        if (superAdminService.obtenerPorId(idSuperAdmin) != null) {
            Long idMascota = ((Number) requestBody.get("idMascota")).longValue();
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
