import axios from 'axios';

const API_URL = 'http://localhost:8080/mascota';

class MascotaService {
    getMascotas() {
        return axios.get(API_URL + '/obtener-mascotas');
    }
    
    getMascotaById(id) {
        return axios.post(API_URL + '/obtener-mascota', { idMascota: id });
    }

    createMascota(mascota) {
        return axios.post(API_URL + '/nueva-mascota', mascota);
    }

    updateMascota(id, mascotaActualizada) {
        return axios.put(API_URL + '/actualizar-mascota', {
            idMascota: id,
            mascotaActualizada: mascotaActualizada
        });
    }
    
    deleteMascota(id) {
        return axios.delete(API_URL + '/eliminar-mascota', { data: { idMascota: id } });
    }
}

export default new MascotaService();
