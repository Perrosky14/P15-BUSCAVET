import { jwtDecode } from "jwt-decode";
import { useState, Fragment, useEffect } from "react";
import BloqueHoraService from "../../services/BloqueHoraService";
import { Box, ThemeProvider, Typography, Button } from "@mui/material";
import theme from "../styles/themeComponent";
import MiBloqueHoraComponent from "./MiBloqueHoraComponent";

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

const MisBloquesHoraListComponent = ({ onSelectBloqueHora }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [bloquesHora, setBloquesHora] = useState([]);
    const [bloqueHoraSeleccionada, setBloqueHoraSeleccionada] = useState(null);

    useEffect(() => {
        const fetchBloquesHora = async () => {
            try{
                const token = localStorage.getItem('token');
                if (!token){
                    console.error('Token no encontrado en el localStorage');
                    return;
                }

                const decoded = jwtDecode(token);
                const idUsuario = decoded.id;
                const response = await BloqueHoraService.obtenerBloquesHoraDesagendar(idUsuario);
                const bloquesHoraObtenidos = response.data.map((bloqueHora) => ({
                    id: bloqueHora.id,
                    motivo: bloqueHora.motivo,
                    doctor: bloqueHora.doctor,
                    mascota: bloqueHora.mascota,
                    fecha: bloqueHora.fecha,
                    horaInicio: bloqueHora.horaInicio,
                }));
                setBloquesHora(bloquesHoraObtenidos);
            } catch (error) {
                console.log("Error al obtener los bloques de hora", error);
            }
        };

        fetchBloquesHora();
    }, []);

    const totalBloquesHora = bloquesHora.length;
    const bloquesHoraPorPagina = 5;

    const indiceUltimoBloqueHora = paginaActual * bloquesHoraPorPagina;
    const indicePrimerBloqueHora = indiceUltimoBloqueHora - bloquesHoraPorPagina;
    const bloquesHoraActuales = bloquesHora.slice(indicePrimerBloqueHora, indiceUltimoBloqueHora);
    const paginasTotales = Math.ceil(totalBloquesHora / bloquesHoraPorPagina);

    const handleSelectBloqueHora = (bloqueHora) => {
        if (bloqueHoraSeleccionada && bloqueHoraSeleccionada.id === bloqueHora.id) {
            setBloqueHoraSeleccionada(null);
        } else {
            setBloqueHoraSeleccionada(bloqueHora);
        }
        onSelectBloqueHora(bloqueHora);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                {bloquesHoraActuales.length > 0 ? (
                    bloquesHoraActuales.map((bloqueHora) => (
                        <MiBloqueHoraComponent
                            key={bloqueHora.id}
                            {...bloqueHora}
                            onSelect={() => handleSelectBloqueHora(bloqueHora)}
                            isSelected={bloqueHoraSeleccionada && bloqueHoraSeleccionada.id === bloqueHora.id}
                        />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay Bloques de Hora Agendadas
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={paginaActual === 1 || totalBloquesHora === 0}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={paginaActual === paginasTotales || totalBloquesHora === 0}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default MisBloquesHoraListComponent;
