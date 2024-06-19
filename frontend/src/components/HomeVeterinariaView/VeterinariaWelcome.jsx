import React from 'react';
import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';

const styles = {
    subtitle: {
        color: '#B9B9B9',
    },
};

const VeterinariaWelcome = ({ numSolicitudes }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ marginBottom: '16px' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}> {/* Ajuste de fontWeight */}
                    Buenos días
                </Typography>
                <Typography variant="body2" sx={styles.subtitle}>
                    Hay {numSolicitudes} nuevas solicitudes de atención
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default VeterinariaWelcome;
