import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, IconButton, InputLabel, MenuItem, Radio, RadioGroup,
    Select, TextField, Tooltip, Typography
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { es } from 'date-fns/locale';
import NavbarComponent from "./NavbarComponent";
import theme from "./styles/themeComponent";

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', backgroundColor: '#FBFBFB' },
    card: { width: '90%', maxWidth: 400, padding: 20, textAlign: 'left', margin: 'auto', borderRadius: '16px' },
    cardContent: { padding: '20px' },
    button: { width: '100%', height: '50px', borderRadius: '16px' },
    contador: { color: '#6BC62D', marginLeft: '10px', fontSize: '0.8em', fontWeight: 'bold' },
    formElement: { marginBottom: 20, width: '80%' },
    radioGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 0 }
};

export default function FichaMascotaComponent() {
    const navigate = useNavigate();
    const [currentCard, setCurrentCard] = useState(1);
    const [mascotaData, setMascotaData] = useState({
        especie: '', raza: '', sexo: '', nombre: '', fechaNacimiento: null, historialMedico: null,
        estatura: '', color: '', peso: '', foto: null
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMascotaData({ ...mascotaData, [name]: value });
    };

    const handleDateChange = (date) => {
        setMascotaData({ ...mascotaData, fechaNacimiento: date });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setMascotaData({ ...mascotaData, [name]: files[0] });
    };

    const handleContinue = () => setCurrentCard(prevCard => prevCard + 1);
    const handleBack = () => setCurrentCard(prevCard => prevCard - 1);
    const handleClose = () => navigate('/');
    const handleSave = () => {
        console.log('Datos de la mascota:', mascotaData);
        alert('Mascota registrada');
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
                                <FormControlLabel value="canino" control={<Radio />} label="Canino"  />
                                <FormControlLabel value="felino" control={<Radio />} label="Felino" />
                                <FormControlLabel value="exotico" control={<Radio />} label="Exótico" />
                            </RadioGroup>
                            {mascotaData.especie === "exotico" && (
                                <TextField
                                    label="Tipo de mascota exótica" fullWidth margin="normal" size="small" 
                                    name="tipoExotico" value={mascotaData.tipoExotico} onChange={handleInputChange}
                                />
                            )}
                            <TextField
                                label="Raza" fullWidth margin="normal" name="raza" value={mascotaData.raza}
                                onChange={handleInputChange} style={styles.formElement} size="small" required
                            />
                            <TextField
                                label="Color" fullWidth margin="normal" name="color" value={mascotaData.color}
                                onChange={handleInputChange} style={styles.formElement} size="small" required
                            />
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" onClick={handleContinue} sx={styles.button}>Continuar</Button>
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
                            />
                            <InputLabel id="sexo-label" size="small" style={styles.formElement}>Sexo</InputLabel>
                            <Select
                                labelId="sexo-label" id="sexo-select" size="small" fullWidth
                                name="sexo" value={mascotaData.sexo} onChange={handleInputChange}
                                style={styles.formElement} required
                            >
                                <MenuItem value={"macho"}>Macho</MenuItem>
                                <MenuItem value={"hembra"}>Hembra</MenuItem>
                            </Select>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                                <DatePicker
                                    label="Fecha de nacimiento" inputFormat="dd/MM/yyyy" fullWidth
                                    value={mascotaData.fechaNacimiento} onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} margin="normal" size="small" style={styles.formElement} required />}
                                />
                            </LocalizationProvider>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                            <Button variant="contained" onClick={handleContinue} sx={styles.button}>Continuar</Button>
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
                                <Typography variant="h6" component="div">Información personal
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
                            />
                            <TextField
                                label="Peso (kg)" size="small" fullWidth margin="normal"
                                name="peso" value={mascotaData.peso} onChange={handleInputChange}
                                style={styles.formElement} placeholder="Opcional"
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
                            <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                            <Button variant="contained" onClick={handleSave} sx={styles.button}>Guardar</Button>
                        </CardActions>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <NavbarComponent />
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    {renderCardContent()}
                </div>
            </ThemeProvider>
        </>
    );
}