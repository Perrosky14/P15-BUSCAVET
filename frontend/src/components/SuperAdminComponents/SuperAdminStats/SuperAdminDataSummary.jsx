import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import theme from '../../styles/themeComponent';

const mockData = [
    { name: 'Usuarios', value: 10350 },
    { name: 'Doctores', value: 10250 },
    { name: 'Veterinarias', value: 100 },
    { name: 'Mascotas', value: 10300 },
];

const COLORS = ['#FF4D61', '#FF6384', '#FFC0CB', '#FFB74D'];

const MIN_PERCENTAGE = 5;

const totalValue = mockData.reduce((acc, curr) => acc + curr.value, 0);
const minValue = (MIN_PERCENTAGE / 100) * totalValue;

const adjustedData = mockData.map(entry => ({
    ...entry,
    adjustedValue: entry.value < minValue ? minValue : entry.value,
    originalValue: entry.value,
}));

const PieChartComponent = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', height: 300, bgcolor: '#FBFBFB', p: 2, borderRadius: '8px', boxShadow: '0px 4px 6px rgba(255, 255, 255, 1)', mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>
                    Distribución de la Base de Datos
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={adjustedData}
                            dataKey="adjustedValue"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill={theme.palette.primary.main}
                            label={({ name, value }) => `${name}: ${mockData.find(entry => entry.name === name).value}`}
                        >
                            {adjustedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => {
                            const originalEntry = adjustedData.find(entry => entry.name === name);
                            return `${originalEntry.originalValue}`;
                        }} />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </ThemeProvider>
    );
};

export default PieChartComponent;
