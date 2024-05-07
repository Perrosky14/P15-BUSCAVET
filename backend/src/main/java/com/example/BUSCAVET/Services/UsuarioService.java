package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public void guardarUsuario(UsuarioEntity usuario){
        usuarioRepository.save(usuario);
    }

    public ArrayList<UsuarioEntity> obtenerUsuarios(){
        return (ArrayList<UsuarioEntity>) usuarioRepository.findAll();
    }

    public UsuarioEntity obtenerPorId(Long id){
        return usuarioRepository.findById(id).orElse(null);}

    public UsuarioEntity actualizarUsuario(Long id, UsuarioEntity usuarioActualizado){
        UsuarioEntity usuarioExistente = usuarioRepository.findById(id).orElse(null);
        if (usuarioExistente != null){
            usuarioExistente.setContrasenia(usuarioActualizado.getContrasenia());
            usuarioExistente.setId_pais(usuarioActualizado.getId_pais());
            usuarioExistente.setRut(usuarioActualizado.getRut());
            usuarioExistente.setNombre1(usuarioActualizado.getNombre1());
            usuarioExistente.setNombre2(usuarioActualizado.getNombre2());
            usuarioExistente.setApellido1(usuarioActualizado.getApellido1());
            usuarioExistente.setApellido2(usuarioActualizado.getApellido2());
            usuarioExistente.setId_genero(usuarioActualizado.getId_genero());
            usuarioExistente.setDia_nac(usuarioActualizado.getDia_nac());
            usuarioExistente.setMes_nac(usuarioActualizado.getMes_nac());
            usuarioExistente.setAnio_nac(usuarioActualizado.getAnio_nac());
            usuarioExistente.setId_genero(usuarioActualizado.getId_genero());
            usuarioExistente.setOtro(usuarioActualizado.getOtro());
            usuarioExistente.setDireccion(usuarioActualizado.getDireccion());
            usuarioExistente.setNumero(usuarioActualizado.getNumero());
            usuarioExistente.setTipo(usuarioActualizado.getTipo());
            usuarioExistente.setId_codigo_postal(usuarioActualizado.getId_codigo_postal());
            usuarioExistente.setId_comuna(usuarioActualizado.getId_comuna());
            usuarioExistente.setId_provincia(usuarioActualizado.getId_provincia());
            usuarioExistente.setId_region(usuarioActualizado.getId_region());
            usuarioExistente.setGeolocalizacion(usuarioActualizado.getGeolocalizacion());
            usuarioExistente.setId_zona_BDoc(usuarioActualizado.getId_zona_BDoc());
            usuarioExistente.setOtro2(usuarioActualizado.getOtro2());
            usuarioExistente.setTelefono(usuarioActualizado.getTelefono());
            usuarioExistente.setCodigo_area(usuarioActualizado.getCodigo_area());
            usuarioExistente.setCelular(usuarioActualizado.getCelular());
            usuarioExistente.setEmail(usuarioActualizado.getEmail());
            usuarioExistente.setRRSS1(usuarioActualizado.getRRSS1());
            usuarioExistente.setRRSS2(usuarioActualizado.getRRSS2());
            usuarioExistente.setOtro3(usuarioActualizado.getOtro3());
            return usuarioRepository.save(usuarioExistente);
        }
        return null;
    }
    public void eliminarUsuario(Long id){usuarioRepository.deleteById(id);}

    public ResponseEntity<String> registrarMascota(Long id, MascotaEntity mascota){
        UsuarioEntity usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario != null){
            mascota.setUsuario(usuario);
            usuario.getMascotas().add(mascota);
            usuarioRepository.save(usuario);
            return ResponseEntity.ok("La mascota " + mascota.getNombre() + " ha sido registrada correctamente por " +
                    "el usuario con el ID: " + id);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se ha encontrado ningun usuario que tenga el id: " + id);
        }
    }
}
