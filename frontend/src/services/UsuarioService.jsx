import axios from "axios";

const USUARIO_API_URL = 'http://localhost:8080/usuario';

class UsuarioService {

    guardarUsuario(usuario) {
        return axios.post(USUARIO_API_URL + '/nuevo-usuario', usuario);
    }

    getMascotas() {
        return axios.get(USUARIO_API_URL + '/obtener-mascotas');
    }

    getMascotaById(idMascota) {
        return axios.post(USUARIO_API_URL + '/obtener-mascota', { idMascota });
    }

    createMascota(mascota) {
        return axios.post(USUARIO_API_URL + '/nueva-mascota', mascota);
    }

    updateMascota(idMascota, mascotaActualizada) {
        return axios.put(USUARIO_API_URL + '/actualizar-mascota', { idMascota, mascotaActualizada });
    }

    deleteMascota(idMascota) {
        return axios.delete(USUARIO_API_URL + '/eliminar-mascota', { data: { idMascota } });

    }
}

export default new UsuarioService();

