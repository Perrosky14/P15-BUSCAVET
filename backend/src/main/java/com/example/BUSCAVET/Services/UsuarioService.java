package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.Rol;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import com.example.BUSCAVET.Repositories.UsuarioRepository;
import com.example.BUSCAVET.Security.AuthResponse;
import com.example.BUSCAVET.Security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    JWTService jwtService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthResponse guardarUsuario(UsuarioEntity usuario){
        usuario.setRol(Rol.USUARIO);
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        usuarioRepository.save(usuario);
        return AuthResponse.builder().token(jwtService.getToken(usuario)).build();
    }

    public ArrayList<UsuarioEntity> obtenerUsuarios(){
        return (ArrayList<UsuarioEntity>) usuarioRepository.findAll();
    }

    public UsuarioEntity obtenerPorId(Long id){
        return usuarioRepository.findById(id).orElse(null);}

    public Optional<UsuarioEntity> obtenerPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

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

    public UsuarioEntity transformarDatosUsuario(Map<String, Object> usuarioData) {
        UsuarioEntity usuario = new UsuarioEntity();
        usuario.setContrasenia((String) usuarioData.get("contrasenia"));
        usuario.setId_pais((Integer) usuarioData.get("id_pais"));
        usuario.setRut((String) usuarioData.get("rut"));
        usuario.setNombre1((String) usuarioData.get("nombre1"));
        usuario.setNombre2((String) usuarioData.get("nombre2"));
        usuario.setApellido1((String) usuarioData.get("apellido1"));
        usuario.setApellido2((String) usuarioData.get("apellido2"));
        usuario.setId_genero((Integer) usuarioData.get("id_genero"));
        usuario.setDia_nac((Integer) usuarioData.get("dia_nac"));
        usuario.setMes_nac((Integer) usuarioData.get("mes_nac"));
        usuario.setAnio_nac((Integer) usuarioData.get("anio_nac"));
        usuario.setId_nacionalidad((Integer) usuarioData.get("id_nacionalidad"));
        usuario.setOtro((String) usuarioData.get("otro"));
        usuario.setDireccion((String) usuarioData.get("direccion"));
        usuario.setNumero((String) usuarioData.get("numero"));
        usuario.setTipo((String) usuarioData.get("tipo"));
        usuario.setId_codigo_postal((Integer) usuarioData.get("id_codigo_postal"));
        usuario.setId_comuna((Integer) usuarioData.get("id_comuna"));
        usuario.setId_provincia((Integer) usuarioData.get("id_provincia"));
        usuario.setId_region((Integer) usuarioData.get("id_region"));
        usuario.setGeolocalizacion((String) usuarioData.get("geolocalizacion"));
        usuario.setId_zona_BDoc((Integer) usuarioData.get("id_zona_BDoc"));
        usuario.setOtro2((String) usuarioData.get("otro2"));
        usuario.setTelefono((String) usuarioData.get("telefono"));
        usuario.setCodigo_area((String) usuarioData.get("codigo_area"));
        usuario.setCelular((String) usuarioData.get("celular"));
        usuario.setEmail((String) usuarioData.get("email"));
        usuario.setRRSS1((String) usuarioData.get("rrss1"));
        usuario.setRRSS2((String) usuarioData.get("rrss2"));
        usuario.setOtro3((String) usuarioData.get("otro3"));
        return usuario;
    }

    public void eliminarUsuario(Long id){usuarioRepository.deleteById(id);}

}
