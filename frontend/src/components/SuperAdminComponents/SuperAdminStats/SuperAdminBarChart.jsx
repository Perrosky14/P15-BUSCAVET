import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import theme from '../../styles/themeComponent';

const mockData = [
    { month: 'Marzo', users: 80 },
    { month: 'Abril', users: 120 },
    { month: 'Mayo', users: 160 },
    { month: 'Junio', users: 200 },
];

const SuperAdminBarChart = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: 300, bgcolor: '#FBFBFB', p: 2, borderRadius: '8px', boxShadow: '0px 4px 6px rgba(255, 255, 255, 1)' }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                    Cantidad de Usuarios nuevos en los últimos 4 meses
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill={theme.palette.primary.main} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </ThemeProvider>
    );
};

export default SuperAdminBarChart;
