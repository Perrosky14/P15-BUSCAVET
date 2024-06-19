import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import theme from '../styles/themeComponent';

const VeterinariaStats = () => {
    const stats = [
        { label: 'Pacientes', value: 300 },
        { label: 'Puntuación', value: '10/10' },
        { label: 'Horas trabajadas', value: 250 }
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: '#FBFBFB', padding: 1, borderRadius: 1, paddingTop: '0px', marginTop: -4}}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                    Estadísticas
                </Typography>
                <Typography variant="body2" sx={{ color: '#B9B9B9', marginTop: -1 }}>
                    Hay 11 nuevas solicitudes veterinarias
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 1,
                        overflowX: 'visible',
                    }}
                >
                    {stats.map((stat, index) => (
                        <Box
                            key={stat.label}
                            sx={{
                                backgroundColor: '#FFFFFF',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                minWidth: 80,
                                mx: 2.5, // Margin left and right
                                boxShadow: '0px 4px 8px rgba(255, 255, 255, 1)', // White box shadow
                                flex: '0 0 auto',
                                border: '1px solid #FFFFFF', // Absolute white border color
                                boxSizing: 'border-box',

                            }}
                        >
                            <Typography variant="body2" sx={{ color: '#B9B9B9' }}>
                                {stat.label}
                            </Typography>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: 'bold', fontSize: '26px' }} // Font size in pixels
                            >
                                {stat.value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default VeterinariaStats;
