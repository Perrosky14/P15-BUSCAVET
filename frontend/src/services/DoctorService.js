import axios from 'axios';

const API_URL = 'http://localhost:8080/doctor';

class DoctorService {
    getDoctors() {
        return axios.get(API_URL + '/obtener-doctores')
    }
    
    getDoctorById(id) {
        return axios.post(API_URL + '/obtener-doctor', { idDoctor: id });
    }
    
    createDoctor(doctor) {
        return axios.post(API_URL + '/nuevo-doctor', doctor);
    }
    
    updateDoctor(id, doctorActualizado) {
        return axios.put(API_URL + '/actualizar-doctor', {
            idDoctor: id,
            doctorActualizado: doctorActualizado
        });
    }
    
    deleteDoctor(id) {
        return axios.delete(API_URL + '/eliminar-doctor', { data: { idDoctor: id } });
    }
}

export default new DoctorService();