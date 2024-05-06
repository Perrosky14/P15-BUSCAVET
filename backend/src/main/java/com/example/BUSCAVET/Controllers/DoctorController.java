package com.example.BUSCAVET.Controllers;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Services.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@RestController
@RequestMapping("/doctor")
public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @GetMapping("/")
    public ArrayList<DoctorEntity> obtenerDoctores(){
        return doctorService.obtenerDoctor();
    }

    @GetMapping("/{id}")
    public DoctorEntity obtenerDoctorPorId(@PathVariable Long id){
        return doctorService.obtenerPorId(id);
    }

    @GetMapping("/nuevo-doctor")
    public String doctor(){
        return "nuevo-doctor";
    }
    @PostMapping("/nuevo-doctor")
    public String guardarDoctor(@RequestParam("contrasenia") String contrasenia,
                                      @RequestParam("id_institucion_vet_1") int id_institucion_vet_1,
                                      @RequestParam("id_institucion_vet_2") int id_institucion_vet_2,
                                      @RequestParam("id_institucion_vet_3") int id_institucion_vet_3,
                                      @RequestParam("id_pais") int id_pais,
                                      @RequestParam("rut") String rut,
                                      @RequestParam("matricula") String matricula,
                                      @RequestParam("nombre1") String nombre1,
                                      @RequestParam("nombre2") String nombre2,
                                      @RequestParam("apellido1") String apellido1,
                                      @RequestParam("apellido2") String apellido2,
                                      @RequestParam("id_genero") int id_genero,
                                      @RequestParam("dia_nac") int dia_nac,
                                      @RequestParam("mes_nac") int mes_nac,
                                      @RequestParam("anio_nac") int anio_nac,
                                      @RequestParam("id_nacionalidad") int id_nacionalidad,
                                      @RequestParam("id_especialidad_1") int id_especialidad_1,
                                      @RequestParam("id_especialidad_2") int id_especialidad_2,
                                      @RequestParam("id_especialidad_3") int id_especialidad_3,
                                      @RequestParam("resenia") String resenia,
                                      @RequestParam("resenia_confirmada") String resenia_confirmada,
                                      @RequestParam("id_estado_medico_vet") int id_estado_medico_vet,
                                      @RequestParam("telefono") String telefono,
                                      @RequestParam("codigo_area") String codigo_area,
                                      @RequestParam("celular") String celular,
                                      @RequestParam("id_convenio") int id_convenio,
                                      @RequestParam("email") String email,
                                      @RequestParam("RRSS1") String RRSS1,
                                      @RequestParam("RRSS2") String RRSS2,
                                      @RequestParam("asistente_nom") String asistente_nom,
                                      @RequestParam("asistente_telefono") String asistente_telefono,
                                      @RequestParam("asistente_codigo_area") String asistente_codigo_area,
                                      @RequestParam("asistente_celular") String asistente_celular,
                                      @RequestParam("otro") String otro) {
        doctorService.guardarDoctor(contrasenia, id_institucion_vet_1, id_institucion_vet_2, id_institucion_vet_3, id_pais,
                rut, matricula, nombre1, nombre2, apellido1, apellido2, id_genero, dia_nac, mes_nac, anio_nac, id_nacionalidad,
                id_especialidad_1, id_especialidad_2, id_especialidad_3, resenia, resenia_confirmada, id_estado_medico_vet,
                telefono, codigo_area, celular, id_convenio, email, RRSS1, RRSS2, asistente_nom, asistente_telefono, asistente_codigo_area,
                asistente_celular, otro);
        return "redirect:/nuevo-doctor";
    }


    @PutMapping("/{id}")
    public DoctorEntity actualizarDoctor(@PathVariable Long id, @RequestBody DoctorEntity doctorActualizado){
        return doctorService.actualizarDoctor(id, doctorActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminarDoctor(@PathVariable Long id){
        doctorService.eliminarDoctor(id);
    }
}
