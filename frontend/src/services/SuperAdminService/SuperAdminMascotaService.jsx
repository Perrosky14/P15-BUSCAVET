import axios from "../axiosConfig";

const API_URL = 'http://localhost:8080/superAdmin/';

class SuperAdminServiceMascotaService {

    // Obtener todas las mascotas
    getMascotas() {
        return axios.get(API_URL + 'obtener-mascotas');
    }

    // Crear mascota
    createMascota(idSuperAdmin, nuevaMascota) {
        return axios.post(API_URL + 'crear-mascota', { idSuperAdmin, nuevaMascota });
    }

    // Modificar mascota
    updateMascota(idSuperAdmin, idMascota, mascotaActualizada) {
        return axios.put(API_URL + 'modificar-mascota', { idSuperAdmin, idMascota, mascotaActualizada });
    }

    // Eliminar mascota
    deleteMascota(idSuperAdmin, idMascota) {
        return axios.delete(API_URL + 'eliminar-mascota', { data: { idSuperAdmin, idMascota } });
    }
}

export default new SuperAdminServiceMascotaService();
