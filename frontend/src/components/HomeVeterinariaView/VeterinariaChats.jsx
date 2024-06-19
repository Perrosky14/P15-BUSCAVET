import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';
import VeterinariaChat from './VeterinariaChat';

// Mockup data para simular datos provenientes del backend
const mockChats = [
    { nombre: 'Gaucho', tutor: 'Cristian Lizama', tiempo: '20 min' },
    { nombre: 'Gaucho', tutor: 'Cristian Lizama', tiempo: '20 min' },
    { nombre: 'Gaucho', tutor: 'Cristian Lizama', tiempo: '20 min' },
    { nombre: 'Gaucho', tutor: 'Cristian Lizama', tiempo: '20 min' },
    { nombre: 'Gaucho', tutor: 'Cristian Lizama', tiempo: '20 min' },
];

const styles = {
    container: {
        padding: '16px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        border: '1px solid #FBFBFB',
        marginBottom: '16px',
        marginTop: '-40px'
    },
    header: {
        marginBottom: '16px',
    },
    numeroChats: {
        color: '#B9B9B9', // Color #B9B9B9 para el número de chats entre paréntesis
    },
    boldText: {
        fontWeight: 'bold',
    }
};

const VeterinariaChats = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        // Simulando la llamada al backend para obtener los chats
        setTimeout(() => {
            setChats(mockChats);
        }, 1000);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={styles.container}>
                <Typography variant="h6" sx={styles.header}>
                    <span style={styles.boldText}>Staff Veterinario</span>&nbsp;&nbsp;<span style={styles.numeroChats}>({chats.length})</span>
                </Typography>
                {chats.slice(0, 4).map((chat, index) => (
                    <VeterinariaChat key={index} {...chat} />
                ))}
            </Box>
        </ThemeProvider>
    );
}

export default VeterinariaChats;
