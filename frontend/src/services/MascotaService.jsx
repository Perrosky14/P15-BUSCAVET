import axios from 'axios';

const API_URL = 'http://localhost:8080/mascotas/';

class MascotaService {
  getMascotas() {
    return axios.get(API_URL);
  }

  getMascotaById(mascotaId) {
    return axios.get(API_URL + mascotaId);
  }
  

  createMascota(mascota) {
    return axios.post(API_URL, mascota);
  }

  updateMascota(mascotaId, mascota) {
    return axios.put(API_URL + mascotaId, mascota);
  }

  deleteMascota(mascotaId) {
    return axios.delete(API_URL + mascotaId);
  }

}

export default new MascotaService();