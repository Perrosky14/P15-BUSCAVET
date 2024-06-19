// MainViewDoctoresVeterinaria.jsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import VerticalNavbarComponent from '../HomeVeterinariaView/NavBarVeterinariaComponent';
import DoctoresListVeterinaria from './DoctoresListVeterinaria'; // Importa el componente de la lista de doctores
import AddDoctor from './AddDoctor'; // Importa el componente de agregar doctor
import DoctorStats from './DoctorStats'; // Importa el componente de estadísticas de doctores

const styles = {
    body: {
        backgroundColor: '#FBFBFB',
    },
};

const MainViewDoctoresVeterinaria = () => {
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
                <Grid container spacing={1}>
                    {/* Columna izquierda: Lista de Doctores */}
                    <Grid item xs={12} md={11.8} sx={{ position: 'relative', zIndex: 1, mt: 7 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ mb: -3, ml: '15px' }}>
                                <DoctoresListVeterinaria />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ position: 'absolute', top: '70px', right: '4%', width: '36%', zIndex: 2 }}>
                    {/* Columna derecha: Agregar Doctor y Estadísticas */}
                    <Grid item xs={12} sx={{ mb: -1.5 }}>
                        <AddDoctor />
                    </Grid>
                    <Grid item xs={12}>
                        <DoctorStats />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MainViewDoctoresVeterinaria;
