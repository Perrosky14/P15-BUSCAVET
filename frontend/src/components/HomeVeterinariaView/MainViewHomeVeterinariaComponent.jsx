import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import VerticalNavbarComponent from './NavBarVeterinariaComponent';
import VeterinariaRequestsComponent from './VeterinariaRequestsComponent';
import VeterinariaScheduleHours from './VeterinariaScheduleHours';
import VeterinariaAvailableHours from './VeterinariaAvailableHours';
import VeterinariaStats from './VeterinariaStats';
import VeterinariaChats from './VeterinariaChats';
import VeterinariaWelcome from './VeterinariaWelcome';

const styles = {
    body: {
        backgroundColor: '#FBFBFB',
    },
};

const MainViewHomeVeterinariaComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (e) {
                console.error('Token inválido', e);
                localStorage.removeItem('token');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // Aplicar el estilo al body
    document.body.style.backgroundColor = styles.body.backgroundColor;

    return (
        user && (
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
                        <Grid item xs={12} md={11.8} sx={{ position: 'relative', zIndex: 1, mt: 3.5 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sx={{ mb: -3, ml: '15px' }}>
                                    <VeterinariaWelcome numSolicitudes={3} />
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 3 }}>
                                    <VeterinariaScheduleHours />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ position: 'absolute', top: '107px', right: '5.5%', width: '32%', zIndex: 2 }}>
                        <Grid item xs={12} sx={{ height: '200px' }}>
                            <VeterinariaAvailableHours />
                        </Grid>
                        <Grid item xs={12} sx={{ height: '160px', marginTop: -0.5, marginBottom: 2 }}>
                            <VeterinariaStats />
                        </Grid>
                        <Grid item xs={12} sx={{ height: '10px' }}>
                            <VeterinariaChats />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    );
};

export default MainViewHomeVeterinariaComponent;
