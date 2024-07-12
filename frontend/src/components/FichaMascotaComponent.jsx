import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode'; 
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { Grid, TextField, Typography, Card, Button, ThemeProvider, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UsuarioService from '../services/UsuarioService';
import theme from './styles/themeComponent';
import MascotasListComponent from './MascotasUsuarioView/MascotasListComponent';
import MascotaDetailsComponent from './MascotasUsuarioView/MascotaDetailsComponent';

const styles = {
    container: { display: 'flex', height: '100vh' },
    content: { flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    welcomeMessage: { fontSize: '24px', fontWeight: 'bold', padding: '8px 10px' },
    searchBar: { display: 'flex', alignItems: 'center', border: '2px solid #ff436f', borderRadius: '40px', padding: '8px 16px', maxWidth: '600px', width: '100%' },
    searchInput: { marginLeft: '8px', width: '100%', border: 'none', outline: 'none' },
    mascotaListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
    mascotaCard: { width: '409px', maxWidth: 600, margin: '10px', height: '350px', borderRadius: '15px' },
    doctorListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
    doctorCard: { width: '750px', maxWidth: 750, borderRadius: '15px' },
    consultaCard: { backgroundColor: '#ff436f', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '750px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
    subtitle: { fontSize: '14px' },
    title2: { fontSize: '18px', fontWeight: 'bold', textAlign: 'center' },
    subtitle2: { fontSize: '14px', color: '#C5C5C5', textAlign: 'center' },
    especialidadesContainer: { marginBottom: '20px', textAlign: 'center' },
    telemedicinaCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center' },
    paper: { padding: '15px', textAlign: 'center', color: theme.palette.text.secondary, borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'},
    icon: {fontSize: '30px', color: theme.palette.primary.main},
    buttonCrearMascota: { width: '100%', height: '50px', borderRadius: '30px', backgroundColor: '#ff436f', '&:hover': { backgroundColor: '#FF80AB' }, textTransform: 'none', fontSize: '20px'},
    button2: {marginTop: '20px',textAlign: 'center'},
    header2: {fontWeight: 'bold', marginBottom: '0.5px'},
    headerContainer: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2},
};

const FichaMascotaComponent = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [mascotas, setMascotas] = useState([]);
    const [mascota, setMascota] = useState(null);

    const location = useLocation();
    const { user: locationUser } = location.state || {};
    const [user, setUser] = useState(locationUser || null);

    useEffect(() => {
        if (user) {
            const fetchMascotas = async () => {
                try {
                    const response = await UsuarioService.getMascotas(user.id);
                    setMascotas(response.data);
                } catch (error) {
                    console.error('Error al obtener las mascotas:', error);
                }
            };

            fetchMascotas();
        }
    }, [user]);

    const navigateToRegistrarMascota = () => {
        navigate('/registrar_mascota', { state: { user } });
    };

    const handleSelectMascota = (mascotaSeleccionada) => {
        // Aquí puedes manejar la lógica cuando se selecciona una mascota
        setMascota(mascotaSeleccionada);
        console.log('Mascota seleccionada:', mascotaSeleccionada);
    };

    if (!user) {
        return <div>Error: Usuario no autenticado</div>;
    }

    return (
        <div style={styles.container}>
            <NavbarUsuarioComponent />
            <ThemeProvider theme={theme}>
                <div style={styles.content}>
                    <div style={styles.header}>
                        <div>
                            <Typography style={styles.welcomeMessage}>Buenos días</Typography>
                            <Typography style={styles.subtitle2}>Hay 3 nuevas citas programadas para hoy</Typography>
                        </div>
                        <div style={styles.searchBar}>
                            <SearchIcon color="action" />
                            <TextField
                                placeholder="Buscar hora veterinaria"
                                variant="outlined"
                                size="small"
                                InputProps={{ disableUnderline: true }}
                                style={styles.searchInput}
                            />
                        </div>
                    </div>
                    <Grid container spacing={2} mt={3} style={{ flexGrow: 1 }}>
                        <Grid item xs={8} tyle={{ height: '100%' }}>
                            <Box style={{ height: '100%', padding: '0 40px' }}>
                                {mascota  ? (
                                    <MascotaDetailsComponent mascota={mascota}/>
                                ) : (
                                    <Typography variant='h6' style={{ textAlign: 'center', marginTop: '20px' }}>
                                        Selecciona una mascota para ver sus detalles
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={4} container direction="column" alignItems="flex-start">
                            <Button variant="contained" style={styles.buttonCrearMascota} onClick={() => navigateToRegistrarMascota()}>Crear ficha de mascota</Button>
                            <Typography style={styles.title2} mt={3}>Tus mascotas</Typography>
                            <Typography style={styles.subtitle2} sx={{ mb: 2 }}>Elige una categoria según tus necesidades</Typography>
                            <MascotasListComponent onSelectMascota={handleSelectMascota}/>
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default FichaMascotaComponent;