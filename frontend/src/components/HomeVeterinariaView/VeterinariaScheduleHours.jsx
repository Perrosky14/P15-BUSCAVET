import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import VeterinariaScheduleHour from './VeterinariaScheduleHour';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const citas = [
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
    { nombre: "Gaucho", tipo: "Gato", motivo: "Pata quebrada", lugar: "Domicilio", fecha: "Hoy", hora: "12:30 PM" },
];

const totalCitas = citas.length;

const styles = {
    container: {
        mb: 1, // Reducción del margen inferior
        backgroundColor: '#FBFBFB',
        borderRadius: '16px',
        p: 0,
        width: '60%',
        maxWidth: '1200px',
        marginLeft: 2,
        //marginTop: -2, // Añadir margen superior
    },
    verCitasButton: {
        borderRadius: '25px',
        border: '1px solid #FF4081',
        color: '#000000',
        padding: '10px 25px',
        textTransform: 'none',
        fontSize: '17px',
        height: '30px',
        mt: 2.5, // Añadir margen superior para bajar el botón
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0.5, // Reducción del margen inferior
    },
    subtitle: {
        color: '#B9B9B9',
    },
};

const HeaderWithButton = ({ totalCitas }) => (
    <Box sx={styles.headerContainer}>
        <Box> {/* Agregar margen izquierdo */}
            <Typography variant="h6" sx={{ mb: -0.5, fontWeight: 'bold' }}>Próximas horas agendadas</Typography>
            <Typography variant="subtitle1" sx={styles.subtitle}>Hay {totalCitas} citas programadas para hoy</Typography>
        </Box>
        <Button variant="outlined" sx={styles.verCitasButton}>Ver agenda completa</Button>
    </Box>
);

const VeterinariaScheduleHours = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                <HeaderWithButton totalCitas={totalCitas} />
                {citas.length > 0 ? (
                    citas.slice(0, 7   ).map((cita, index) => (
                        <VeterinariaScheduleHour key={index} {...cita} />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay citas programadas
                    </Typography>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default VeterinariaScheduleHours;
