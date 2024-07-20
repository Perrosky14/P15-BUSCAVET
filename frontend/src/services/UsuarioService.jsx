import axios from "./axiosConfig";

const USUARIO_API_URL = 'http://localhost:8080/usuario';

class UsuarioService {

    guardarUsuario(usuario) {
        return axios.post(USUARIO_API_URL + '/nuevo-usuario', usuario);
    }

    getMascotas(idUsuario) {
        return axios.post(USUARIO_API_URL + '/obtener-mascotas',  {idUsuario});
    }

    getMascotaById(idMascota) {
        return axios.post(USUARIO_API_URL + '/obtener-mascota', { idMascota });
    }

    createMascota(idUsuario, mascota) {
        return axios.post(USUARIO_API_URL + '/crear-mascota', {idUsuario, mascota});
    }

    updateMascota(idMascota, mascotaActualizada) {
        return axios.put(USUARIO_API_URL + '/actualizar-mascota', { idMascota, mascotaActualizada });
    }

    deleteMascota(idUsuario, idMascota) {
        return axios.delete(USUARIO_API_URL + '/eliminar-mascota', { data: { idUsuario, idMascota } });

    }
}

export default new UsuarioService();

