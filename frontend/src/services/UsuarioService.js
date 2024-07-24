import axios from 'axios';

const API_URL = 'http://localhost:8080/usuario';

class UsuarioService {
    getUsuarios() {
        return axios.get(API_URL + '/obtener-usuarios');
    }
    
    getUsuarioById(id) {
        return axios.post(API_URL + '/obtener-usuario', { idUsuario: id });
    }

    createUsuario(usuario) {
        return axios.post(API_URL + '/nuevo-usuario', usuario);
    }

    updateUsuario(id, usuarioActualizado) {
        return axios.put(API_URL + '/actualizar-usuario', {
            idUsuario: id,
            usuarioActualizado: usuarioActualizado
        });
    }
    
    deleteUsuario(id) {
        return axios.delete(API_URL + '/eliminar-usuario', { data: { idUsuario: id } });
    }
}

export default new UsuarioService();