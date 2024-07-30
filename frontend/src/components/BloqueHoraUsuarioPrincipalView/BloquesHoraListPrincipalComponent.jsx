import {jwtDecode} from "jwt-decode";
import { useEffect, useState } from "react";
import BloqueHoraService from "../../services/BloqueHoraService";
import { ThemeProvider } from "styled-components";
import { Box, Typography } from "@mui/material";
import theme from "../styles/themeComponent";
import BloqueHoraPrincipalComponent from "./BloqueHoraPrincipalComponent";

const styles = {
    container: {
        mb: 1,
        backgroundColor: '#0000',
        borderRadius: '16px',
        p: 0,
        width: '100%',
    },
    paginationButton: {
        mt: 0,
        mx: 1,
    },
};

const BloquesHoraListComponent = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [bloquesHora, setBloquesHora] = useState([]);

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

    const bloquesHoraPorPagina = 3;

    const indiceUltimoBloqueHora = paginaActual * bloquesHoraPorPagina;
    const indicePrimerBloqueHora = indiceUltimoBloqueHora - bloquesHoraPorPagina;
    const bloquesHoraActuales = bloquesHora.slice(indicePrimerBloqueHora, indiceUltimoBloqueHora);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                {bloquesHoraActuales.length > 0 ? (
                    bloquesHoraActuales.map((bloqueHora) => (
                        <BloqueHoraPrincipalComponent
                            key={bloqueHora.id}
                            {...bloqueHora}
                        />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay Bloques de Hora Agendadas
                    </Typography>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default BloquesHoraListComponent;
