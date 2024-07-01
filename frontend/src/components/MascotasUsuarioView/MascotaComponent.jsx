import { Box, Button, CardMedia, Grid, IconButton, Menu, MenuItem, Paper, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import { ColorLens, FitnessCenter, StarBorder as StarBorderIcon } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import theme from "../styles/themeComponent";
import DeleteConfirmationMascotaComponent from "./DeleteConfirmationMascotaComponent";

const styles = {
    paper: {
        borderRadius: '2rem', // 32px / 16 = 2rem
        padding: '1rem', // 16px / 16 = 1rem
        marginBottom: '1rem', // 16px / 16 = 1rem
        border: '0.125rem solid #FFFFFF', // 2px / 16 = 0.125rem
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        width: '100%',
    },
    nombre: {
        fontWeight: 'bold',
        color: '#313131',
        textAlign: 'left',
    },
    detalleTipoAnimal: {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem', // 8px / 16 = 0.5rem
        fontSize: '0.8125rem', // 13px / 16 = 0.8125rem
        color: '#B9B9B9',
    },
    avatarContainer: {
        borderRadius: '1rem',
        overflow: 'hidden',
        width: '100%', // Ajusta según tus necesidades
        height: '100%', // Ajusta según tus necesidades
        backgroundColor: '#D9D9D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '1rem',
    },
    moreIcon: {
        color: '#ff436f',
        width: '1.875rem', // 30px / 16 = 1.875rem
        height: '1.875rem', // 30px / 16 = 1.875rem
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
    selectedButton: {
        borderColor: '#ff436f', // Color de borde cuando está seleccionado
    },
};

export default function MascotaComponent({id, nombre, especie, sexo, raza, color, estatura, peso, avatar, onDelete, onSelect, isSelected }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        onDelete(id);
        setDeleteModalOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Button 
                sx={{ ...styles.paper, ...(isSelected && styles.selectedButton) }} 
                variant="outlined" 
                fullWidth 
                onClick={() =>onSelect()}
                >
                <Grid container spacing={2}>
                    <Grid item xs={2.5} container alignItems="center" justifyContent="center">
                        <Box sx={{ ...styles.avatarContainer, backgroundColor: avatar ? 'transparent' : '#D9D9D9' }}>
                            {avatar ? (
                                <CardMedia
                                    component="img"
                                    alt={nombre}
                                    image={avatar}
                                    sx={styles.avatar}
                                />
                            ): (
                                <Box sx={styles.placeholder}/>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={7.5}>
                        <Typography sx={styles.nombre}>{nombre}</Typography>
                        <Typography sx={styles.detalleTipoAnimal} mt={0.5}>{especie}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <StarBorderIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                            <Typography variant="body2" sx={{ color: '#313131', fontWeight: 'bold' }}>{estatura} cm</Typography>
                            <ColorLens fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                            <Typography variant="body2" sx={{ color: '#313131', fontWeight: 'bold' }}>{color}</Typography>
                            <FitnessCenter fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                            <Typography variant="body2" sx={{ color: '#313131', fontWeight: 'bold' }}>{peso} kg</Typography>
                        </Box>
                    </Grid>
                    <Grid xs={2} container justifyContent="flex-end">
                        <IconButton onClick={handleClick}>
                            <MoreVertIcon style={styles.moreIcon}/>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                            <MenuItem sx={styles.menuItem} onClick={handleCloseMenu}>
                                <EditIcon sx={styles.menuIcon}/>
                                Editar
                            </MenuItem>
                            <MenuItem sx={styles.menuItem} onClick={handleOpenDeleteModal}>
                                <DeleteIcon sx={styles.menuIcon}/>
                                Eliminar
                            </MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Button>
            <DeleteConfirmationMascotaComponent
                open={deleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleConfirm={handleConfirmDelete}
            />
        </ThemeProvider>
    );
};