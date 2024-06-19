import React, { useState } from 'react';
import { Grid, Paper, Typography, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WcIcon from '@mui/icons-material/Wc';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from '../styles/themeComponent';
import DeleteConfirmationComponent from './DeleteConfirmationComponent';
import DoctorDetailsComponent from './DoctorDetailsComponent'; // Asegúrate de ajustar la ruta según sea necesario

const styles = {
    button: {
        borderRadius: '1.5625rem', // 25px / 16 = 1.5625rem
        padding: '0.625rem 1.25rem', // 10px / 16 = 0.625rem, 20px / 16 = 1.25rem
    },
    emailLabel: {
        display: 'flex',
        alignItems: 'center',
    },
    tipo: {
        color: '#B9B9B9',
    },
    emailTexto: {
        color: '#ff436f',
        fontWeight: 'bold',
    },
    nombre: {
        fontWeight: 'bold',
    },
    detalles: {
        color: '#313131',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem', // 8px / 16 = 0.5rem
    },
    detalleItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem', // 8px / 16 = 0.5rem
        fontSize: '0.8125rem', // 13px / 16 = 0.8125rem
        color: '#B9B9B9',
    },
    paper: {
        borderRadius: '2rem', // 32px / 16 = 2rem
        padding: '1rem', // 16px / 16 = 1rem
        marginBottom: '1rem', // 16px / 16 = 1rem
        border: '0.125rem solid #FFFFFF', // 2px / 16 = 0.125rem
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        width: 'auto',
    },
    icon: {
        width: '1.25rem', // 20px / 16 = 1.25rem
        height: '1.25rem', // 20px / 16 = 1.25rem
    },
    moreIcon: {
        color: '#ff436f',
        width: '1.875rem', // 30px / 16 = 1.875rem
        height: '1.875rem', // 30px / 16 = 1.875rem
    },
    boxContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginLeft: '1rem', // 16px / 16 = 1rem
    },
    menuIcon: {
        marginRight: '0.5rem', // 8px / 16 = 0.5rem
    },
    menuItem: {
        '&:hover': {
            backgroundColor: '#ff436f',
            color: '#FFFFFF',
        },
    },
};

const DoctorComponent = ({ id, nombre, nombres, apellidos, rut, celular, email, nombreAsistente, numeroAsistente, fechaNacimiento, idPais, validado, especialidad, sexo, avatarSrc, matricula, rrss1, rrss2, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
        handleCloseMenu();
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        onDelete(id); // Llama a la función onDelete pasando el id del doctor
        setDeleteModalOpen(false);
    };

    const handleOpenDetailsModal = () => {
        setDetailsModalOpen(true);
        handleCloseMenu();
    };

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
    };

    const doctorDetails = { id, nombre, nombres, apellidos, rut, celular, email, nombreAsistente, numeroAsistente, fechaNacimiento, idPais, validado, especialidad, sexo, matricula, rrss1, rrss2 };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={styles.paper}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={5} container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar src={avatarSrc} />
                        </Grid>
                        <Grid item>
                            <Typography style={styles.nombre}>
                                {nombre}
                            </Typography>
                            <Typography variant="body2" style={styles.detalles}>
                                <span style={styles.emailTexto}>Email:</span> {email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} style={styles.emailLabel}>
                        <Box style={styles.boxContainer}>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <PhoneIcon style={styles.icon} /> {celular}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <MedicalServicesIcon style={styles.icon} /> {especialidad}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <WcIcon style={styles.icon} /> {sexo}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-end">
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon style={styles.moreIcon} />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem sx={styles.menuItem} onClick={handleCloseMenu}>
                                <SendIcon sx={styles.menuIcon} />
                                Enviar mensaje
                            </MenuItem>
                            <MenuItem sx={styles.menuItem} onClick={handleOpenDetailsModal}>
                                <InfoIcon sx={styles.menuIcon} />
                                Ver Detalles
                            </MenuItem>
                            <MenuItem sx={styles.menuItem} onClick={handleCloseMenu}>
                                <BarChartIcon sx={styles.menuIcon} />
                                Ver Estadísticas
                            </MenuItem>
                            <MenuItem sx={styles.menuItem} onClick={handleOpenDeleteModal}>
                                <DeleteIcon sx={styles.menuIcon} />
                                Eliminar
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Paper>
            <DeleteConfirmationComponent
                open={deleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDelete}
            />
            <DoctorDetailsComponent
                open={detailsModalOpen}
                handleClose={handleCloseDetailsModal}
                doctor={doctorDetails}
            />
        </ThemeProvider>
    );
};

export default DoctorComponent;
