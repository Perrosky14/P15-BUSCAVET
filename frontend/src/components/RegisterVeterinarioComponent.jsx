import { useState, Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "./styles/themeComponent";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import { Button, Card, CardHeader, CardMedia, FormHelperText, Grid, InputAdornment, Tooltip, Typography, InputLabel, Select, MenuItem } from "@mui/material";
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
import DoctorService from "../services/DoctorService";
import VeterinariaService from "../services/VeterinariaService";



const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },

    card: {
        width: '80%',
        maxWidth: 502,
        padding: 20,
        textAlign: 'center',
        height: 'auto',
        maxHeight: 400,
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


export default function RegisterVeterinarioComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [veterinarias, setVeterinarias] = useState([]);
    const { usuario } = location.state;
    const [fechaNacimiento, setFechaNacimiento] = useState(null);
    const [doctorGuardar, setDoctorGuardar] = useState({
        email: "",
        contrasenia: "",
        rut: "",
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        genero: "",
        dia_nac: 0,
        mes_nac: 0,
        anio_nac: 0,
        id_institucion_vet_1: "",
        id_institucion_vet_2: "",
        id_institucion_vet_3: "",
        id_especialidad_1: "",
        id_especialidad_2: "",
        id_especialidad_3: "",
        direccion: "",
        numero: "",
        tipo: "",
        comuna: "",
        ciudad: "",
        id_codigo_postal: 0,
        telefono: "",
        celular: "",
        RRSS1: "",
        idVeterinaria: "",
    });


    useEffect(() => {
        if (usuario) {
            setDoctorGuardar(usuario);
        }
    }, [usuario]);

    useEffect(() => {

        VeterinariaService.getVeterinarias()
            .then(response => {
                setVeterinarias(response.data);
            })
            .catch(error => {
                console.error("Error al obtener las instituciones:", error);
            });
    }, []);

    const cambiarCampo = (campo, valor) => {
        setDoctorGuardar((prevDoctor) => ({
            ...prevDoctor,
            [campo]: valor,
        }));
    };

    const handleFechaChange = (fecha) => {
        setFechaNacimiento(fecha);
    };

    const validateDatosVet = () => {
        let newErrors = {};
        if (!doctorGuardar.nombre1) newErrors.nombre1 = "Primer nombre es requerido";
        if (!doctorGuardar.nombre2) newErrors.nombre2 = "Segundo nombre es requerido";
        if (!doctorGuardar.apellido1) newErrors.apellido1 = "Primer apellido es requerido";
        if (!doctorGuardar.apellido2) newErrors.apellido2 = "Segundo apellido es requerido";
        if (!doctorGuardar.genero) newErrors.genero = "El género es requerido";
        if (!doctorGuardar.celular) newErrors.celular = "El numero celular es requerido";
        if (!fechaNacimiento) newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateDireccionManual = () => {
        let newErrors = {};
        if (!doctorGuardar.direccion) newErrors.direccion = "La calle es requerida";
        if (!doctorGuardar.numero) newErrors.numero = "El número es requerido";
        if (!doctorGuardar.comuna) newErrors.comuna = "La comuna es requerida";
        if (!doctorGuardar.ciudad) newErrors.ciudad = "La ciudad es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateSpecilidad = () => {
        let newErrors = {};
        if (!doctorGuardar.id_especialidad_1) newErrors.id_especialidad_1 = "La primera especialidad es requerida";
        if (!doctorGuardar.idVeterinaria) newErrors.idVeterinaria = "La Veterinaria es requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleRegister = () => {

        navigate('/registro', { state: { doctor: doctorGuardar } });
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleNext = () => {
        if (step === 1 && validateDatosVet()) {
            const dia = fechaNacimiento.getDate();
            const mes = fechaNacimiento.getMonth() + 1;
            const anio = fechaNacimiento.getFullYear();
            cambiarCampo("dia_nac", parseInt(dia));
            cambiarCampo("mes_nac", parseInt(mes));
            cambiarCampo("anio_nac", parseInt(anio));
            setStep(step + 1);
        } else if (step === 2 && validateSpecilidad()) {

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
        const doctor = {
            ...doctorGuardar,
            idVeterinaria: doctorGuardar.idVeterinaria,
        };
        if (validateDireccionManual()) {
            try {
                
                const veterinarioJSON = JSON.stringify(doctorGuardar);
                const response = await VeterinariaService.createDoctor(doctorGuardar);
                console.log(response)
                const token = response.data.token;
                localStorage.setItem('token', token);
                setStep(4);
            } catch (error) {
                console.error('Error al registrar veterinario:', error);
            }
        }
    };

    const handleFinish = async () => {
        try {
            const response = await VeterinariaService.createDoctor(doctorGuardar);
            console.log('Veterinario registrado exitosamente:', response);
            setStep(4);
        } catch (error) {
            console.error('Error al registrar Veterinario:', error);
        }
    };

    const specialties = [
        { id: 1, name: "General" },
        { id: 2, name: "Dermatología" },
        { id: 3, name: "Odontología" },
        { id: 4, name: "Cardiología" },
        { id: 5, name: "Neurología" },
        { id: 6, name: "Ortopedia" },
        { id: 7, name: "Oftalmología" },
    ];

    const cardDatosTutor = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Información Personal</Typography>
                    <Typography sx={styles.stepText}>2 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="primer-nombre" label="Primer nombre" variant="outlined" fullWidth required
                            value={doctorGuardar.nombre1} onChange={(e) => cambiarCampo("nombre1", e.target.value)}
                            error={!!errors.nombre1} helperText={errors.nombre1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="segundo-nombre" label="Segundo nombre" variant="outlined" fullWidth required
                            value={doctorGuardar.nombre2} onChange={(e) => cambiarCampo("nombre2", e.target.value)}
                            error={!!errors.nombre2} helperText={errors.nombre2}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="primer-apellido" label="Primer apellido" variant="outlined" fullWidth required
                            value={doctorGuardar.apellido1} onChange={(e) => cambiarCampo("apellido1", e.target.value)}
                            error={!!errors.apellido1} helperText={errors.apellido1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="segundo-apellido" label="Segundo apellido" variant="outlined" fullWidth required
                            value={doctorGuardar.apellido2} onChange={(e) => cambiarCampo("apellido2", e.target.value)}
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
                                value={doctorGuardar.genero}
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
                            value={doctorGuardar.celular} onChange={(e) => cambiarCampo("celular", e.target.value)}
                            error={!!errors.celular} helperText={errors.celular}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="numero-telefono" label="Número teléfono" variant="outlined" fullWidth required
                            value={doctorGuardar.telefono} onChange={(e) => cambiarCampo("telefono", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                            <DatePicker
                                label="Fecha de nacimiento"
                                value={fechaNacimiento}
                                onChange={handleFechaChange}
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
                <Button variant="contained" sx={styles.button} onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Fragment>
    );

    /*const cardDatosVet = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Información Profesional</Typography>
                    <Typography sx={styles.stepText}>3 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="nombre-institucion-label">Nombre Institución</InputLabel>
                        <Select
                            labelId="nombre-institucion-label"
                            id="nombre-institucion"
                            value={doctorGuardar.idVeterinaria}
                            onChange={(e) => { const idVeterinaria = e.target.value;
                                const nombreVeterinaria = veterinarias.filter(v => v.id == idVeterinaria)[0];
                                setDoctorGuardar(prevValues => ({
                                  ...prevValues,
                                  idVeterinaria,
                                  id_institucion_vet_1: nombreVeterinaria,
                                }))}}
                            variant="outlined"
                        >
                            {veterinarias.map((veterinaria) => (
                                <MenuItem key={veterinaria.id} value={veterinaria.id}>
                                    {veterinaria.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} alignItems="center">
                    <Grid item>
                        <Typography textAlign="left" style={{ marginRight: 20 }}>Especialidad:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="specialty-label">Especialidad</InputLabel>
                            <Select
                                labelId="specialty-label"
                                id="specialty-select"
                                value={doctorGuardar.id_especialidad_1}
                                label="Especialidad"
                                onChange={(e) => cambiarCampo("id_especialidad_1", e.target.value)}
                            >
                                {specialties.map((specialty) => (
                                    <MenuItem key={specialty.id} value={specialty.id}>
                                        {specialty.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        id="RRSS1" label="RRSS1" variant="outlined" fullWidth required
                        value={doctorGuardar.RRSS1} onChange={(e) => cambiarCampo("RRSS1", e.target.value)}
                        helperText="Opcional"
                    />

                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Fragment>
    );*/

    const cardDatosVet = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Información Profesional</Typography>
                    <Typography sx={styles.stepText}>3 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid item xs={12}>
                    <FormControl fullWidth required>
                        <InputLabel id="nombre-institucion-label">Nombre Institución</InputLabel>
                        <Select
                            labelId="nombre-institucion-label"
                            id="nombre-institucion"
                            value={doctorGuardar.idVeterinaria}
                            onChange={(e) => {
                                const idVeterinaria = e.target.value;
                                setDoctorGuardar(prevValues => ({
                                    ...prevValues,
                                    idVeterinaria,
                                }));
                            }}
                            variant="outlined"
                        >
                            {veterinarias.map((veterinaria) => (
                                <MenuItem key={veterinaria.id} value={veterinaria.id}>
                                    {veterinaria.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <TextField
                        label="ID Veterinaria"
                        variant="outlined"
                        fullWidth
                        value={doctorGuardar.idVeterinaria}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }} alignItems="center">
                    <Grid item>
                        <Typography textAlign="left" style={{ marginRight: 20 }}>Especialidad:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="specialty-label">Especialidad</InputLabel>
                            <Select
                                labelId="specialty-label"
                                id="specialty-select"
                                value={doctorGuardar.id_especialidad_1}
                                label="Especialidad"
                                onChange={(e) => cambiarCampo("id_especialidad_1", e.target.value)}
                            >
                                {specialties.map((specialty) => (
                                    <MenuItem key={specialty.id} value={specialty.id}>
                                        {specialty.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <br />
                <Grid item xs={12}>
                    <TextField
                        id="RRSS1" label="RRSS1" variant="outlined" fullWidth required
                        value={doctorGuardar.RRSS1} onChange={(e) => cambiarCampo("RRSS1", e.target.value)}
                        helperText="Opcional"
                    />
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Fragment>
    );

    const cardDireccionVet = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega tu dirección</Typography>
                    <Typography sx={styles.stepText}>4 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="busca-direccion"
                            label="Busca tu dirección"
                            helperText="Tu dirección no es visible para otros doctors"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item>
                        <Button variant="outlined" startIcon={<LocationOnIcon />} sx={{ fontWeight: 'bold' }}>Usar ubicación actual</Button>
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
                            <GroupIcon sx={{ mr: 1 }} />Centros y veterinarios cerca de ti
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
        </Fragment>
    );

    const cardDireccionManualTutor = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Agrega tu dirección</Typography>
                    <Typography sx={styles.stepText}>4 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Grid container spacing={2} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                        <TextField
                            id="calle" label="Calle" variant="outlined" fullWidth required
                            value={doctorGuardar.direccion} onChange={(e) => cambiarCampo("direccion", e.target.value)}
                            error={!!errors.direccion} helperText={errors.direccion}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="numero" label="Número" variant="outlined" fullWidth required
                            value={doctorGuardar.numero} onChange={(e) => cambiarCampo("numero", e.target.value)}
                            error={!!errors.numero} helperText={errors.numero}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="busca-direccion" label="Departamento/Block" variant="outlined" fullWidth required
                            value={doctorGuardar.tipo} onChange={(e) => cambiarCampo("tipo", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="comuna" label="Comuna" variant="outlined" fullWidth required
                            value={doctorGuardar.comuna} onChange={(e) => cambiarCampo("comuna", e.target.value)}
                            error={!!errors.comuna} helperText={errors.comuna}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            id="ciudad" label="Ciudad" variant="outlined" fullWidth required
                            value={doctorGuardar.ciudad} onChange={(e) => cambiarCampo("ciudad", e.target.value)}
                            error={!!errors.ciudad} helperText={errors.ciudad}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="codigo-postal" label="Código postal" variant="outlined" fullWidth
                            value={doctorGuardar.id_codigo_postal} onChange={(e) => cambiarCampo("id_codigo_postal", e.target.value)}
                            helperText="Opcional"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} onClick={handleManualBack} fullWidth>Atrás</Button>
                <Button variant="contained" sx={styles.button} onClick={handleManualFinish} fullWidth>Guardar Información</Button>
            </CardActions>
        </Fragment>
    );

    const cardFinalizacion = (
        <Fragment>
            <CardHeader
                action={
                    <Tooltip title="cerrar" placement="top-end">
                        <IconButton aria-label="cerrar" onClick={() => navigate('/doctor')}><CloseIcon /></IconButton>
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
                <Button variant="contained" sx={styles.button} fullWidth onClick={() => navigate('/doctor')}>Ir al sitio web</Button>
            </CardActions>
        </Fragment>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return cardDatosTutor;
            case 2:
                return cardDatosVet;
            case 3:
                return cardDireccionVet;
            case 4:
                return cardFinalizacion;
            case 103:
                return cardDireccionManualTutor;
            default:
                return cardDatosTutor;
        }
    };

    return (
        <>
            <NavbarComponent />
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    <Card sx={styles.card}>
                        {renderStep()}
                    </Card>
                </div>
            </ThemeProvider>
        </>
    )
};
