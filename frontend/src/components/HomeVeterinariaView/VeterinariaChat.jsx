import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #FBFBFB',
        marginBottom: '8px', // Añadir un margen inferior para la separación entre los elementos
        cursor: 'pointer', // Añadir cursor de puntero para indicar que es clickeable
        transition: 'background-color 0.3s', // Añadir una transición suave para el cambio de color de fondo
        '&:hover': {
            backgroundColor: '#E0E0E0', // Color gris para el efecto hover
        },
    },
    avatar: {
        marginRight: '16px',
    },
    text: {
        flex: 1,
    },
    dot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#ff436f',
        marginRight: '30px',
    },
    tutorText: {
        color: '#B9B9B9', // Color #B9B9B9 para "Tutor de"
        fontSize: '12px', // Tamaño de fuente para "Tutor de"
    },
    nameText: {
        color: '#313131', // Color #313131 para el tutor
    },
    nombreText: {
        color: '#ff436f', // Color rosado #ff436f para "nombre"
    },
    timeContainer: {
        display: 'flex',
        alignItems: 'center',
    },
};

const VeterinariaChat = ({ nombre, tutor, tiempo, tutorFontSize = '11px', onClick }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container} onClick={onClick}>
                <Avatar sx={styles.avatar} />
                <Box sx={styles.text}>
                    <Typography variant="body1" sx={styles.nameText}>{tutor}</Typography>
                    <Typography variant="body2" sx={{ ...styles.tutorText, fontSize: tutorFontSize }}>
                        Tutor de <span style={styles.nombreText}>{nombre}</span>
                    </Typography>
                </Box>
                <Box sx={styles.timeContainer}>
                    <Box sx={styles.dot}></Box>
                    <Typography variant="body2" color="textSecondary">{tiempo}</Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default VeterinariaChat;
