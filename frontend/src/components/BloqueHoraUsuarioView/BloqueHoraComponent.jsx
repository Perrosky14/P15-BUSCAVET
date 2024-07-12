import { useEffect, useState } from "react";
import DoctorService from "../../services/DoctorService";
import MascotaService from "../../services/MascotaService";
import { Button, Grid, ThemeProvider, Typography } from "@mui/material";
import theme from "../styles/themeComponent";

const styles = {
    paper: {
        borderRadius: '2rem', // 32px / 16 = 2rem
        padding: '1rem', // 16px / 16 = 1rem
        marginBottom: '1rem', // 16px / 16 = 1rem
        border: '0.125rem solid #FFFFFF', // 2px / 16 = 0.125rem
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        width: '100%',
    },
    selectedButton: {
        borderColor: '#ff436f', // Color de borde cuando está seleccionado
    },
};

export default function BloqueHoraComponent({ id, motivo, fecha, horaInicio, doctor, mascota, onSelect, isSelected }) {

    return (
        <ThemeProvider theme={theme}>
            <Button
                sx={{ ...styles.paper, ...(isSelected && styles.selectedButton) }}
                fullWidth
                variant="outlined"
                onClick={() => onSelect()}
            >
                <Grid container>
                    <Grid xs={12} spacing={2}>
                        <Typography>Fecha: {fecha}</Typography>
                        <Typography>Hora: {horaInicio}</Typography>
                    </Grid>
                    <Grid xs={12} spacing={2}>
                        <Typography>
                            Dr. {doctor.nombre1} {doctor.apellido1}
                        </Typography>
                        <Typography>
                            Nombre de la mascota: {mascota.nombre}
                        </Typography>
                    </Grid>
                    <Grid xs={12} alignItems="left">
                        <Typography>Motivo: {motivo}</Typography>
                    </Grid>
                </Grid>
            </Button>
        </ThemeProvider>
    );
}
