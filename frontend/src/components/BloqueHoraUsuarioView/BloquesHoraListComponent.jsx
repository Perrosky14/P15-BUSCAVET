import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import BloqueHoraService from "../../services/BloqueHoraService";
import { ThemeProvider } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import BloqueHoraComponent from "./BloqueHoraComponent";
import theme from "../styles/themeComponent";

const styles = {
    container: {
        mb: 1,
        backgroundColor: '#0000',
        borderRadius: '16px',
        p: 0,
        width: '100%',
        maxWidth: '1200px',
    },
    paginationButton: {
        mt: 0,
        mx: 1,
    },
};

const BloquesHoraListComponent = ({ onSelectBloqueHora }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [bloquesHora, setBloquesHora] = useState([]);
    const [bloqueHoraSeleccionada, setBloqueHoraSeleccionada] = useState(null);

    useEffect(() => {
        const fetchBloquesHora = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
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
                        <BloqueHoraComponent
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

export default BloquesHoraListComponent;
