import axios from './axiosConfig';

const API_URL = "http://localhost:8080/bloqueHora";

class BloqueHoraService {
    obtenerBloquesHora() {
        return axios.get(API_URL + '/obtener-bloquesHora');
    }

    obtenerBloqueHoraPorId(idBloqueHora) {
        return axios.post(API_URL + '/obtener-bloqueHora', { idBloqueHora });
    }

    obtenerBloquesHoraPorUsuario(idUsuario) {
        return axios.post(API_URL + '/obtener-bloquesHora-usuario', { idUsuario });
    }

    obtenerBloquesHoraPorVeterinario(idVeterinario) {
        return axios.post(API_URL + '/obtener-bloquesHora-veterinario', { idVeterinario});
    }

    obtenerBloquesHoraPorMascota(idMascota) {
        return axios.post(API_URL + '/obtener-bloquesHora-mascota', { idMascota });
    }

    guardarBloqueHora(bloqueHora) {
        return axios.post(API_URL + '/nuevo-bloqueHora', bloqueHora);
    }

    guardarBloqueHoraDoctor(idDoctor, bloqueHora) {
        return axios.post(API_URL + '/nuevo-bloqueHora-doctor', { idDoctor, bloqueHora });
    }

    agendarBloqueHora(idBloqueHora, idUsuario, idMascota, motivo) {
        return axios.post(API_URL + '/agendar-hora', { idBloqueHora, idUsuario, idMascota, motivo });
    }

    actualizarBloqueHora(idBloqueHora, bloqueHoraActualizada) {
        return axios.put(API_URL + '/actualizar-bloqueHora', { idBloqueHora, bloqueHoraActualizada });
    }

    eliminarBloqueHora(idBloqueHora) {
        return axios.delete(API_URL + '/eliminar-bloqueHora', { data: { idBloqueHora } });
    }
}

export default new BloqueHoraService();
