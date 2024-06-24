import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const styles = {
    button: {
        borderRadius: '25px',
        padding: '13px 20px',
        fontSize: '20px', // Aumenta el tamaño de la letra en píxeles
        lineHeight: '1',  // Asegura que el tamaño del botón no cambie con el tamaño de la letra
        marginTop: '8px', // Reducir el espacio entre el botón y el texto de arriba
        marginBottom: '-8px'
    },
    subtitle: {
        color: '#B9B9B9',
        marginTop: '-4px', // Reducir el espacio entre "Horas disponibles" y la siguiente frase
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: '12px', // Reducir tamaño de letra
        color: '#B9B9B9',
    },
    tutorialLink: {
        color: '#ff436f',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
};

const VeterinariaAvailableHours = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    border: '1px solid #FBFBFB',
                    borderRadius: '16px',
                    padding: '16px',
                    backgroundColor: '#FBFBFB',
                    marginBottom: '16px'
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom sx={{ marginBottom: '-1px', fontWeight: 'bold' }}>
                    Horas disponibles
                </Typography>
                <Typography variant="body2" gutterBottom sx={styles.subtitle}>
                    Crea tu agenda de atención a tu medida
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ ...styles.button, width: '100%' }}
                >
                    Crear horas de atención
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px', ...styles.boldText }}>
                    Para más información revisa nuestro <Link href="#" sx={styles.tutorialLink}>tutorial</Link> de agendamiento
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default VeterinariaAvailableHours;