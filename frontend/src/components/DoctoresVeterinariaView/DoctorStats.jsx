import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import PieChartIcon from '@mui/icons-material/PieChart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const styles = {
    paper: {
        padding: '15px', // Disminuir padding
        textAlign: 'center',
        color: theme.palette.text.secondary,
        borderRadius: '16px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    icon: {
        fontSize: '30px', // Disminuir tamaño del icono
        color: theme.palette.primary.main,
    },
    button: {
        marginTop: '20px',
        textAlign: 'center',
    },
    header: {
        fontWeight: 'bold',
        marginBottom: '0.5px',
    },
    subtitle: {
        color: '#B9B9B9',
        marginTop: '-2px',
        marginBottom: '15px', // Agregar margen inferior para separar el subtítulo de las cajas
    },
    statText: {
        fontSize: '14px', // Disminuir tamaño de la letra de los títulos
    },
    statValue: {
        fontSize: '15px', // Disminuir tamaño de la letra de los valores
        fontWeight: 'bold', // Hacer los valores en negrita
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
    },
    verMasButton: {
        height: 'fit-content',
        mt: '-8px', // Ajustar margen superior para subir el botón
    },
};

const mockupData = {
    satisfactionPercentage: 87,
    topDoctorHours: 'Dr. Juan Perez',
    averageAppointments: 15,
    averageRating: 4.5,
    occupationPercentage: 80,
    newPatientsPerMonth: 25,
};

const DoctorStats = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={styles.headerContainer}>
                    <Box>
                        <Typography variant="h6" component="div" sx={styles.header}>
                            Métricas
                        </Typography>
                        <Typography variant="body2" sx={styles.subtitle}>
                            Mira cómo le ha ido a tus doctores
                        </Typography>
                    </Box>
                    <Button variant="contained" color="primary" sx={styles.verMasButton}>Ver más</Button>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <ThumbUpIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Porcentaje de Satisfacción</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.satisfactionPercentage}%</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <AccessTimeIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Doctor con Más Horas</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.topDoctorHours}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <EventAvailableIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Promedio de Citas por Doctor</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.averageAppointments}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <StarIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Promedio de Calificación por Doctor</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.averageRating}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <PieChartIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Porcentaje de Ocupación por Doctor</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.occupationPercentage}%</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={styles.paper}>
                            <PersonAddIcon sx={styles.icon} />
                            <Typography variant="h6" sx={styles.statText}>Cantidad de Pacientes Nuevos por Mes</Typography>
                            <Typography variant="h4" sx={styles.statValue}>{mockupData.newPatientsPerMonth}</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default DoctorStats;
