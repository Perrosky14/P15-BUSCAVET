package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Services.VeterinariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/veterinaria")
public class VeterinariaController {

    @Autowired
    VeterinariaService veterinariaService;

    @GetMapping("/")
    public ArrayList<VeterinariaEntity> obtenerVeterinaria(){return veterinariaService.obtenerVeterinarias();}

    @GetMapping("/{id}")
    public VeterinariaEntity obtenerVeterinariaPorId(@PathVariable Long id){return veterinariaService.obtenerPorId(id);}

    @GetMapping("/nueva-veterinaria")
    public String veterinaria(){
        return "nueva-veterinaria";
    }

    @PostMapping("/nueva-veterinaria")
    public String guardarVeterinaria(@RequestParam("contrasenia") String contrasenia,
                                     @RequestParam("id_pais") int id_pais,
                                     @RequestParam("id_segmento") int id_segmento,
                                     @RequestParam("id_tipo_institucion_vet") int id_tipo_institucion_vet,
                                     @RequestParam("id_estado_institucion") int id_estado_institucion,
                                     @RequestParam("rut") String rut,
                                     @RequestParam("razon_social") String razon_social,
                                     @RequestParam("nombre_comercial") String nombre_comercial,
                                     @RequestParam("nombre_1_rep_legal") String nombre_1_rep_legal,
                                     @RequestParam("nombre_2_rep_legal") String nombre_2_rep_legal,
                                     @RequestParam("resenia") String resenia,
                                     @RequestParam("resenia_confirmada") String resenia_confirmada,
                                     @RequestParam("direccion") String direccion,
                                     @RequestParam("numero") String numero,
                                     @RequestParam("tipo") String tipo,
                                     @RequestParam("telefono") String telefono,
                                     @RequestParam("codigo_area") String codigo_area,
                                     @RequestParam("celular") String celular,
                                     @RequestParam("id_codigo_postal") int id_codigo_postal,
                                     @RequestParam("id_comuna") int id_comuna,
                                     @RequestParam("id_provincia") int id_provincia,
                                     @RequestParam("id_region") int id_region,
                                     @RequestParam("geolocaclizacion") String geolocaclizacion,
                                     @RequestParam("id_zona_BDoc") int id_zona_BDoc,
                                     @RequestParam("id_servicio") int id_servicio){
        veterinariaService.guardarVeterinaria(contrasenia,id_pais,id_segmento,id_tipo_institucion_vet,id_estado_institucion,
                rut,razon_social,nombre_comercial,nombre_1_rep_legal,nombre_2_rep_legal,resenia,resenia_confirmada,direccion,
                numero,tipo,telefono,codigo_area,celular,id_codigo_postal,id_comuna,id_provincia,id_region,geolocaclizacion,
                id_zona_BDoc,id_servicio);
        return "redirect:/nueva-veterinaria";
    }

    @PutMapping("/{id}")
    public VeterinariaEntity actualizarVeterinaria(@PathVariable Long id, @RequestBody VeterinariaEntity veterinariaActualizada){
        return veterinariaService.actualizarVeterinaria(id, veterinariaActualizada);
    }

    @DeleteMapping("/{id}")
    public void eliminarVeterinaria(@PathVariable Long id){
        veterinariaService.eliminarVeterinaria(id);
    }

}
