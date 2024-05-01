package Services;

import Entities.VeterinariaEntity;
import Repositories.VeterinariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
@Service
public class VeterinariaService {

    @Autowired
    VeterinariaRepository veterinariaRepository;

    public void guardarVeterinaria(){
        VeterinariaEntity veterinaria = new VeterinariaEntity();
    }

    public ArrayList<VeterinariaEntity> obtenerVeterinarias(){
        return (ArrayList<VeterinariaEntity>) veterinariaRepository.findAll();}

}
