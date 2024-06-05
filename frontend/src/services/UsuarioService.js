import axios from 'axios';

const API_URL = 'http://localhost:8080/mascota/';

class MascotaService {

    getMascotas() {
        return axios.get(API_URL + 'obtener-mascotas');
    }

    getMascotaById(idMascota) {
        return axios.post(API_URL + 'obtener-mascota', { idMascota });
    }

    createMascota(mascota) {
        return axios.post(API_URL + 'nueva-mascota', mascota);
    }

    updateMascota(idMascota, mascotaActualizada) {
        return axios.put(API_URL + 'actualizar-mascota', { idMascota, mascotaActualizada });
    }

    deleteMascota(idMascota) {
        return axios.delete(API_URL + 'eliminar-mascota', { data: { idMascota } });
    }
}

export default new MascotaService();
