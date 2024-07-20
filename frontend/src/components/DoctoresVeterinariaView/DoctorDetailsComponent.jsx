import React, { useState } from 'react';
import { Box, Typography, Modal, IconButton, Grid, Avatar, Button, Paper, Divider, Snackbar, Alert } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AssistantIcon from '@mui/icons-material/Assistant';
import PersonIcon from '@mui/icons-material/Person';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import theme from '../styles/themeComponent';

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
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        border: '1px solid #f7f7f7',
        borderRadius: '4px',
        marginBottom: '8px',
        minHeight: '72px',
        boxShadow: '0 1px 3px rgba(255, 255, 255, 0.12)',
    },
    detailIcon: {
        color: '#FF4081',
        marginRight: '8px',
    },
    detailTextContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginRight: '8px',
    },
    attributeTitle: {
        color: '#B9B9B9',
        fontSize: '14px',
    },
    attributeValue: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    copyButton: {
        color: '#FF4081',
    },
    sectionTitle: {
        marginTop: '16px',
        marginBottom: '8px',
        color: '#666',
    },
    button: {
        marginTop: '16px',
    },
    closeModalButton: {
        backgroundColor: '#FF4081',
        color: '#FFFFFF',
        position: 'relative',
        padding: '4px 16px',
        minWidth: '64px',
        '&:hover': {
            backgroundColor: '#E04072',
        },
    },
    divider: {
        backgroundColor: '#B9B9B9',
        height: '2px',
        margin: '16px 0',
    },
};

const DoctorDetailsComponent = ({ open, handleClose, doctor }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setSnackbarMessage('Copiado al portapapeles');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                    <Box mb={4}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                <Avatar sx={styles.avatar} />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h5">{doctor.nombre}</Typography>
                                <Typography variant="body1">Especialidad: {doctor.especialidad}</Typography>
                                <Typography variant="body2">ID Doctor: {doctor.id}</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={styles.divider} />
                        <Typography variant="h6" sx={styles.sectionTitle}>Información de Contacto</Typography>
                        <Box sx={styles.detailContainer}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <PersonIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Nombres:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.nombres}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.nombres)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <PersonIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Apellidos:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.apellidos}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.apellidos)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <PhoneIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Teléfono:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.celular}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.celular)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <EmailIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Email:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.email}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.email)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <PublicIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>ID País:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.idPais}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        {doctor.validado ? (
                                            <CheckCircleIcon sx={styles.detailIcon} />
                                        ) : (
                                            <CancelIcon sx={styles.detailIcon} />
                                        )}
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Validado:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.validado ? 'Sí' : 'No'}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <AssistantIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Nombre Asistente:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.nombreAsistente}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.nombreAsistente)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <AssistantIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Número Asistente:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.numeroAsistente}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.numeroAsistente)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <CalendarTodayIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Fecha de Nacimiento:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.fechaNacimiento}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <PersonIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>RUT:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.rut}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.rut)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <BadgeIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Matrícula:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.matricula}</Typography>
                                        </Box>
                                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.matricula)}>
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <BadgeIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Red Social 1:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.rrss1}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper sx={styles.detailItem}>
                                        <BadgeIcon sx={styles.detailIcon} />
                                        <Box sx={styles.detailTextContainer}>
                                            <Typography sx={styles.attributeTitle}>Red Social 2:</Typography>
                                            <Typography sx={styles.attributeValue}>{doctor.rrss2}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
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

export default DoctorDetailsComponent;