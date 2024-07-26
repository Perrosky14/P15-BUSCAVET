import axios from "../axiosConfig";

const API_URL = 'http://localhost:8080/superAdmin/';

class SuperAdminServiceVeterinariaService {

    // Obtener veterinarias
    getVeterinarias() {
        return axios.get(API_URL + 'obtener-veterinarias');
    }

    // Crear veterinaria
    createVeterinaria(idSuperAdmin, veterinaria) {
        return axios.post(API_URL + 'crear-veterinaria', { idSuperAdmin, veterinaria });
    }

    // Modificar veterinaria
    updateVeterinaria(idSuperAdmin, idVeterinaria, veterinariaActualizada) {
        return axios.put(API_URL + 'modificar-veterinaria', { idSuperAdmin, idVeterinaria, veterinariaActualizada });
    }

    // Eliminar veterinaria
    deleteVeterinaria(idSuperAdmin, idVeterinaria) {
        return axios.delete(API_URL + 'eliminar-veterinaria', { data: { idSuperAdmin, idVeterinaria } });
    }
}

export default new SuperAdminServiceVeterinariaService();