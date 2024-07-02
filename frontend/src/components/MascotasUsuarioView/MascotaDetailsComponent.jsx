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

const calcularEdad = (dia_nac, mes_nac, anio_nac) => {
    const fechaActual = new Date();
    const fechaNacimiento = new Date(anio_nac, mes_nac - 1, dia_nac);

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const diferenciaMeses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    const diferenciaDias = fechaActual.getDate() - fechaNacimiento.getDate();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && diferenciaDias < 0)) {
        edad--;
    }

    const mesesTranscurridos = (fechaActual.getMonth() - fechaNacimiento.getMonth()) + (12 * (fechaActual.getFullYear() - fechaNacimiento.getFullYear()));
    const edadExacta = edad + (mesesTranscurridos % 12) / 12;

    return edadExacta.toFixed(1); // Devuelve la edad con un decimal
};

const MascotaDetailsComponent = ({ mascota, avatar }) => {
    const edad = calcularEdad(mascota.dia_nac, mascota.mes_nac, mascota.anio_nac);

    return(
        <Box sx={styles.boxContainer}>
            <Box sx={styles.topBar}></Box>
            <Grid container spacing={2} sx={styles.content}>
                <Grid item xs={4} sx={styles.gridColumn} mt={-3.5}>
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
                <Grid item xs={8} sx={styles.gridColumn2} mt={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Edad:</span> {edad} años
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Sexo:</span> {mascota.sexo}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Genio:</span> Docil
                                    </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles} mt={1}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Peso:</span> {mascota.peso} kg
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles} mt={1}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Raza:</span> {mascota.raza}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles} mt={1}>
                                <Typography sx={styles.boxContenido}>
                                    <span style={styles.textoColor}>Color:</span> {mascota.color}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Typography sx={styles.subtitulos}>Condiciones</Typography>
                    </Box>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>Alergia</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>Senior</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={styles.boxDetalles2}>
                                <Typography style={styles.boxContenido2}>Epilepsia</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Typography sx={{ ...styles.subtitulos }}>Sobre {mascota.nombre}</Typography>
                    </Box>
                    <Box mt={1}>
                        <Typography sx={styles.texto}>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum d  
                        </Typography>
                    </Box>
                    <Box mt={4}>
                        <Typography sx={styles.subtitulos}>Historial</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MascotaDetailsComponent;