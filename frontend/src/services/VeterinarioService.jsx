import axios from 'axios';

const VETERINARIO_API_URL = 'http://localhost:8080/doctor';

class VeterinarioService {
    guardarUDoctor(usuario) {
        return axios.post(`${VETERINARIO_API_URL}/nuevo-doctor`, usuario);
    }
}

const instance = new VeterinarioService();
export default instance;