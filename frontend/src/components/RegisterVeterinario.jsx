import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import theme from "./styles/themeComponent";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import { Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import axios from 'axios';
import { InputLabel, Select, MenuItem } from '@mui/material';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Ocupa toda la altura de la pantalla
    },

    card: {
        width: '80%', // El Box ocupa el 80% del ancho de la pantalla
        maxWidth: 502, // Máximo ancho del Box
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

export default function RegisterVeterinario() {
    const navigate = useNavigate();
    const [specialty, setSpecialty] = useState('');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        genero: '',
        numeroCelular: '',
        calle: '',
        numero: '',
        departamento: '',
        comuna: '',
        ciudad: '',
        codigoPostal: ''
      });

    const handleRegister = () => {
        navigate('/registro');
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleNext = () => {
        setStep(step + 1);
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
    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:8080/doctor/nuevo-doctor', formData);
          console.log(response.data);
          navigate('/registro-exitoso');
        } catch (error) {
          console.error('Error al guardar la información:', error.response?.data || error.message);
        }
    };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        setSpecialty(event.target.value);
    }; 
    

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
                <div style={styles.header}>
                    <TextField id="primer-nombre" label="Primer nombre" variant="outlined"/>
                    <br/>
                    <TextField id="segundo-nombre" label="Segundo nombre" variant="outlined"/>
                </div>
                <div style={styles.header}>
                    <TextField id="primer-apellido" label="Primer apellido" variant="outlined"/>
                    <br/>
                    <TextField id="segundo-apellido" label="Segundo apellido" variant="outlined"/>
                </div>
                <div style={styles.header}>
                    <Typography textAlign="left">Genero:</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Mujer" control={<Radio />} label="Mujer"/>
                            <FormControlLabel value="Hombre" control={<Radio />} label="Hombre"/>
                            <FormControlLabel value="Otro" control={<Radio />} label="Otro"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <TextField id="numero-celular" label="Número celular" fullWidth variant="outlined"/>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleRegister} fullWidth>Atrás</Button>
                <Button variant="contained" onClick={handleNext} fullWidth>Siguiente</Button>
            </CardActions>
        </Fragment>
    );

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
                <div style={styles.header}>
                    <TextField id="nombre-institucion" label="Nombre Institución" fullWidth variant="outlined"/>
                </div>
                <br/>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Typography textAlign="left" style={{ marginRight: 20 }}>Especialidad:</Typography>
                    <FormControl fullWidth>
                        <InputLabel id="specialty-label">Especialidad</InputLabel>
                        <Select
                            labelId="specialty-label"
                            id="specialty-select"
                            value={specialty}
                            label="Especialidad"
                            onChange={handleChange}
                            style={{ width: '100%' }} 
                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Dermatología">Dermatología</MenuItem>
                            <MenuItem value="Odontología">Odontología</MenuItem>
                            <MenuItem value="Cardiología">Cardiología</MenuItem>
                            <MenuItem value="Neurología">Neurología</MenuItem>
                            <MenuItem value="Ortopedia">Ortopedia</MenuItem>
                            <MenuItem value="Oftalmología">Oftalmología</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br/>
                <TextField id="social-media" label="URL de Red Social" fullWidth variant="outlined"/>
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
                    <Typography sx={styles.stepText}>4 de 4</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <TextField sx={{ marginTop: 3 }}
                    id="busca-direccion"
                    label="Busca tu dirección"
                    helperText="Tu dirección no es visible para otros usuarios"
                    fullWidth
                />
                <div>
                    <Button variant="outlined">Usar ubicación actual</Button>
                    <Button variant="outlined" onClick={handleManualNext}>Agregar manualmente</Button>
                </div>
                <Typography textAlign="left" sx={{ fontWeight: 'bold', marginTop: 15 }}>Compartir tu dirección muestra:</Typography>
                <Typography variant="subtitle2" align="left">Centros y veterinarios cerca de ti</Typography>
                <Typography variant="subtitle2" align="left">Distancia y tiempo de recorrido estimado</Typography>
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
                <TextField id="calle" label="Calle" variant="outlined" sx={{ marginTop: 3 }} fullWidth/>
                <div style={styles.header}>
                    <TextField id="numero" label="Número" variant="outlined"/>
                    <TextField sx={{ marginTop: 3 }}
                        id="busca-direccion"
                        label="Departamento/Block"
                        helperText="Opcional"
                    />
                </div>
                <TextField id="comuna" label="Comuna" variant="outlined" fullWidth/>
                <div style={styles.header}>
                    <TextField id="ciudad" label="Ciudad" variant="outlined"/>
                    <TextField id="codigo-postal" label="Código postal" variant="outlined"/>
                </div>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleManualBack} fullWidth>Atrás</Button>
                <Button variant="contained" onClick={() => handleSubmit(formData)} fullWidth>Guardar Información</Button>
            </CardActions>
        </Fragment>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return cardDatosTutor;
            case 2:
                return cardDatosVet ;
            case 3:
                return cardDireccionTutor;
            case 102:
                return cardDireccionManualTutor;
            
        }
    };

    return (
    <>
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