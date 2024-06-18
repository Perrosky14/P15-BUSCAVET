import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode'; 
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UsuarioService from '../services/UsuarioService';
import theme from './styles/themeComponent';

const styles = {
    container: { display: 'flex', height: '100vh' },
    content: { flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    welcomeMessage: { fontSize: '24px', fontWeight: 'bold', padding: '8px 10px' },
    searchBar: { display: 'flex', alignItems: 'center', border: '2px solid #FF4081', borderRadius: '40px', padding: '8px 16px', maxWidth: '600px', width: '100%' },
    searchInput: { marginLeft: '8px', width: '100%', border: 'none', outline: 'none' },
    mascotaListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
    mascotaCard: { width: '409px', maxWidth: 600, margin: '10px', height: '350px', borderRadius: '15px' },
    doctorListContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
    doctorCard: { width: '750px', maxWidth: 750, borderRadius: '15px' },
    consultaCard: { backgroundColor: '#FF4081', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '750px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
    subtitle: { fontSize: '14px' },
    title2: { fontSize: '18px', fontWeight: 'bold', padding: '4px 16px', textAlign: 'center' },
    subtitle2: { fontSize: '14px', color: '#C5C5C5', textAlign: 'center' },
    especialidadesContainer: { marginBottom: '20px', textAlign: 'center' },
    telemedicinaCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center' },
    paper: { padding: '15px', textAlign: 'center', color: theme.palette.text.secondary, borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'},
    icon: {fontSize: '30px', color: theme.palette.primary.main},
    button2: {marginTop: '20px',textAlign: 'center'},
    header2: {fontWeight: 'bold', marginBottom: '0.5px'},
    headerContainer: {display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2},
};

const FichaMascotaComponent = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(null);
    const [mascotas, setMascotas] = useState([]);

    const location = useLocation();
    const { user: locationUser } = location.state || {};

    useEffect(() => {
        if (locationUser) {
            const fetchMascotas = async () => {
                try {
                    const response = await UsuarioService.getMascotas(locationUser.id);
                    setMascotas(response.data);
                } catch (error) {
                    console.error('Error al obtener las mascotas:', error);
                }
            };

            fetchMascotas();
        }
    }, [locationUser]);

    if (!locationUser) {
        return <div>Error: Usuario no autenticado</div>;
    }

    return (
        <div style={styles.container}>
            <NavbarUsuarioComponent />
            <div style={styles.content}>
                <div style={styles.header}>
                    <div>
                        <Typography style={styles.welcomeMessage}>Bienvenido, {locationUser.nombre}</Typography>
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
                {/* Aquí podrías agregar más contenido del componente */}
            </div>
        </div>
    );
};

export default FichaMascotaComponent;
