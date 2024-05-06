package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

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
}
