package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public void guardarUsuario(int id_pais,String rut,String nombre1,String nombre2,String apellido1,String apellido2,
                               int id_genero,int dia_nac,int mes_nac,int anio_nac,int id_nacionalidad,String otro,
                               String direccion,String numero,String tipo,int id_codigo_postal,int id_comuna,
                               int id_provincia,int id_region,String geolocalizacion,int id_zona_BDoc,String otro2,
                               String telefono,String codigo_area,String celular,String email,String RRSS1,String RRSS2,
                               String otro3){
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setId_pais(id_pais);
        usuario.setRut(rut);
        usuario.setNombre1(nombre1);
        usuario.setNombre2(nombre2);
        usuario.setApellido1(apellido1);
        usuario.setApellido2(apellido2);
        usuario.setId_genero(id_genero);
        usuario.setDia_nac(dia_nac);
        usuario.setMes_nac(mes_nac);
        usuario.setAnio_nac(anio_nac);
        usuario.setId_nacionalidad(id_nacionalidad);
        usuario.setOtro(otro);
        usuario.setDireccion(direccion);
        usuario.setNumero(numero);
        usuario.setTipo(tipo);
        usuario.setId_codigo_postal(id_codigo_postal);
        usuario.setId_comuna(id_comuna);
        usuario.setId_provincia(id_provincia);
        usuario.setId_region(id_region);
        usuario.setGeolocalizacion(geolocalizacion);
        usuario.setId_zona_BDoc(id_zona_BDoc);
        usuario.setOtro2(otro2);
        usuario.setTelefono(telefono);
        usuario.setCodigo_area(codigo_area);
        usuario.setCelular(celular);
        usuario.setEmail(email);
        usuario.setRRSS1(RRSS1);
        usuario.setRRSS2(RRSS2);
        usuario.setOtro3(otro3);
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
            usuarioExistente.setNombre1(usuarioActualizado.getNombre1());
            usuarioExistente.setNombre2(usuarioActualizado.getNombre2());
            usuarioExistente.setApellido1(usuarioActualizado.getApellido1());
            usuarioExistente.setApellido2(usuarioActualizado.getApellido2());
            usuarioExistente.setRut(usuarioActualizado.getRut());
            usuarioExistente.setContrasenia(usuarioActualizado.getContrasenia());
            usuarioExistente.setDia_nac(usuarioActualizado.getDia_nac());
            usuarioExistente.setMes_nac(usuarioActualizado.getMes_nac());
            usuarioExistente.setAnio_nac(usuarioActualizado.getAnio_nac());
            usuarioExistente.setOtro(usuarioActualizado.getOtro());
            usuarioExistente.setDireccion(usuarioActualizado.getDireccion());
            usuarioExistente.setNumero(usuarioActualizado.getNumero());
            usuarioExistente.setTipo(usuarioActualizado.getTipo());
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
}
