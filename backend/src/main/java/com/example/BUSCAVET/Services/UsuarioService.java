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
                               int id_genero,int dia_nac,int mes_nac,int año_nac,int id_nacionalidad,String otro,
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
        usuario.setAño_nac(año_nac);
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
    }

    public ArrayList<UsuarioEntity> obtenerUsuarios(){
        return (ArrayList<UsuarioEntity>) usuarioRepository.findAll();
    }
}
