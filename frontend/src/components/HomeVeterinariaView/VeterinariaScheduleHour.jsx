import React from 'react';
import { Grid, Paper, Typography, Avatar, Box, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import theme from '../styles/themeComponent';

const styles = {
    button: {
        borderRadius: '25px',
        padding: '10px 20px',
    },
    motivo: {
        display: 'flex',
        alignItems: 'center',
    },
    tipo: {
        color: '#B9B9B9',
    },
    motivoTexto: {
        color: '#ff436f',
        fontWeight: 'bold',
    },
    nombre: {
        fontWeight: 'bold',
    },
    detalles: {
        color: '#313131',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    detalleItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        color: '#B9B9B9',
    },
    paper: {
        borderRadius: '32px',
        padding: '16px',
        marginBottom: '8px',
        border: '2px solid #FFFFFF',
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        width: 'auto',
    },
    icon: {
        width: '20px',
        height: '20px',
    },
    moreIcon: {
        color: '#ff436f',
        width: '30px',
        height: '30px',
    },
    boxContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginLeft: '16px', // Ajusta este valor según sea necesario
    },
};

const VeterinariaScheduleHour = ({ nombre, tipo, motivo, lugar, fecha, hora, avatarSrc }) => {
    return (
        <ThemeProvider theme={theme}>
            <Paper sx={styles.paper}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={5} container alignItems="center" spacing={2}>
                        <Grid item>
                            <Avatar src={avatarSrc} />
                        </Grid>
                        <Grid item>
                            <Typography style={styles.nombre}>
                                {nombre} <span style={styles.tipo}>- {tipo}</span>
                            </Typography>
                            <Typography variant="body2" style={styles.detalles}>
                                <span style={styles.motivoTexto}>Motivo consulta:</span> {motivo}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} style={styles.motivo}>
                        <Box style={styles.boxContainer}>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <HomeIcon style={styles.icon} /> {lugar}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <CalendarTodayIcon style={styles.icon} /> {fecha}
                            </Typography>
                            <Typography variant="body2" style={styles.detalleItem}>
                                <AccessTimeIcon style={styles.icon} /> {hora}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} container justifyContent="flex-end">
                        <IconButton>
                            <MoreVertIcon style={styles.moreIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default VeterinariaScheduleHour;
