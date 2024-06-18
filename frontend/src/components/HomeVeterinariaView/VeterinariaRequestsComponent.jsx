import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import VeterinariaRequestComponent from './VeterinariaRequestComponent';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const solicitudes = [
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", edad: "10 años", color: "Negro", peso: "5 kg" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", edad: "10 años", color: "Negro", peso: "5 kg" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", edad: "10 años", color: "Negro", peso: "5 kg" },
];

const totalSolicitudes = solicitudes.length;

const styles = {
    container: {
        mb: 4,
        backgroundColor: '#FBFBFB',
        borderRadius: '16px',
        p: 2,
        width: '60%',
        maxWidth: '1200px',
        marginLeft: 0,
    },
    verSolicitudesButton: {
        borderRadius: '25px',
        border: '1px solid #FF4081',
        color: '#000000',
        padding: '10px 20px',
        textTransform: 'none',
        fontSize: '17px',
        height: '30px',
        mt: 2.5, // Añadir margen superior para bajar el botón
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 1,
    },
    subtitle: {
        color: '#B9B9B9',
    },
    boldText: {
        fontWeight: 'bold',
    },
};

const HeaderWithButton = ({ totalSolicitudes }) => (
    <Box sx={styles.headerContainer}>
        <Box>
            <Typography variant="h6" sx={{ mb: -0.5, fontWeight: 'bold' }}>Solicitudes de atención</Typography>
            <Typography variant="subtitle1" sx={styles.subtitle}>Hay {totalSolicitudes} nuevas solicitudes veterinarias</Typography>
        </Box>
        <Button variant="outlined" sx={styles.verSolicitudesButton}>Ver todas las solicitudes</Button>
    </Box>
);

const VeterinariaRequestsComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                <HeaderWithButton totalSolicitudes={totalSolicitudes} />
                {solicitudes.length > 0 ? (
                    solicitudes.slice(0, 3).map((solicitud, index) => (
                        <VeterinariaRequestComponent key={index} {...solicitud} />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay componentes
                    </Typography>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default VeterinariaRequestsComponent;
