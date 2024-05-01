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

    public void guardarMascota(){
        MascotaEntity mascota = new MascotaEntity();
    }

    public ArrayList<MascotaEntity> obtenerMascotas(){
        return (ArrayList<MascotaEntity>) mascotaRepository.findAll();}
}
