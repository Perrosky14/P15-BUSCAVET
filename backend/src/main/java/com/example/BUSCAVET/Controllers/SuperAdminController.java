package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Services.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/superAdmin")
public class SuperAdminController {

    @Autowired
    SuperAdminService superAdminService;

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
    @PutMapping("modificar-veterinaria/{idVeterinaria}")
    public VeterinariaEntity actualizarVeterinaria(@PathVariable Long idVeterinaria, @RequestBody VeterinariaEntity veterinariaActualizada){
        return superAdminService.actualizarVeterinaria(idVeterinaria, veterinariaActualizada);
    }
    @DeleteMapping("eliminar-veterinaria/{idVeterinaria}")
    public void eliminarVeterinaria(@PathVariable Long idVeterinaria){
        superAdminService.eliminarVeterinaria(idVeterinaria);
    }

    //Doctor
    @PutMapping("modificar-doctor/{idDoctor}")
    public DoctorEntity actualizarDoctor(@PathVariable Long idDoctor, @RequestBody DoctorEntity doctorActualizado){
        return superAdminService.actualizarDoctor(idDoctor, doctorActualizado);
    }
    @DeleteMapping("eliminar-doctor/{idDoctor}")
    public void eliminarDoctor(@PathVariable Long idDoctor){
        superAdminService.eliminarDoctor(idDoctor);
    }

    //Usuario
    @PutMapping("modificar-usuario/{idUsuario}")
    public UsuarioEntity actualizarUsuario(@PathVariable Long idUsuario, @RequestBody UsuarioEntity usuarioActualizado){
        return superAdminService.actualizarUsuario(idUsuario, usuarioActualizado);
    }
    @DeleteMapping("eliminar-usuario/{idUsuario}")
    public void eliminarUsuario(@PathVariable Long idUsuario){
        superAdminService.eliminarUsuario(idUsuario);
    }

    //Mascota
    @PutMapping("modificar-mascota/{idMascota}")
    public MascotaEntity actualizarMascota(@PathVariable Long idMascota, @RequestBody MascotaEntity mascotaActualizada){
        return superAdminService.actualizarMascota(idMascota, mascotaActualizada);
    }
    @DeleteMapping("eliminar-mascota/{idMascota}")
    public void eliminarMascota(@PathVariable Long idMascota){
        superAdminService.eliminarMascota(idMascota);
    }

}
