import axios from "./axiosConfig";

const USUARIO_API_URL = "http://localhost:8080/usuario";

class UsuarioService {

    guardarUsuario(usuario) {
        return axios.post(USUARIO_API_URL + "/nuevo-usuario", usuario);
    }

}

export default new UsuarioService();