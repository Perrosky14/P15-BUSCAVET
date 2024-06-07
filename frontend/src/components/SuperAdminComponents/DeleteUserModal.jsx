import React from 'react';
import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import MascotaService from '../../services/MascotaService';
import VeterinariaService from '../../services/VeterinariaService';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmModal = ({ show, handleClose, handleConfirm, message }) => {
    return (
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Confirmar Acción</DialogTitle>
            <DialogContent dividers>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

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
