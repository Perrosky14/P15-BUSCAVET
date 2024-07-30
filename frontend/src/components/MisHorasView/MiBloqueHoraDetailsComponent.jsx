import { Box, CardMedia, Grid, Typography } from "@mui/material";
import { de } from "date-fns/locale";

const styles = {
    boxContainer: {
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
    },
    topBar: {
        width: '100%',
        height: '70px',
        backgroundColor: '#ff436f',
        borderRadius: '1rem',
    },
    content: {
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    avatarContainer: {
        borderRadius: '1rem',
        overflow: 'hidden',
        width: '172px',
        height: '172px',
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
    gridColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridColumn2: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridRow: {
        width: '529px',
    },
    nombre: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '30px',
    },
    detalleTipoAnimal: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '24px',
        color: '#B9B9B9',
    },
    boxDetalles: {
        borderRadius: '2rem',
        padding: '1rem',
        border: '0.125rem solid #FFFFFF',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10px',
    },
    boxContenido: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '20px',
    },
    boxContenido2: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FF436F',
        fontSize: '21px',
    },
    boxDetalles2: {
        borderRadius: '2rem',
        padding: '1rem',
        border: ' 2px solid #FF436F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '10px',
    },
    subtitulos: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '24px',
    },
    textoColor: {
        color: '#FF436F',
    },
    texto: {
        color: '#B9B9B9',
        fontSize: '15px',
    }
};


const MiBloqueHoraDetailsComponent = ({ bloqueHora, doctor, mascota, avatar}) => {
    
    return(
        <Box sx={styles.boxContainer}>
            <Box sx={styles.topBar}></Box>
            <Grid container spacing={2} sx={styles.content}>
                <Grid item xs={4} sx={styles.gridColumn} mt={-3.5}>
                    <Box sx={{ ...styles.avatarContainer, backgroundColor: avatar ? 'transparent' : '#D9D9D9'}}>
                        {avatar ? (
                            <CardMedia
                                component="img"
                                alt={doctor.nombre}
                                image={avatar}
                                sx={styles.avatar}
                            />
                        ) : (
                            <Box sx={styles.placeholder}/>
                        )}
                    </Box>
                    <Typography mt={1.5} sx={styles.nombre}>Dr. {bloqueHora.doctor.nombre1} {bloqueHora.doctor.apellido1}</Typography>
                    <Typography sx={styles.detalleTipoAnimal}>{bloqueHora.mascota.especie}</Typography>
                </Grid>
                <Grid item xs={8} sx={styles.gridColumn2} mt={4}>
                    <Box mt={4}>
                        <Typography sx={styles.subtitulos}>Sobre mi hora agendada</Typography>
                    </Box>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>{bloqueHora.fecha}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>{bloqueHora.horaInicio}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Typography sx={styles.subtitulos}>Sobre mi mascota</Typography>
                    </Box>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>{bloqueHora.mascota.nombre}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>{bloqueHora.mascota.id_especie}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>{bloqueHora.mascota.id_sexo}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Typography sx={{ ...styles.subtitulos }}>Motivo de la consulta</Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography sx={styles.texto}>
                        Usted solicito una hora con el doctor {bloqueHora.doctor.nombre1} {bloqueHora.doctor.apellido1} con el siguiente motivo: 
                        {bloqueHora.motivo}.
                        Se le recuerda asistir el dia {bloqueHora.fecha} a las {bloqueHora.horaInicio}.
                        por favor traer todos los implementos necesarios para el transporte y seguridad de tu mascota.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MiBloqueHoraDetailsComponent;