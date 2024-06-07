import axios from 'axios';

const API_URL = 'http://localhost:8080/doctor/';

class DoctorService {

    getDoctores() {
        return axios.get(API_URL + 'obtener-doctores');
    }

    getDoctorById(idDoctor) {
        return axios.post(API_URL + 'obtener-doctor', { idDoctor });
    }

    createDoctor(doctor) {
        return axios.post(API_URL + 'nuevo-doctor', doctor);
    }

    updateDoctor(idDoctor, doctorActualizado) {
        return axios.put(API_URL + 'actualizar-doctor', { idDoctor, doctorActualizado });
    }

    deleteDoctor(idDoctor) {
        return axios.delete(API_URL + 'eliminar-doctor', { data: { idDoctor } });
    }
}

export default new DoctorService();
