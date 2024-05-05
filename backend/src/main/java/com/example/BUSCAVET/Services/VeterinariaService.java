package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class VeterinariaService {

    @Autowired
    VeterinariaRepository veterinariaRepository;

    public void guardarVeterinaria(String contrasenia,int id_pais,int id_segmento,int id_tipo_institucion_vet,int id_estado_institucion,
                                   String rut,String razon_social,String nombre_comercial,String nombre_1_rep_legal,String nombre_2_rep_legal,
                                   String resenia,String resenia_confirmada,String direccion,String numero,String tipo,String telefono,
                                   String codigo_area,String celular,int id_codigo_postal,int id_comuna,int id_provincia,int id_region,
                                   String geolocaclizacion,int id_zona_BDoc,int id_servicio){
        VeterinariaEntity veterinaria = new VeterinariaEntity();
        veterinaria.setContrasenia(contrasenia);
        veterinaria.setId_pais(id_pais);
        veterinaria.setId_segmento(id_segmento);
        veterinaria.setId_tipo_institucion_vet(id_tipo_institucion_vet);
        veterinaria.setId_estado_institucion(id_estado_institucion);
        veterinaria.setRut(rut);
        veterinaria.setRazon_social(razon_social);
        veterinaria.setNombre_comercial(nombre_comercial);
        veterinaria.setNombre_1_rep_legal(nombre_1_rep_legal);
        veterinaria.setNombre_2_rep_legal(nombre_2_rep_legal);
        veterinaria.setResenia(resenia);
        veterinaria.setResenia_confirmada(resenia_confirmada);
        veterinaria.setDireccion(direccion);
        veterinaria.setNumero(numero);
        veterinaria.setTipo(tipo);
        veterinaria.setTelefono(telefono);
        veterinaria.setCodigo_area(codigo_area);
        veterinaria.setCelular(celular);
        veterinaria.setId_codigo_postal(id_codigo_postal);
        veterinaria.setId_comuna(id_comuna);
        veterinaria.setId_provincia(id_provincia);
        veterinaria.setId_region(id_region);
        veterinaria.setGeolocaclizacion(geolocaclizacion);
        veterinaria.setId_zona_BDoc(id_zona_BDoc);
        veterinaria.setId_servicio(id_servicio);
        veterinariaRepository.save(veterinaria);
    }

    public ArrayList<VeterinariaEntity> obtenerVeterinarias(){
        return (ArrayList<VeterinariaEntity>) veterinariaRepository.findAll();}

    public VeterinariaEntity obtenerPorId(Long id){
        return veterinariaRepository.findById(id).orElse(null);
    }

    public VeterinariaEntity actualizarVeterinaria(Long id, VeterinariaEntity veterinariaActualizada){
        VeterinariaEntity veterinariaExistente = veterinariaRepository.findById(id).orElse(null);
        if(veterinariaExistente != null){
            veterinariaExistente.setContrasenia(veterinariaActualizada.getContrasenia());
            veterinariaExistente.setId_pais(veterinariaActualizada.getId_pais());
            veterinariaExistente.setId_segmento(veterinariaActualizada.getId_segmento());
            veterinariaExistente.setId_tipo_institucion_vet(veterinariaActualizada.getId_tipo_institucion_vet());
            veterinariaExistente.setId_estado_institucion(veterinariaActualizada.getId_estado_institucion());
            veterinariaExistente.setRut(veterinariaActualizada.getRut());
            veterinariaExistente.setRazon_social(veterinariaActualizada.getRazon_social());
            veterinariaExistente.setNombre_comercial(veterinariaActualizada.getNombre_comercial());
            veterinariaExistente.setNombre_1_rep_legal(veterinariaActualizada.getNombre_1_rep_legal());
            veterinariaExistente.setNombre_2_rep_legal(veterinariaActualizada.getNombre_2_rep_legal());
            veterinariaExistente.setResenia(veterinariaActualizada.getResenia());
            veterinariaExistente.setResenia_confirmada(veterinariaActualizada.getResenia_confirmada());
            veterinariaExistente.setDireccion(veterinariaActualizada.getDireccion());
            veterinariaExistente.setNumero(veterinariaActualizada.getNumero());
            veterinariaExistente.setTipo(veterinariaActualizada.getTipo());
            veterinariaExistente.setTelefono(veterinariaActualizada.getTelefono());
            veterinariaExistente.setCodigo_area(veterinariaActualizada.getCodigo_area());
            veterinariaExistente.setCelular(veterinariaActualizada.getCelular());
            veterinariaExistente.setId_codigo_postal(veterinariaActualizada.getId_codigo_postal());
            veterinariaExistente.setId_comuna(veterinariaActualizada.getId_comuna());
            veterinariaExistente.setId_provincia(veterinariaActualizada.getId_provincia());
            veterinariaExistente.setId_region(veterinariaActualizada.getId_region());
            veterinariaExistente.setGeolocaclizacion(veterinariaActualizada.getGeolocaclizacion());
            veterinariaExistente.setId_zona_BDoc(veterinariaActualizada.getId_zona_BDoc());
            veterinariaExistente.setId_servicio(veterinariaActualizada.getId_servicio());
            return veterinariaRepository.save(veterinariaExistente);
        }
        return null;
    }
    public void eliminarVeterinaria(Long id){veterinariaRepository.deleteById(id);}
}
