import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import VerticalNavbarComponent from './SuperAdminNavBarComponent';
import UserList from './UserList';
import SuperAdminBarChart from './SuperAdminStats/SuperAdminBarChart';
import DataSummary from './SuperAdminStats/SuperAdminDataSummary';

const styles = {
    body: {
        backgroundColor: '#FBFBFB',
    },
};

const MainViewSuperAdmin = () => {
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
                        {/* Columna izquierda: Lista de Usuarios */}
                        <Grid item xs={12} md={11.8} sx={{ position: 'relative', zIndex: 1, mt: 7 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sx={{ mb: -3, ml: '15px' }}>
                                    <UserList />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{ position: 'absolute', top: '70px', right: '4%', width: '36%', zIndex: 2 }}>
                        {/* Columna derecha: Gráfico de barras y Resumen de datos */}
                        <Grid item xs={12} sx={{ mb: -1.5 }}>
                            <SuperAdminBarChart />
                        </Grid>
                        <Grid item xs={12}>
                            <DataSummary />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    );
};

export default MainViewSuperAdmin;
