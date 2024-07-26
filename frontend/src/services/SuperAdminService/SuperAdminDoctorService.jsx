import axios from "../axiosConfig";

const API_URL = 'http://localhost:8080/superAdmin/';

class SuperAdminDoctorService {

    getDoctores() {
        return axios.get(API_URL + 'obtener-doctores');
    }

    getDoctorById(idDoctor) {
        return axios.post(API_URL + 'obtener-doctor', { idDoctor });
    }

    createDoctor(idSuperAdmin, nuevoDoctor) {
        return axios.post(API_URL + 'crear-doctor', { idSuperAdmin, nuevoDoctor });
    }

    updateDoctor(idSuperAdmin, idDoctor, doctorActualizado) {
        return axios.put(API_URL + 'modificar-doctor', { idSuperAdmin, idDoctor, doctorActualizado });
    }

    deleteDoctor(idSuperAdmin, idDoctor) {
        return axios.delete(API_URL + 'eliminar-doctor', { data: { idSuperAdmin, idDoctor } });
    }
}

export default new SuperAdminDoctorService();
