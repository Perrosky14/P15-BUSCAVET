package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.Rol;
import com.example.BUSCAVET.Entities.VeterinariaEntity;
import com.example.BUSCAVET.Repositories.VeterinariaRepository;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
public class VeterinariaService {

    @Autowired
    VeterinariaRepository veterinariaRepository;

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthResponse guardarVeterinaria(VeterinariaEntity veterinaria){
        veterinaria.setRol(Rol.VETERINARIA);
        veterinaria.setContrasenia(passwordEncoder.encode(veterinaria.getContrasenia()));
        veterinariaRepository.save(veterinaria);
        return AuthResponse.builder().token(jwtService.getToken(veterinaria)).build();
    }

    public ArrayList<VeterinariaEntity> obtenerVeterinarias(){
        return (ArrayList<VeterinariaEntity>) veterinariaRepository.findAll();}

    public VeterinariaEntity obtenerPorId(Long id){
        return veterinariaRepository.findById(id).orElse(null);
    }

    public Optional<VeterinariaEntity> obtenerPorEmail(String email) {
        return veterinariaRepository.findByEmail(email);
    }

    public VeterinariaEntity actualizarVeterinaria(Long id, VeterinariaEntity veterinariaActualizada){
        VeterinariaEntity veterinariaExistente = veterinariaRepository.findById(id).orElse(null);
        if(veterinariaExistente != null){
            veterinariaExistente.setContrasenia(passwordEncoder.encode(veterinariaActualizada.getContrasenia()));
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
            veterinariaExistente.setGeolocalizacion(veterinariaActualizada.getGeolocalizacion());
            veterinariaExistente.setId_zona_BDoc(veterinariaActualizada.getId_zona_BDoc());
            veterinariaExistente.setId_servicio(veterinariaActualizada.getId_servicio());
            return veterinariaRepository.save(veterinariaExistente);
        }
        return null;
    }

    public VeterinariaEntity transformarDatosVeterinaria(Map<String, Object> veterinariaData) {
        VeterinariaEntity veterinaria = new VeterinariaEntity();
        veterinaria.setContrasenia((String) veterinariaData.get("contrasenia"));
        veterinaria.setId_pais((Integer) veterinariaData.get("id_pais"));
        veterinaria.setId_segmento((Integer) veterinariaData.get("id_segmento"));
        veterinaria.setId_tipo_institucion_vet((Integer) veterinariaData.get("id_tipo_institucion_vet"));
        veterinaria.setId_estado_institucion((Integer) veterinariaData.get("id_estado_institucion"));
        veterinaria.setRut((String) veterinariaData.get("rut"));
        veterinaria.setRazon_social((String) veterinariaData.get("razon_social"));
        veterinaria.setNombre_comercial((String) veterinariaData.get("nombre_comercial"));
        veterinaria.setNombre_1_rep_legal((String) veterinariaData.get("nombre_1_rep_legal"));
        veterinaria.setNombre_2_rep_legal((String) veterinariaData.get("nombre_2_rep_legal"));
        veterinaria.setResenia((String) veterinariaData.get("resenia"));
        veterinaria.setResenia_confirmada((String) veterinariaData.get("resenia_confirmada"));
        veterinaria.setDireccion((String) veterinariaData.get("direccion"));
        veterinaria.setNumero((String) veterinariaData.get("numero"));
        veterinaria.setTipo((String) veterinariaData.get("telefono"));
        veterinaria.setCodigo_area((String) veterinariaData.get("codigo_area"));
        veterinaria.setCelular((String) veterinariaData.get("celular"));
        veterinaria.setId_codigo_postal((Integer) veterinariaData.get("id_codigo_postal"));
        veterinaria.setId_comuna((Integer) veterinariaData.get("id_comuna"));
        veterinaria.setId_provincia((Integer) veterinariaData.get("id_provincia"));
        veterinaria.setId_region((Integer) veterinariaData.get("id_region"));
        veterinaria.setGeolocalizacion((String) veterinariaData.get("geolocalizacion"));
        veterinaria.setId_zona_BDoc((Integer) veterinariaData.get("id_zona_BDoc"));
        veterinaria.setId_servicio((Integer) veterinariaData.get("id_servicio"));
        veterinaria.setValidado((Boolean) veterinariaData.get("validado"));
        return veterinaria;
    }
    public void eliminarVeterinaria(Long id){veterinariaRepository.deleteById(id);}

}
