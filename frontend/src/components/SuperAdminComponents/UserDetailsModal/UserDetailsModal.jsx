import React, { useState, useEffect } from 'react';
import { Box, Typography, Modal, IconButton, Grid, Avatar, Button, Divider, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/themeComponent';
import DoctorDetails from './DoctorDetails';
import UsuarioDetails from './UsuarioDetails';
import VeterinariaDetails from './VeterinariaDetails';
import MascotaDetails from './MascotaDetails';
import DoctorService from '../../../services/DoctorService.jsx';
import UsuarioService from '../../../services/UsuarioService.jsx';
import VeterinariaService from '../../../services/VeterinariaService.jsx';
import MascotaService from '../../../services/MascotaService.jsx';

const styles = {
    modalBox: {
        position: 'absolute',
        top: '48%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        maxHeight: '100vh',
        overflow: 'hidden',
        bgcolor: '#FBFBFB',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    avatar: {
        width: 80,
        height: 80,
    },
    detailContainer: {
        maxHeight: '60vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#FF4081',
            borderRadius: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#FBFBFB',
        },
    },
    sectionTitle: {
        marginTop: '16px',
        marginBottom: '8px',
        color: '#666',
    },
    closeModalButton: {
        backgroundColor: '#B9B9B9',
        color: '#FFFFFF',
        position: 'relative',
        padding: '4px 16px',
        minWidth: '64px',
        '&:hover': {
            backgroundColor: '#A0A0A0',
        },
    },
    saveButton: {
        backgroundColor: '#FF4081',
        color: '#FFFFFF',
        marginRight: '8px',
        '&:hover': {
            backgroundColor: '#E04072',
        },
    },
    divider: {
        backgroundColor: '#B9B9B9',
        height: '2px',
        margin: '16px 0',
    },
    editButton: {
        color: '#FF4081',
        position: 'absolute',
        right: 8,
        top: 80, // Ajuste para bajar el icono
        margin: '16px',
    },
};

const UserDetailsModal = ({ open, handleClose, user, reloadCurrentPage }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [details, setDetails] = useState(user);

    useEffect(() => {
        setDetails(user);
    }, [user]);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setSnackbarMessage('Copiado al portapapeles');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    const handleSave = () => {
        const idNumber = parseInt(details.id.match(/\d+/)[0], 10);
        switch (details.tipo) {
            case 'Doctor':
                DoctorService.updateDoctor(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        handleClose();
                        reloadCurrentPage(); // Refresca los datos sin cambiar la página actual
                    })
                    .catch(error => {
                        console.error("There was an error updating the doctor!", error);
                    });
                break;
            case 'Usuario':
                UsuarioService.updateUsuario(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        handleClose();
                        reloadCurrentPage(); // Refresca los datos sin cambiar la página actual
                    })
                    .catch(error => {
                        console.error("There was an error updating the usuario!", error);
                    });
                break;
            case 'Veterinaria':
                VeterinariaService.updateVeterinaria(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        handleClose();
                        reloadCurrentPage(); // Refresca los datos sin cambiar la página actual
                    })
                    .catch(error => {
                        console.error("There was an error updating the veterinaria!", error);
                    });
                break;
            case 'Mascota':
                MascotaService.updateMascota(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        handleClose();
                        reloadCurrentPage(); // Refresca los datos sin cambiar la página actual
                    })
                    .catch(error => {
                        console.error("There was an error updating the mascota!", error);
                    });
                break;
            default:
                console.error("Unknown user type:", details.tipo);
        }
        setIsEditMode(false);
    };

    const renderDetails = (user) => {
        if (!user) return null;
        switch (user.tipo) {
            case 'Doctor':
                return <DoctorDetails doctor={details} handleCopy={handleCopy} isEditMode={isEditMode} handleChange={handleChange} />;
            case 'Usuario':
                return <UsuarioDetails usuario={details} handleCopy={handleCopy} isEditMode={isEditMode} handleChange={handleChange} />;
            case 'Veterinaria':
                return <VeterinariaDetails veterinaria={details} handleCopy={handleCopy} isEditMode={isEditMode} handleChange={handleChange} />;
            case 'Mascota':
                return <MascotaDetails mascota={details} handleCopy={handleCopy} isEditMode={isEditMode} handleChange={handleChange} />;
            default:
                return <Typography>No details available</Typography>;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={styles.modalBox}>
                    <IconButton sx={styles.closeButton} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    {user && (
                        <Box mb={4}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={3}>
                                    <Avatar sx={styles.avatar} />
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="h5">{user.nombre}</Typography>
                                    <Typography variant="body1">Tipo: {user.tipo}</Typography>
                                    <Typography variant="body2">ID: {user.id}</Typography>
                                    <IconButton sx={styles.editButton} onClick={handleEditToggle}>
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Divider sx={styles.divider} />
                            <Typography variant="h6" sx={styles.sectionTitle}>Información de Contacto</Typography>
                            <Box sx={styles.detailContainer}>
                                {renderDetails(user)}
                            </Box>
                        </Box>
                    )}
                    <Box display="flex" justifyContent="flex-end">
                        {isEditMode && (
                            <Button sx={styles.saveButton} onClick={handleSave}>
                                Guardar
                            </Button>
                        )}
                        <Button onClick={handleClose} sx={styles.closeModalButton}>
                            Cerrar
                        </Button>
                    </Box>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default UserDetailsModal;
