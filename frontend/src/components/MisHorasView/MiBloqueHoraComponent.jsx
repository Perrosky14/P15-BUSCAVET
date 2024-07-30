import { Box, Button, CardMedia, Grid, IconButton, Menu, MenuItem, Paper, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import theme from "../styles/themeComponent";

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

export default function MiBloqueHoraComponent({idBloqueHora, nombre, fecha, horaInicio, doctor, mascota, avatar, onSelect, isSelected}){
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
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
                        <Box xs ={{ ...styles.avatarContainer, backgroundColor: avatar ? 'transparent' : '#D9D9D9' }}>
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
                        <Typography sx={styles.nombre}>Dr {doctor.nombre1} {doctor.apellido1} {doctor.apellido2}</Typography>
                        <Typography sx={styles.detalleTipoAnimal} mt={0.5}>{mascota.nombre}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }}></AccessTimeIcon>
                            <Typography variant="body2" sx={{ color: '#313131', fontWeight: 'bold' }}>{horaInicio}</Typography>
                            <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }}></CalendarMonthIcon>
                            <Typography variant="body2" sx={{ color: '#313131', fontWeight: 'bold' }}>{fecha}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Button>
        </ThemeProvider>
    );
};
