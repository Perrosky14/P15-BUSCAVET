import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup,
    Select, TextField, Tooltip, Typography, CardMedia,
    Grid, FormControl
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { es } from 'date-fns/locale';
import Navbar2Component from "./Navbar2Component";
import theme from "./styles/themeComponent";

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', backgroundColor: '#FBFBFB' },
    card: { width: '90%', maxWidth: 400, padding: 20, textAlign: 'left', margin: 'auto', borderRadius: '16px' },
    cardContent: { padding: '20px' },
    button: { width: '100%', height: '50px', borderRadius: '16px' },
    contador: { color: '#6BC62D', marginLeft: '10px', fontSize: '0.8em', fontWeight: 'bold' },
    formElement: { marginBottom: 20, width: '100%' },
    radioGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 0 }
};

export default function RegistarMascotaComponent() {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(1);
    const [mascotaData, setMascotaData] = useState({
        especie: '', raza: '', sexo: '', nombre: '', fechaNacimiento: null, historialMedico: null,
        estatura: '', color: '', peso: '', foto: null, tipoExotico: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMascotaData({ ...mascotaData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date) => {
        setMascotaData({ ...mascotaData, fechaNacimiento: date });
        setErrors({ ...errors, fechaNacimiento: '' });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setMascotaData({ ...mascotaData, [name]: files[0] });
    };

    const validateStep1 = () => {
        let newErrors = {};
        if (!mascotaData.especie) newErrors.especie = 'Especie es requerida';
        if (mascotaData.especie === 'exotico' && !mascotaData.tipoExotico) newErrors.tipoExotico = 'Tipo de mascota exótica es requerido';
        if (!mascotaData.raza) newErrors.raza = 'Raza es requerida';
        if (!mascotaData.color) newErrors.color = 'Color es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        let newErrors = {};
        if (!mascotaData.nombre) newErrors.nombre = 'Nombre es requerido';
        if (!mascotaData.sexo) newErrors.sexo = 'Sexo es requerido';
        if (!mascotaData.fechaNacimiento) newErrors.fechaNacimiento = 'Fecha de nacimiento es requerida';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (currentCard === 1 && validateStep1()) {
            setCurrentCard(2);
        } else if (currentCard === 2 && validateStep2()) {
            setCurrentCard(3);
        }
    };

    const handleBack = () => setCurrentCard(prevCard => prevCard - 1);
    const handleClose = () => navigate('/');
    const handleSave = () => {
        if (validateStep1() && validateStep2()) {
            console.log('Datos de la mascota:', mascotaData);
            setCurrentCard(4);  // Cambia a la tarjeta 4 después de guardar los datos
        }
    };

    const renderCardContent = () => {
        switch (currentCard) {
            case 1:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">Perfil de la mascota
                                    <span style={styles.contador}>1 de 3</span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent style={styles.cardContent}>
                            <Typography variant="subtitle2" style={{ marginBottom: '8px' }}>¿Qué tipo de mascota es?</Typography>
                            <RadioGroup
                                aria-labelledby="especie-label" name="especie" style={styles.radioGroup}
                                onChange={handleInputChange} value={mascotaData.especie}
                            >
                                <FormControlLabel value="canino" control={<Radio />} label="Canino" />
                                <FormControlLabel value="felino" control={<Radio />} label="Felino" />
                                <FormControlLabel value="exotico" control={<Radio />} label="Exótico" />
                            </RadioGroup>
                            {errors.especie && <Typography color="error">{errors.especie}</Typography>}
                            {mascotaData.especie === "exotico" && (


                                <Grid container spacing={2} sx={{ mt:-2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Tipo de mascota exótica" fullWidth margin="normal" size="small"
                                            name="tipoExotico" value={mascotaData.tipoExotico} onChange={handleInputChange}
                                            error={!!errors.tipoExotico} helperText={errors.tipoExotico}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            <TextField
                                label="Raza" fullWidth margin="normal" name="raza" value={mascotaData.raza}
                                onChange={handleInputChange} style={styles.formElement} size="small" required
                                error={!!errors.raza} helperText={errors.raza}
                            />
                            <TextField
                                label="Color" fullWidth margin="normal" name="color" value={mascotaData.color}
                                onChange={handleInputChange} style={styles.formElement} size="small" required
                                error={!!errors.color} helperText={errors.color}
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -5 }}>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleContinue} sx={styles.button}>Continuar</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                );
            case 2:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">Información personal
                                    <span style={styles.contador}>2 de 3</span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent style={styles.cardContent}>
                            <TextField
                                label="Nombre de la mascota" fullWidth margin="normal" size="small"
                                name="nombre" value={mascotaData.nombre} onChange={handleInputChange}
                                style={styles.formElement} required
                                error={!!errors.nombre} helperText={errors.nombre}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="sexo-label" size="small" style={styles.formElement}>Sexo</InputLabel>
                                <Select
                                    labelId="sexo-label" id="sexo-select" size="small" fullWidth
                                    name="sexo" value={mascotaData.sexo} onChange={handleInputChange}
                                    style={styles.formElement} required
                                    error={!!errors.sexo}
                                >
                                    <MenuItem value={"macho"}>Macho</MenuItem>
                                    <MenuItem value={"hembra"}>Hembra</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.sexo && <Typography color="error">{errors.sexo}</Typography>}
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                                <DatePicker label="Fecha de nacimiento" value={mascotaData.fechaNacimiento} onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} fullWidth size="small" required />}
                                    style={styles.formElement}
                                    inputFormat="dd/MM/yyyy"
                                    disableFuture
                                />
                            </LocalizationProvider>
                            {errors.fechaNacimiento && <Typography color="error">{errors.fechaNacimiento}</Typography>}
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -1 }}>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleContinue} sx={styles.button}>Continuar</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                );
            case 3:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">Información adicional
                                    <span style={styles.contador}>3 de 3</span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent style={styles.cardContent}>
                            <Typography variant="body1">Datos opcionales extra:</Typography>
                            <TextField
                                label="Estatura (cm)" size="small" fullWidth margin="normal"
                                name="estatura" value={mascotaData.estatura} onChange={handleInputChange}
                                style={styles.formElement} placeholder="Opcional"
                                inputProps={{ inputMode: 'numeric', pattern: "^[0-9]*\\.?[0-9]+$", title: "Ingrese solo números positivos y decimales." }}
                            />
                            <TextField
                                label="Peso (kg)" size="small" fullWidth margin="normal"
                                name="peso" value={mascotaData.peso} onChange={handleInputChange}
                                style={styles.formElement} placeholder="Opcional"
                                inputProps={{ inputMode: 'numeric', pattern: "^[0-9]*\\.?[0-9]+$", title: "Ingrese solo números positivos y decimales." }}
                            />
                            <InputLabel style={styles.formElement}>Foto de la mascota (opcional)</InputLabel>
                            <input
                                accept="image/*" style={{ display: 'none' }} id="foto" name="foto" type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="foto" style={styles.formElement}>
                                <Button variant="contained" component="span" sx={styles.button}>
                                    Subir Foto
                                </Button>
                            </label>
                            {mascotaData.foto && <Typography variant="body2">Foto seleccionada: {mascotaData.foto.name}</Typography>}

                            <InputLabel style={styles.formElement}>Historial médico (PDF, opcional)</InputLabel>
                            <input
                                accept=".pdf" style={{ display: 'none' }} id="historial-medico" name="historialMedico" type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="historial-medico" style={styles.formElement}>
                                <Button variant="contained" component="span" sx={styles.button}>
                                    Subir Historial Médico
                                </Button>
                            </label>
                            {mascotaData.historialMedico && <Typography variant="body2">Archivo seleccionado: {mascotaData.historialMedico.name}</Typography>}
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -1 }}>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleSave} sx={styles.button}>Guardar</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                );
            case 4:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
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
                            <Typography variant="body1">Se ha guardado los datos de la mascota exitosamente.</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" sx={styles.button} onClick={() => navigate('/lista_mascota')}>
                                Ver lista de mascotas
                            </Button>
                        </CardActions>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar2Component />
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    {renderCardContent()}
                </div>
            </ThemeProvider>
        </>
    );
}