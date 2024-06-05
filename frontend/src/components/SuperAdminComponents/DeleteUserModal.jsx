import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal'; // Importa el nuevo componente
import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import MascotaService from '../../services/MascotaService';
import VeterinariaService from '../../services/VeterinariaService';

const DeleteUserModal = ({ show, handleClose, user, handleDelete, reloadCurrentPage }) => {
    const handleConfirmDelete = () => {
        const idNumber = parseInt(user.id.match(/\d+/)[0], 10);
        switch (user.tipo) {
            case 'Doctor':
                DoctorService.deleteDoctor(idNumber)
                    .then(response => {
                        console.log("User deleted:", response.data);
                        handleDelete(user.id);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error deleting the doctor!", error);
                    });
                break;
            case 'Usuario':
                UsuarioService.deleteUsuario(idNumber)
                    .then(response => {
                        console.log("User deleted:", response.data);
                        handleDelete(user.id);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error deleting the usuario!", error);
                    });
                break;
            case 'Veterinaria':
                VeterinariaService.deleteVeterinaria(idNumber)
                    .then(response => {
                        console.log("User deleted:", response.data);
                        handleDelete(user.id);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error deleting the veterinaria!", error);
                    });
                break;
            case 'Mascota':
                MascotaService.deleteMascota(idNumber)
                    .then(response => {
                        console.log("User deleted:", response.data);
                        handleDelete(user.id);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error deleting the mascota!", error);
                    });
                break;
            default:
                console.error("Unknown user type:", user.tipo);
        }
    };

    return (
        <ConfirmModal
            show={show}
            handleClose={handleClose}
            handleConfirm={handleConfirmDelete}
            message={`¿Estás seguro de que deseas eliminar al usuario ${user.name}?`}
        />
    );
};

export default DeleteUserModal;