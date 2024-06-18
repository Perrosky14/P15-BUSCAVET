import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const styles = {
    button: {
        borderRadius: '25px',
        padding: '13px 20px',
        fontSize: '20px', // Aumenta el tamaño de la letra en píxeles
        lineHeight: '1',  // Asegura que el tamaño del botón no cambie con el tamaño de la letra
        marginTop: '8px', // Reducir el espacio entre el botón y el texto de arriba
    },
    subtitle: {
        color: '#B9B9B9',
        marginTop: '-4px', // Reducir el espacio entre el subtítulo y la siguiente frase
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: '12px', // Reducir tamaño de letra
    },
};

const AddDoctor = () => {
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
                    ¿Desea registrar un nuevo doctor?
                </Typography>
                <Typography variant="body2" gutterBottom sx={styles.subtitle}>
                    Complete la información requerida
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ ...styles.button, width: '100%' }}
                >
                    Registrar nuevo doctor
                </Button>
                <Typography variant="body2" color="textSecondary" sx={{ marginTop: '16px', ...styles.boldText }}>
                    Recuerda que, si el doctor no está registrado en la plataforma, su licencia deberá ser verificada por nuestro equipo. Este proceso requiere documentación y generalmente tarda alrededor de 5 a 7 dias hábiles.
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default AddDoctor;
