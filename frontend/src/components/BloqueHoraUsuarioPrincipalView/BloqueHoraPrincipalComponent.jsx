import { Box, CardMedia, Grid, ThemeProvider, Typography } from "@mui/material";
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
    avatarContainer: {
        borderRadius: '1rem',
        overflow: 'hidden',
        width: '64px', // Ajusta según tus necesidades
        height: '64px', // Ajusta según tus necesidades
        backgroundColor: '#D9D9D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D9D9D9',
        borderRadius: '1rem',
    },
};

const BloqueHoraPrincipalComponent = ({ fecha, horaInicio, doctor, avatar }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={styles.paper}
                fullWidth
            >
                <Grid container>
                    <Grid item xs={2.5} container alignItems="center" justifyContent="center">
                        <Box sx={{ ...styles.avatarContainer, backgroundColor: avatar ? 'transparent' : '#D9D9D9' }}>
                            {avatar ? (
                                <CardMedia component="img" alt={doctor.nombre1} image={avatar} sx={styles.avatar}></CardMedia>
                            ) : (
                                <Box sx={styles.placeholder}></Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid>     
                        <Typography>Dr. {doctor.nombre1} {doctor.apellido1}</Typography>
                        <Grid sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography> Fecha: {fecha} </Typography>
                            <Box sx={{ mx: 1.5 }} /> {/* Espaciado horizontal */}
                            <Typography> Hora: {horaInicio} </Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </ThemeProvider>
    );
};
export default BloqueHoraPrincipalComponent;