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
    public String guardarUsuario(@RequestParam("contrasenia") String contrasenia,
                                 @RequestParam("id_pais") int id_pais,
                                 @RequestParam("rut") String rut,
                                 @RequestParam("nombre1") String nombre1,
                                 @RequestParam("nombre2") String nombre2,
                                 @RequestParam("apellido1") String apellido1,
                                 @RequestParam("apellido2") String apellido2,
                                 @RequestParam("id_genero") int id_genero,
                                 @RequestParam("dia_nac") int dia_nac,
                                 @RequestParam("mes_nac") int mes_nac,
                                 @RequestParam("anio_nac") int anio_nac,
                                 @RequestParam("id_nacionalidad") int id_nacionalidad,
                                 @RequestParam("otro") String otro,
                                 @RequestParam("direccion") String direccion,
                                 @RequestParam("numero") String numero,
                                 @RequestParam("tipo") String tipo,
                                 @RequestParam("id_codigo_postal") int id_codigo_postal,
                                 @RequestParam("id_comuna")int id_comuna,
                                 @RequestParam("id_provincia") int id_provincia,
                                 @RequestParam("id_region") int id_region,
                                 @RequestParam("geolocalizacion") String geolocalizacion,
                                 @RequestParam("id_zona_BDoc") int  id_zona_BDoc,
                                 @RequestParam("otro2") String otro2,
                                 @RequestParam("telefono") String telefono,
                                 @RequestParam("codigo_area") String codigo_area,
                                 @RequestParam("celular") String celular,
                                 @RequestParam("email") String email,
                                 @RequestParam("RRSS1") String RRSS1,
                                 @RequestParam("RRSS2") String RRSS2,
                                 @RequestParam("otro3") String otro3){
        usuarioService.guardarUsuario(contrasenia,id_pais,rut,nombre1,nombre2,apellido1,apellido2,id_genero,dia_nac,mes_nac,
                anio_nac,id_nacionalidad,otro,direccion,numero,tipo,id_codigo_postal,id_comuna,id_provincia,id_region,geolocalizacion,
                id_zona_BDoc,otro2,telefono,codigo_area,celular,email,RRSS1,RRSS2,otro3);
        return "redirect:/nuevo-usuario";
    }

    @PutMapping("/{id}")
    public UsuarioEntity actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioEntity usuarioActualizado){
        return usuarioService.actualizarUsuario(id, usuarioActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id){usuarioService.eliminarUsuario(id);}
}
