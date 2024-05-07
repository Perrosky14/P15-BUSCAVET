package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.SuperAdminEntity;
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

}
