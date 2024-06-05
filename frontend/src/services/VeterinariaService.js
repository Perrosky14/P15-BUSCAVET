import axios from 'axios';

const API_URL = 'http://localhost:8080/veterinaria';

class VeterinariaService {
    getVeterinarias() {
        return axios.get(API_URL + '/obtener-veterinarias');
    }
    
    getVeterinariaById(id) {
        return axios.post(API_URL + '/obtener-veterinaria', { idVeterinaria: id });
    }

    createVeterinaria(veterinaria) {
        return axios.post(API_URL + '/nueva-veterinaria', veterinaria);
    }

    updateVeterinaria(id, veterinariaActualizada) {
        return axios.put(API_URL + '/actualizar-veterinaria', {
            idVeterinaria: id,
            veterinariaActualizada: veterinariaActualizada
        });
    }
    
    deleteVeterinaria(id) {
        return axios.delete(API_URL + '/eliminar-veterinaria', { data: { idVeterinaria: id } });
    }
}

export default new VeterinariaService();