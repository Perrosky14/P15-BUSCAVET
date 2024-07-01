import { Box, CardMedia, Grid, Typography } from "@mui/material";

const styles = {
    boxContainer: {
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        backgroundColor: '#ff436f',
        borderRadius: '1rem',
    },
    content: {
        zIndex: 1,
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
        position: 'absolute',
        top: '20px',
        left: '50px',
    },
    gridColumn2: {
        width: '529px',
        position: 'absolute',
        top: '100px',
        left: '350px',
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
        width: '135px',
        height: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxContenido: {
        textAlign: 'center',
    },
    subtitulos: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '24px',
    }
};

const MascotaDetailsComponent = ({ mascota, avatar }) => {
    return(
        <Box sx={styles.boxContainer}>
            <Box sx={styles.topBar}></Box>
            <Grid container spacing={2} sx={styles.content}>
                <Grid item xs={4} sx={styles.gridColumn}>
                    <Box sx={{ ...styles.avatarContainer, backgroundColor: avatar ? 'transparent' : '#D9D9D9'}}>
                        {avatar ? (
                            <CardMedia
                                component="img"
                                alt={mascota.nombre}
                                image={avatar}
                                sx={styles.avatar}
                            />
                        ) : (
                            <Box sx={styles.placeholder}/>
                        )}
                    </Box>
                    <Typography mt={1.5} sx={styles.nombre}>{mascota.nombre}</Typography>
                    <Typography sx={styles.detalleTipoAnimal}>{mascota.especie}</Typography>
                </Grid>
                <Grid item xs={8} sx={styles.gridColumn2}>
                    <Grid container sx={styles.gridRow}>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                            <Box mt={1} sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                            <Box mt={1} sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                            <Box mt={1} sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>HOLA</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography mt={4} sx={styles.subtitulos}>Condiciones</Typography>
                    <Grid container sx={styles.gridRow}>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MascotaDetailsComponent;