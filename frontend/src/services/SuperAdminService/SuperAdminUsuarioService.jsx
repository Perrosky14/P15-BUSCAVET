import axios from "../axiosConfig";

const API_URL = 'http://localhost:8080/superAdmin/';

class SuperAdminServiceUsuarioService {

    // Obtener todos los usuarios
    getUsuarios() {
        return axios.get(API_URL + 'obtener-usuarios');
    }

    // Crear usuario
    createUsuario(idSuperAdmin, nuevoUsuario) {
        return axios.post(API_URL + 'crear-usuario', { idSuperAdmin, nuevoUsuario });
    }

    // Modificar usuario
    updateUsuario(idSuperAdmin, idUsuario, usuarioActualizado) {
        return axios.put(API_URL + 'modificar-usuario', { idSuperAdmin, idUsuario, usuarioActualizado });
    }

    // Eliminar usuario
    deleteUsuario(idSuperAdmin, idUsuario) {
        return axios.delete(API_URL + 'eliminar-usuario', { data: { idSuperAdmin, idUsuario } });
    }
}

export default new SuperAdminServiceUsuarioService();