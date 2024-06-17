import axios from "./axiosConfig";

const API_URL = 'http://localhost:8080/veterinaria/';

class VeterinariaService {
    getVeterinarias() {
        return axios.get(API_URL + 'obtener-veterinarias');
    }

    getVeterinariaById(idVeterinaria) {
        return axios.post(API_URL + 'obtener-veterinaria', { idVeterinaria });
    }

    createVeterinaria(veterinaria) {
        return axios.post(API_URL + 'nueva-veterinaria', veterinaria);
    }

    updateVeterinaria(idVeterinaria, veterinariaActualizada) {
        return axios.put(API_URL + 'actualizar-veterinaria', { idVeterinaria, veterinariaActualizada });
    }

    deleteVeterinaria(idVeterinaria) {
        return axios.delete(API_URL + 'eliminar-veterinaria', { data: { idVeterinaria } });
    }

    createDoctor(idVeterinaria, doctor) {
        return axios.post(API_URL + 'crear-doctor', { idVeterinaria, doctor });
    }

    updateDoctor(idVeterinaria, idDoctor, doctorActualizado) {
        return axios.put(API_URL + 'modificar-doctor', { idVeterinaria, idDoctor, doctorActualizado });
    }

    deleteDoctor(idVeterinaria, idDoctor) {
        return axios.delete(API_URL + 'eliminar-doctor', { data: { idVeterinaria, idDoctor } });
    }

    getDoctors(idVeterinaria) {
        return axios.post(API_URL + 'obtener-doctores-veterinaria', { idVeterinaria });
    }
}

export default new VeterinariaService();
