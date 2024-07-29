import axios from "./axiosConfig";

const HORARIO_API_URL = 'http://localhost:8080/bloqueHorario';

class HorarioService {

    createbloque(bloqueHorario) {
        return axios.post(HORARIO_API_URL + '/nuevo-bloqueHorario', bloqueHorario);
    }

    verbloque(idDoctor){
        return axios.get(HORARIO_API_URL + '/obtener-bloqueHorario-veterinario/'+ idDoctor);
    }

    crearBloqueHorarioPorDoctor(bloqueHorario) {
        return axios.post(HORARIO_API_URL + '/nuevo-bloqueHorario-doctor', bloqueHorario);
    }

}

export default new HorarioService();