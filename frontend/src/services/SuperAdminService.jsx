import axios from "./axiosConfig";

const API_URL = 'http://localhost:8080/superAdmin/';

class SuperAdminService {

    // SuperAdmin
    getSuperAdmins() {
        return axios.get(API_URL + 'obtener-superAdmins');
    }

    getSuperAdminById(idSuperAdmin) {
        return axios.post(API_URL + 'obtener-superAdmin', { idSuperAdmin });
    }

    createSuperAdmin(superAdmin) {
        return axios.post(API_URL + 'nuevo-superAdmin', superAdmin);
    }

    updateSuperAdmin(idSuperAdmin, superAdminActualizado) {
        return axios.put(API_URL + 'actualizar-superAdmin', { idSuperAdmin, superAdminActualizado });
    }

    deleteSuperAdmin(idSuperAdmin) {
        return axios.delete(API_URL + 'eliminar-superAdmin', { data: { idSuperAdmin } });
    }

    // Veterinaria
    createVeterinaria(idSuperAdmin, veterinaria) {
        return axios.post(API_URL + 'crear-veterinaria', { idSuperAdmin, veterinaria });
    }

    updateVeterinaria(idSuperAdmin, idVeterinaria, veterinariaActualizada) {
        return axios.put(API_URL + 'modificar-veterinaria', { idSuperAdmin, idVeterinaria, veterinariaActualizada });
    }

    deleteVeterinaria(idSuperAdmin, idVeterinaria) {
        return axios.delete(API_URL + 'eliminar-veterinaria', { data: { idSuperAdmin, idVeterinaria } });
    }

    // Doctor
    updateDoctor(idSuperAdmin, idDoctor, doctorActualizado) {
        return axios.put(API_URL + 'modificar-doctor', { idSuperAdmin, idDoctor, doctorActualizado });
    }

    deleteDoctor(idSuperAdmin, idDoctor) {
        return axios.delete(API_URL + 'eliminar-doctor', { data: { idSuperAdmin, idDoctor } });
    }

    // Usuario
    updateUsuario(idSuperAdmin, idUsuario, usuarioActualizado) {
        return axios.put(API_URL + 'modificar-usuario', { idSuperAdmin, idUsuario, usuarioActualizado });
    }

    deleteUsuario(idSuperAdmin, idUsuario) {
        return axios.delete(API_URL + 'eliminar-usuario', { data: { idSuperAdmin, idUsuario } });
    }

    // Mascota
    updateMascota(idSuperAdmin, idMascota, mascotaActualizada) {
        return axios.put(API_URL + 'modificar-mascota', { idSuperAdmin, idMascota, mascotaActualizada });
    }

    deleteMascota(idSuperAdmin, idMascota) {
        return axios.delete(API_URL + 'eliminar-mascota', { data: { idSuperAdmin, idMascota } });
    }
}

export default new SuperAdminService();
