import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import theme from "./styles/themeComponent";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import { Button, Card, CardHeader, CardMedia, FormHelperText, Grid, InputAdornment, Tooltip, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import NavbarComponent from "./NavbarComponent";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh', //Altura de la pantalla
    },

    card: {
        width: '90%', // El Box ocupa el 80% del ancho de la pantalla
        maxWidth: 502, // Máximo ancho del Box
        padding: 5,
        textAlign: 'center',
        height: 'auto',
        margin: 'auto',
        borderRadius: '16px',
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    stepText: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#6bc62d',
        fontWeight: 'bold'
    },

    formControl: {
        marginTop: 3,
        width: '100%',
    },

    button: {
        with: '100%',
    },
};

export default function RegisterTutorComponent() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [usuario, setUsuario] = useState({
        rut: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        genero: "",
        fechaNacimiento: null,
        direccion: "",
        numero: "",
        tipo: "",
        comuna: "",
        ciudad: "",
        codigoPostal: "",
        telefono: "",
        celular: "",
    });

    const cambiarCampo = (campo, valor) => {
        setUsuario({
            ...usuario,
            [campo]: valor,
        });
    };

    const validateDatosTutor = () => {
        let newErrors = {};
        if (!usuario.nombre1) newErrors.nombre1 = "Primer nombre es requerido";
        if (!usuario.nombre2) newErrors.nombre2 = "Segundo nombre es requerido";
        if (!usuario.apellido1) newErrors.apellido1 = "Primer apellido es requerido";
        if (!usuario.apellido2) newErrors.apellido2 = "Segundo apellido es requerido";
        if (!usuario.genero) newErrors.genero = "El genero es requerido";
        if (!usuario.celular) newErrors.celular = "El numero celular es requerido";
        if (!usuario.fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerido";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDireccionManual = () => {
        let newErrors = {};
        if (!usuario.direccion) newErrors.direccion = "La calle es requerida";
        if (!usuario.numero) newErrors.numero = "El número es requerido";
        if (!usuario.comuna) newErrors.comuna = "La comuna es requerido";
        if (!usuario.ciudad) newErrors.ciudad = "La ciudad es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        navigate('/registro');
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleNext = () => {
        if (step === 1 && validateDatosTutor()) {
            setStep(step + 1);
        }
        else {
            
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleManualNext = () => {
        setStep(step + 100);
    };

    const handleManualBack = () => {
        setStep(step - 100);
    };

    const handleManualFinish = () => {
        if (validateDireccionManual()) {
            setStep(3);
        };
    };

    const cardDatosTutor = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Información Personal</Typography>
                    <Typography sx={styles.stepText}>2 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <TextField 
                            id="primer-nombre" label="Primer nombre" variant="outlined" fullWidth required
                            value={usuario.nombre1} onChange={(e) => cambiarCampo("nombre1", e.target.value)}
                            error={!!errors.nombre1} helperText={errors.nombre1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="segundo-nombre" label="Segundo nombre" variant="outlined" fullWidth required
                            value={usuario.nombre2} onChange={(e) => cambiarCampo("nombre2", e.target.value)}
                            error={!!errors.nombre2} helperText={errors.nombre2}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        id="primer-apellido" label="Primer apellido" variant="outlined" fullWidth required
                        value={usuario.apellido1} onChange={(e) => cambiarCampo("apellido1", e.target.value)}
                        error={!!errors.apellido1} helperText={errors.apellido1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        id="segundo-apellido" label="Segundo apellido" variant="outlined" fullWidth required
                        value={usuario.apellido2} onChange={(e) => cambiarCampo("apellido2", e.target.value)}
                        error={!!errors.apellido2} helperText={errors.apellido2}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} alignItems="center">
                    <Grid item>
                        <Typography textAlign="left">Género:</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl component="fieldset" error={!!errors.genero}>
                            <RadioGroup 
                                row aria-label="genero" name="genero" required
                                value={usuario.genero} 
                                onChange={(e) => cambiarCampo("genero", e.target.value)}
                                >
                                <FormControlLabel value="Mujer" control={<Radio />} label="Mujer" />
                                <FormControlLabel value="Hombre" control={<Radio />} label="Hombre" />
                                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                            </RadioGroup>
                            {!!errors.genero && <FormHelperText>{errors.genero}</FormHelperText>}
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField 
                        id="numero-celular" label="Número celular" variant="outlined" fullWidth required
                        value={usuario.celular} onChange={(e) => cambiarCampo("celular", e.target.value)}
                        error={!!errors.celular} helperText={errors.celular}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        id="numero-telefono" label="Número teléfono" variant="outlined" fullWidth required
                        value={usuario.telefono} onChange={(e) => cambiarCampo("telefono", e.target.value)}
                        helperText="Opcional"
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                            <DatePicker 
                                label="Fecha de nacimiento"
                                value={usuario.fechaNacimiento} 
                                onChange={(fecha) => cambiarCampo("fechaNacimiento", fecha)}
                                renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    fullWidth
                                    required
                                    error={!!errors.fechaNacimiento}
                                    helperText={errors.fechaNacimiento}
                                />}
                                inputFormat="dd/MM/yyyy"
                                disableFuture
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Fragment>
    );

    const cardDireccionTutor = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega tu dirección</Typography>
                    <Typography sx={styles.stepText}>3 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="busca-direccion"
                            label="Busca tu dirección"
                            helperText="Tu dirección no es visible para otros usuarios"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                        <Button variant="outlined" startIcon={<LocationOnIcon/>} sx={{ fontWeight: 'bold' }}>Usar ubicación actual</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" sx={{ fontWeight: 'bold' }} onClick={handleManualNext}>Agregar manualmente</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography textAlign="left" sx={{ fontWeight: 'bold', marginTop: 15 }}>Compartir tu dirección muestra:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                            <GroupIcon sx={{ mr: 1 }}/>Centros y veterinarios cerca de ti
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                            <AccessTimeIcon sx={{ mr: 1 }} /> Distancia y tiempo de recorrido estimado
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleBack} fullWidth>Atrás</Button>
                <Button variant="contained" onClick={handleNext} fullWidth>Guardar Información</Button>
            </CardActions>
        </Fragment>
    );

    const cardDireccionManualTutor = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega tu dirección</Typography>
                    <Typography sx={styles.stepText}>3 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="calle" label="Calle" variant="outlined" fullWidth required
                            value={usuario.direccion} onChange={(e) => cambiarCampo("direccion", e.target.value)}
                            error={!!errors.direccion} helperText={errors.direccion}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="numero" label="Número" variant="outlined" fullWidth required
                            value={usuario.numero} onChange={(e) => cambiarCampo("numero", e.target.value)}
                            error={!!errors.numero} helperText={errors.numero}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="busca-direccion" label="Departamento/Block" variant="outlined" fullWidth required
                            value={usuario.tipo} onChange={(e) => cambiarCampo("tipo", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="comuna" label="Comuna" variant="outlined" fullWidth required
                            value={usuario.comuna} onChange={(e) => cambiarCampo("comuna", e.target.value)}
                            error={!!errors.comuna} helperText={errors.comuna}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="ciudad" label="Ciudad" variant="outlined" fullWidth required
                            value={usuario.ciudad} onChange={(e) => cambiarCampo("ciudad", e.target.value)}
                            error={!!errors.ciudad} helperText={errors.ciudad}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="codigo-postal" label="Código postal" variant="outlined" fullWidth
                            value={usuario.codigoPostal} onChange={(e) => cambiarCampo("codigoPostal", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleManualBack} fullWidth>Atrás</Button>
                <Button variant="contained" onClick={handleManualFinish} fullWidth>Guardar Información</Button>
            </CardActions>
        </Fragment>
    );

    const cardFinalizacion = (
        <Fragment>
            <CardHeader
                action={
                    <Tooltip title="cerrar" placement="top-end">
                        <IconButton aria-label="cerrar" onClick={() => navigate('/usuario')}><CloseIcon /></IconButton>
                    </Tooltip>
                }
                title={<Typography variant="h6" component="div">Datos guardados</Typography>}
                style={{ textAlign: 'left' }}
            />
            <CardMedia
                component="img"
                height="200" // Altura de la imagen
                image="/images_app/doctora_1.png" // Ruta de tu imagen
                alt="Imagen de la mascota" // Descripción de la imagen
            />
            <CardContent style={styles.cardContent}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>¡Te has registrado exitosamente!</Typography>
            </CardContent>
            <CardActions sx={{ mt: 1 }}>
                <Button variant="contained" fullWidth onClick={() => navigate('/usuario')}>Ir al sitio web</Button>
            </CardActions>
        </Fragment>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return cardDatosTutor;
            case 2:
                return cardDireccionTutor;
            case 3:
                return cardFinalizacion;
            case 102:
                return cardDireccionManualTutor;
            default:
                return cardDatosTutor;
        }
    };

    return (
    <>
        <NavbarComponent/>
        <ThemeProvider theme={theme}>
            <div style={styles.container}>
                <Card sx = {styles.card}>
                    {renderStep()}
                </Card>  
            </div>
        </ThemeProvider>
    </>
    )
};