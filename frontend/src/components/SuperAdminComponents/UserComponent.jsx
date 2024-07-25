import React, { useState } from 'react';
import { Grid, Paper, Typography, Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import theme from '../styles/themeComponent';
import DeleteUserModal from "./DeleteUserModal";
import UserDetailsModal from './UserDetailsModal/UserDetailsModal';
import SendMessageModal from './SendMessageModal'; // Importa el nuevo modal

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
    nombreTexto: {
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

const UserComponent = ({ user, onDelete, onView }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [sendMessageModalOpen, setSendMessageModalOpen] = useState(false); // Estado para el modal de enviar mensaje

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
        onDelete(user.id); // Llama a la función onDelete pasando el id del usuario
        setDeleteModalOpen(false);
    };

    const handleOpenDetailsModal = () => {
        setDetailsModalOpen(true);
        handleCloseMenu();
    };

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
    };

    const handleOpenSendMessageModal = () => {
        setSendMessageModalOpen(true);
        handleCloseMenu();
    };

    const handleCloseSendMessageModal = () => {
        setSendMessageModalOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Paper sx={styles.paper}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={5} container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar />
                        </Grid>
                        <Grid item>
                            <Typography style={styles.nombre}>
                                {user.name}
                            </Typography>
                            <Typography variant="body2" style={styles.detalles}>
                                {user.tipo === 'Mascota' ? (
                                    <span style={styles.nombreTexto}>Nombre:</span>
                                ) : (
                                    <span style={styles.emailTexto}>Email:</span>
                                )} {user.tipo === 'Mascota' ? user.name : user.email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} style={styles.emailLabel}>
                        <Box style={styles.boxContainer}>
                            <Typography variant="body2" style={styles.detalleItem}>
                                {user.tipo === 'Doctor' && <MedicalServicesIcon style={styles.icon} />}
                                {user.tipo === 'Usuario' && <AccountCircleIcon style={styles.icon} />}
                                {user.tipo === 'Mascota' && <PetsIcon style={styles.icon} />}
                                {user.tipo === 'Veterinaria' && <BusinessIcon style={styles.icon} />}
                                {user.tipo}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                {user.tipo === 'Mascota' ? (
                                    <>
                                        <DriveFileRenameOutlineIcon style={styles.icon} /> {user.id_categoria_animal}
                                    </>
                                ) : (
                                    <>
                                        <BadgeIcon style={styles.icon} /> {user.rut}
                                    </>
                                )}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <FingerprintIcon style={styles.icon} /> {user.id}
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
                            <MenuItem sx={styles.menuItem} onClick={handleOpenSendMessageModal}>
                                <SendIcon sx={styles.menuIcon} />
                                Enviar mensaje
                            </MenuItem>
                            <MenuItem sx={styles.menuItem} onClick={handleOpenDetailsModal}>
                                <InfoIcon sx={styles.menuIcon} />
                                Ver/Editar
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
            <DeleteUserModal
                show={deleteModalOpen}
                handleClose={handleCloseDeleteModal}
                user={user}
                handleDelete={handleConfirmDelete}
                reloadCurrentPage={() => window.location.reload()}
            />
            <UserDetailsModal
                open={detailsModalOpen}
                handleClose={handleCloseDetailsModal}
                user={user}
            />
            <SendMessageModal
                open={sendMessageModalOpen}
                handleClose={handleCloseSendMessageModal}
                user={user}
            />
        </ThemeProvider>
    );
};

export default UserComponent;
