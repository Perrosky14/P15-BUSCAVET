import React from 'react';
import { Box, Grid } from '@mui/material';
import VerticalNavbarComponent from './NavBarVeterinariaComponent';
import VeterinariaRequestsComponent from './VeterinariaRequestsComponent';
import VeterinariaScheduleHours from './VeterinariaScheduleHours';
import VeterinariaAvailableHours from './VeterinariaAvailableHours';
import VeterinariaStats from './VeterinariaStats';
import VeterinariaChats from './VeterinariaChats';
import VeterinariaWelcome from './VeterinariaWelcome';

const styles = {
    body: {
        backgroundColor: '#FBFBFB',
    },
};

const MainViewHomeVeterinariaComponent = () => {
    // Aplicar el estilo al body
    document.body.style.backgroundColor = styles.body.backgroundColor;

    return (
        <Box sx={{ display: 'flex' }}>
            <VerticalNavbarComponent />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: '#FBFBFB',
                    position: 'relative',
                }}
            >
                <Grid container spacing={1}> {/* Ajuste del espaciado entre los componentes */}
                    {/* Columna izquierda: Bienvenida, Solicitudes, Agenda */}
                    <Grid item xs={12} md={11.8} sx={{ position: 'relative', zIndex: 1, mt: 3.5 }}> {/* Ajuste del margen superior para mover la columna hacia abajo */}
                        <Grid container spacing={1}> {/* Ajuste del espaciado dentro de la columna */}
                            <Grid item xs={12} sx={{ mb: -3, ml: '15px' }}> {/* Ajuste del margen izquierdo */}
                                <VeterinariaWelcome numSolicitudes={3} />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 3}}>
                                <VeterinariaScheduleHours />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ position: 'absolute', top: '107px', right: '5.5%', width: '32%', zIndex: 2 }}>
                    {/* Columna derecha: Horas disponibles, Estadísticas, Chats */}
                    <Grid item xs={12} sx={{ height: '200px' }}>
                        <VeterinariaAvailableHours />
                    </Grid>
                    <Grid item xs={12} sx={{ height: '160px', marginTop: -0.5, marginBottom: 2}}>
                        <VeterinariaStats />
                    </Grid>
                    <Grid item xs={12} sx={{ height: '10px'}}>
                        <VeterinariaChats />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MainViewHomeVeterinariaComponent;
