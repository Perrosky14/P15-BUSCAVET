import React from 'react';
import { Box, Typography } from '@mui/material';

const styles = {
    mainSection: {
        textAlign: 'center',
        backgroundColor: '#ff436f',
        padding: '50px 20px',
    },
    highlight: {
        color: '#ffe600',
    },
    mainImage: {
        marginTop: '20px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
};

const HeroSection = () => {
    return (
        <Box sx={styles.mainSection}>
            <Typography variant="h3" component="h1">
                Encuentra una hora con un <span style={styles.highlight}>Veterinario</span>
            </Typography>
            <Box sx={styles.mainImage}>
                <img src="/images_app/online_veterinarian.png" alt="Veterinario" style={styles.image} />
            </Box>
        </Box>
    );
};

export default HeroSection;