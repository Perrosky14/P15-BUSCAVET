import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import VeterinariaService from "../services/VeterinariaService.jsx";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh', //Altura de la pantalla
    },

    card: {
        width: '90%', // El Box ocupa el 90% del ancho de la pantalla
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
        height: '50px',
        borderRadius: '16px',
    },
};

export default function RegisterVeterinariaComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    
    const { usuario } = location.state; //Usuario con el correo y la contraseña
    const [veterinaria, setVeterinaria] = useState({
        email: "",
        contrasenia: "",
        rut: "",
        razon_social : "",
        nombre_comercial: "",
        nombre_1_rep_legal: "",
        nombre_2_rep_legal: "",
        direccion: "",
        numero: "",
        tipo: "",
        comuna: "",
        ciudad: "",
        id_codigo_postal: 0,
        telefono: "",
        celular: "",
        validado: false,
    });

    useEffect(() => {
        setVeterinaria((prevVeterinaria) => ({
            ...prevVeterinaria,
            ...usuario,
            validado: false,
        }));
    }, [usuario]
    );

    const cambiarCampo = (campo, valor) => {
        setVeterinaria((prevVeterinaria) => ({
            ...prevVeterinaria,
            [campo]: valor,
        }));
    };

    const validateDatosVeterinaria = () => {
        let newErrors = {};
        if (!veterinaria.rut) newErrors.rut = "El rut de la veterinaria es requerida";
        if (!veterinaria.razon_social) newErrors.razon_social = "La razón social es requerida";
        if (!veterinaria.nombre_comercial) newErrors.nombre_comercial = "El nombre comercial es requerido";
        if (!veterinaria.nombre_1_rep_legal) newErrors.nombre_1_rep_legal = "El nombre del representante legal es requerido";
        if (!veterinaria.celular) newErrors.celular = "El número celular es requerido";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDireccionManual = () => {
        let newErrors = {};
        if (!veterinaria.direccion) newErrors.direccion = "La calle es requerida";
        if (!veterinaria.numero) newErrors.numero = "El número es requerido";
        if (!veterinaria.comuna) newErrors.comuna = "La comuna es requerida";
        if (!veterinaria.ciudad) newErrors.ciudad = "La ciudad es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        navigate('/registro', {state: {usuario}});
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleNext = () => {
        if (step === 1 && validateDatosVeterinaria()) {
            setStep(step + 1);
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

    const handleManualFinish = async () => {
        if (validateDireccionManual()) {
            try {
                const response = await VeterinariaService.createVeterinaria(veterinaria);
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Veterinaria registrada exitosamente:', response);
                setStep(3);
            } catch (error) {
                console.error('Error al registrar veterinaria:', error);
            }
        };
    };

    const handleFinish = async () => {
        try {
            const response = await VeterinariaService.createVeterinaria(veterinaria);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Veterinaria registrada exitosamente:', response);
            setStep(3);
        } catch (error) {
            console.error('Error al registrar veterinaria:', error);
        }
    }

    const cardDatosVeterinaria = (
        <Card sx={{ width: '90%', maxWidth: 702 }}>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Información Veterinaria</Typography>
                    <Typography sx={styles.stepText}>2 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="rut" label="Rut de la veterinaria" variant="outlined" fullWidth required
                            value={veterinaria.rut} onChange={(e) => cambiarCampo("rut", e.target.value)}
                            error={!!errors.rut} helperText={errors.rut}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="razon-social" label="Razón social" variant="outlined" fullWidth required
                            value={veterinaria.razon_social} onChange={(e) => cambiarCampo("razon_social", e.target.value)}
                            error={!!errors.razon_social} helperText={errors.razon_social}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="nombre-comercial" label="Nombre comercial" variant="outlined" fullWidth required
                            value={veterinaria.nombre_comercial} onChange={(e) => cambiarCampo("nombre_comercial", e.target.value)}
                            error={!!errors.nombre_comercial} helperText={errors.nombre_comercial}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="nombre-1-rep-legal" label="Nombre del primer representante legal" variant="outlined" fullWidth required
                            value={veterinaria.nombre_1_rep_legal} onChange={(e) => cambiarCampo("nombre_1_rep_legal", e.target.value)}
                            error={!!errors.nombre_1_rep_legal} helperText={errors.nombre_1_rep_legal}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="nombre-2-rep-legal" label="Nombre del segundo representante legal" variant="outlined" fullWidth
                            value={veterinaria.nombre_2_rep_legal} onChange={(e) => cambiarCampo("nombre_2_rep_legal", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        id="numero-celular" label="Número celular" variant="outlined" fullWidth required
                        value={veterinaria.celular} onChange={(e) => cambiarCampo("celular", e.target.value)}
                        error={!!errors.celular} helperText={errors.celular}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                        id="numero-telefono" label="Número teléfono" variant="outlined" fullWidth required
                        value={veterinaria.telefono} onChange={(e) => cambiarCampo("telefono", e.target.value)}
                        helperText="Opcional"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Card>
    );

    const cardDireccionVeterinaria = (
        <Card sx={styles.card}>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega la dirección</Typography>
                    <Typography sx={styles.stepText}>3 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="busca-direccion"
                            label="Busca la dirección de la veterinaria"
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
                        <Typography textAlign="left" sx={{ fontWeight: 'bold', marginTop: 15 }}>Compartir la dirección muestra:</Typography>
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
                <Button variant="contained" sx={styles.button} onClick={handleBack} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleFinish} fullWidth>Guardar Información</Button>
            </CardActions>
        </Card>
    );

    const cardDireccionManualVeterinaria = (
        <Card sx={styles.card}>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega la dirección</Typography>
                    <Typography sx={styles.stepText}>3 de 3</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="calle" label="Calle" variant="outlined" fullWidth required
                            value={veterinaria.direccion} onChange={(e) => cambiarCampo("direccion", e.target.value)}
                            error={!!errors.direccion} helperText={errors.direccion}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="numero" label="Número" variant="outlined" fullWidth required
                            value={veterinaria.numero} onChange={(e) => cambiarCampo("numero", e.target.value)}
                            error={!!errors.numero} helperText={errors.numero}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="busca-direccion" label="Oficina/Centro" variant="outlined" fullWidth required
                            value={veterinaria.tipo} onChange={(e) => cambiarCampo("tipo", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="comuna" label="Comuna" variant="outlined" fullWidth required
                            value={veterinaria.comuna} onChange={(e) => cambiarCampo("comuna", e.target.value)}
                            error={!!errors.comuna} helperText={errors.comuna}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="ciudad" label="Ciudad" variant="outlined" fullWidth required
                            value={veterinaria.ciudad} onChange={(e) => cambiarCampo("ciudad", e.target.value)}
                            error={!!errors.ciudad} helperText={errors.ciudad}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="codigo-postal" label="Código postal" variant="outlined" fullWidth
                            value={veterinaria.id_codigo_postal} onChange={(e) => cambiarCampo("id_codigo_postal", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} onClick={handleManualBack} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleManualFinish} fullWidth>Guardar Información</Button>
            </CardActions>
        </Card>
    );

    const cardFinalizacion = (
        <Card sx={styles.card}>
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
                <Button variant="contained" sx={styles.button} fullWidth onClick={() => navigate('/veterinaria')}>Ir al sitio web</Button>
            </CardActions>
        </Card>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return cardDatosVeterinaria;
            case 2:
                return cardDireccionVeterinaria;
            case 3:
                return cardFinalizacion;
            case 102:
                return cardDireccionManualVeterinaria;
            default:
                return cardDatosVeterinaria;
        }
    };

    return (
    <>
        <NavbarComponent/>
        <ThemeProvider theme={theme}>
            <div style={styles.container}>
                {renderStep()} 
            </div>
        </ThemeProvider>
    </>
    )
};