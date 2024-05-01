package Services;

import Entities.MascotaEntity;
import Repositories.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class MascotaService {

    @Autowired
    MascotaRepository mascotaRepository;

    public void guardarMascota(int id_usuario,int id_categoria_animal,int id_especie,int id_raza, int id_sexo,
                               String nombre,int dia_nac,int mes_nac,int año_nac,String otro, String historial_consulta,
                               Double estatura,String color,Double peso,String otro2){
        MascotaEntity mascota = new MascotaEntity();
        mascota.setId_usuario(id_usuario);
        mascota.setId_categoria_animal(id_categoria_animal);
        mascota.setId_especie(id_especie);
        mascota.setId_raza(id_raza);
        mascota.setId_sexo(id_sexo);
        mascota.setNombre(nombre);
        mascota.setDia_nac(dia_nac);
        mascota.setMes_nac(mes_nac);
        mascota.setAño_nac(año_nac);
        mascota.setOtro(otro);
        mascota.setHistorial_consulta(historial_consulta);
        mascota.setEstatura(estatura);
        mascota.setColor(color);
        mascota.setPeso(peso);
        mascota.setOtro2(otro2);
    }

    public ArrayList<MascotaEntity> obtenerMascotas(){
        return (ArrayList<MascotaEntity>) mascotaRepository.findAll();}
}
