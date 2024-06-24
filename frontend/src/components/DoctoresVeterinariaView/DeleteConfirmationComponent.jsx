import React from 'react';
import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from '../styles/themeComponent';

const styles = {
    modalBox: {
        position: 'absolute',
        top: '30%',  // Ajustado para que el modal esté un poco más arriba
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
        textAlign: 'center',  // Centrado el texto y el contenido
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
        gap: 2, // Espacio entre los botones
    },
    confirmButton: {
        backgroundColor: '#FF4081',
        color: '#FFFFFF',
        fontSize: '16px',  // Tamaño de la letra
        minWidth: '150px',  // Ancho mínimo del botón
        '&:hover': {
            backgroundColor: '#E04072',
        },
    },
    cancelButton: {
        backgroundColor: '#B0B0B0',
        color: '#FFFFFF',
        fontSize: '16px',  // Tamaño de la letra
        minWidth: '150px',  // Ancho mínimo del botón
        '&:hover': {
            backgroundColor: '#909090',
        },
    },
    typography: {
        fontSize: '20px',  // Aumentado el tamaño de la letra del texto
        marginTop: '16px',  // Espacio entre el icono y el texto
    },
    smallTypography: {
        fontSize: '16px',  // Reducido el tamaño de la letra
        marginTop: '8px',  // Espacio entre el texto principal y el texto reducido
    },
    iconCircle: {
        backgroundColor: '#FF4081',  // Color de fondo rosado
        borderRadius: '50%',
        width: '72px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',  // Centrar el círculo
        marginBottom: '16px',  // Espacio entre el círculo y el texto
    },
    icon: {
        color: '#FFFFFF',  // Color blanco del icono
        fontSize: '36px',  // Tamaño del icono
    },
};

const DeleteConfirmationComponent = ({ open, handleClose, handleConfirm }) => {
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
                    <Box sx={styles.iconCircle}>
                        <DeleteForeverIcon sx={styles.icon} />
                    </Box>
                    <Typography id="modal-title" variant="h6" component="h2" sx={styles.typography}>
                        ¿Está seguro que desea eliminar a este usuario?
                    </Typography>
                    <Typography id="modal-description" sx={styles.smallTypography}>
                        Esta selección no se puede deshacer.
                    </Typography>
                    <Box sx={styles.modalButtons}>
                        <Button onClick={handleClose} sx={styles.cancelButton}>
                            No, cancelar
                        </Button>
                        <Button onClick={handleConfirm} sx={styles.confirmButton}>
                            Sí, eliminar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default DeleteConfirmationComponent;
