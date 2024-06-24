import React from 'react';
import { Grid, Paper, Typography, Avatar, Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
        gap: '8px', // Añadir un poco de espacio entre los íconos y el texto
    },
    detalleItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px', // Añadir un poco de espacio entre el ícono y el texto
        fontSize: '12px',
        color: '#313131', // Ajustar el color del texto
    },
    paper: {
        borderRadius: '32px',
        padding: '16px',
        marginBottom: '16px',
        border: '2px solid #FFFFFF',
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        width: 'auto',
    },
    icon: {
        color: '#ff436f', // Color rosado para los iconos
        fontSize: '20px', // Tamaño de los iconos
    },
    dotIcon: {
        color: '#ff436f', // Color rosado para los puntos separadores
        fontSize: '4px', // Tamaño de los puntos separadores
    },
};

const VeterinariaRequestComponent = ({ nombre, tipo, motivo, edad, color, peso, avatarSrc }) => {
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
                                <span style={styles.detalleItem}>
                                    <StarBorderIcon style={styles.icon} /> {edad}
                                </span>
                                <FiberManualRecordIcon style={styles.dotIcon} />
                                <span style={styles.detalleItem}>
                                    <ColorLensIcon style={styles.icon} /> {color}
                                </span>
                                <FiberManualRecordIcon style={styles.dotIcon} />
                                <span style={styles.detalleItem}>
                                    <MonitorWeightIcon style={styles.icon} /> {peso}
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={5} style={styles.motivo}>
                        <Typography variant="body2">
                            <span style={styles.motivoTexto}>Motivo consulta:</span> {motivo}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="flex-end">
                            <Button variant="contained" color="primary" style={styles.button}>Agendar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default VeterinariaRequestComponent;
