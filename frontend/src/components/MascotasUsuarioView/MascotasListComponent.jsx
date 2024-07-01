import { jwtDecode } from "jwt-decode";
import { useState, Fragment, useEffect } from "react";
import UsuarioService from "../../services/UsuarioService";
import { Box, ThemeProvider, Typography, Button } from "@mui/material";
import theme from "../styles/themeComponent";
import MascotaComponent from "./MascotaComponent";

const styles = {
    container: {
        mb: 1,
        backgroundColor: '#FBFBFB',
        borderRadius: '16px',
        p: 0,
        width: '100%',
        maxWidth: '1200px',
    },
    verDoctoresButton: {
        borderRadius: '25px',
        border: '1px solid #FF4081',
        color: '#000000',
        padding: '10px 25px',
        textTransform: 'none',
        fontSize: '17px',
        height: '30px',
        mt: 2.5,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0.5,
    },
    subtitle: {
        color: '#B9B9B9',
    },
    paginationButton: {
        mt: 0,
        mx: 1,
    },
};

const MascotasListComponent = ({ onSelectMascota }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [mascotas, setMascotas] = useState([]);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token no encontrado en el localStorage');
                    return;
                }
                
                const decoded = jwtDecode(token);
                const idUsuario = decoded.id;

                const response = await UsuarioService.getMascotas(idUsuario);
                const mascotasObtenidas = response.data.map((mascota) => ({
                    id: mascota.id,
                    nombre: mascota.nombre,
                    especie: mascota.id_especie,
                    sexo: mascota.id_sexo,
                    raza: mascota.id_raza,
                    color: mascota.color,
                    estatura: mascota.estatura,
                    peso: mascota.peso,
                }));
                setMascotas(mascotasObtenidas);
            } catch (error) {
                console.error('Error al obtener las mascotas');
            }
        };

        fetchMascotas();
    });

    const eliminarMascota = async (idMascota) => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const idUsuario = decoded.id;

            await UsuarioService.deleteMascota(idUsuario, idMascota);
            const updatedMascotas = mascotas.filter((mascota) => mascota.id !== idMascota);
            setMascotas(updatedMascotas);
            if (updatedMascotas.length % mascotasPorPagina === 0 && paginaActual > 1) {
                setPaginaActual(paginaActual - 1);
            }

            if (mascotaSeleccionada && mascotaSeleccionada.id === idMascota) {
                setMascotaSeleccionada(null);
            }

        } catch (error) {
            console.error('Error al eliminar a la mascota:', error);
        }
    };

    const totalMascotas = mascotas.length;
    const mascotasPorPagina = 3;

    const indiceUltimaMascota = paginaActual * mascotasPorPagina;
    const indicePrimeraMascota = indiceUltimaMascota - mascotasPorPagina;
    const mascotasActuales = mascotas.slice(indicePrimeraMascota, indiceUltimaMascota);

    const paginasTotales = Math.ceil(totalMascotas / mascotasPorPagina);

    const handleSelectMascota = (mascota) => {
        if (mascotaSeleccionada && mascotaSeleccionada.id === mascota.id) {
            setMascotaSeleccionada(null);
        } else {
            setMascotaSeleccionada(mascota);
        }
        onSelectMascota(mascota.id); 
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                {mascotasActuales.length > 0 ? (
                    mascotasActuales.map((mascota, index) => (
                        <MascotaComponent 
                            key={mascota.id} 
                            {...mascota} 
                            onDelete={eliminarMascota} 
                            onSelect={() => handleSelectMascota(mascota)}
                            isSelected={mascotaSeleccionada && mascotaSeleccionada.id === mascota.id}
                        />
                    ))
                ): (
                    <Typography variant="body1" color="textSecondary">
                        No hay mascotas registradas
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                    <Button 
                        variant="outlined" 
                        sx={styles.paginationButton}
                        disabled={paginaActual === 1 || totalMascotas === 0}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={paginaActual === paginasTotales || totalMascotas === 0}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );

};

export default MascotasListComponent;