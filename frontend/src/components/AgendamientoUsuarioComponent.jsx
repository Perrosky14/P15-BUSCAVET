import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, IconButton, List, ListItem, ListItemText, InputLabel, MenuItem, Radio, RadioGroup,
    Select, TextField, Tooltip, Typography, CardMedia, CircularProgress, Grid, FormControl, Box, CardActionArea,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider, DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';
import { es } from 'date-fns/locale';
import Navbar2Component from "./Navbar2Component";
import theme from "./styles/themeComponent";
import UsuarioService from "../services/UsuarioService";
import DoctorService from "../services/DoctorService";
import BloqueHoraService from '../services/BloqueHoraService';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';


const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh', backgroundColor: '#FBFBFB' },
    card: { width: '90%', maxWidth: 600, padding: 20, textAlign: 'left', margin: 'auto', borderRadius: '16px' },
    cardContent: { padding: '20px' },
    card2: { width: '90%', maxWidth: 1000, padding: 20, textAlign: 'left', margin: 'auto', borderRadius: '16px' },
    cardContent2: { padding: '20px' },
    button: { width: '100%', height: '50px', borderRadius: '16px' },
    contador: { color: '#6BC62D', marginLeft: '10px', fontSize: '0.8em', fontWeight: 'bold' },
    formElement: { marginBottom: 20, width: '100%' },
    radioGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 0 }
};
const CardStyled = styled(Card)({
    maxWidth: 300,
    margin: '0 auto',
    '&:hover': {
        backgroundColor: '#FF4081', // Fondo rosado al pasar el mouse
        '& .MuiCardContent-root': {
            color: '#fff', // Texto blanco al pasar el mouse
        },
        '& .MuiTypography-root': {
            color: '#fff', // Texto blanco al pasar el mouse
        },
    },
});

const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];

const items = [
    {
        title: 'Atención veterinaria general',
        imageUrl: 'https://img.freepik.com/vector-premium/propietario-mascota-visitando-medico-veterinario-revisando-medicina-salud-perro-examen-atencion-salud-animal-centro-medico-veterinario-ilustracion-vectorial-horizontal_48369-47178.jpg',
        targetCard: 2,
    },
    {
        title: 'Atención veterinaria especialista',
        imageUrl: 'https://us.123rf.com/450wm/senryu/senryu2104/senryu210400067/167190077-es-una-ilustraci%C3%B3n-del-anuncio-de-un-m%C3%A9dico-veterinario.jpg?ver=6',
        targetCard: 5,
    },
    {
        title: 'Anular hora de atención tomada',
        imageUrl: 'https://us.123rf.com/450wm/tynyuk/tynyuk2112/tynyuk211200003/179146083-veterinarios-con-mascotas-hombre-y-mujer-trabajadores-de-la-cl%C3%ADnica-veterinaria-con-un-gato-y-un.jpg?ver=6',
        targetCard: 8,
    }];

const specialties = [
    { id: 1, name: 'General' },
    { id: 2, name: 'Traumatologia' },
    { id: 3, name: 'Ecografia' },
    { id: 4, name: 'Cirugia' },
];

const AgendamientoUsuarioComponent = () => {
    const [doctores, setDoctores] = useState([]);
    const [mascotas, setMascotas] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedMascota, setSelectedMascota] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [currentCard, setCurrentCard] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [date, setDate] = useState(selectedDate || new Date());
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    const [horaData, setHoraData] = useState({
        idBloqueHora: null,
        idUsuario: null,
        idMascota: null,
        motivo: '',
        doctor: "",
    });

    
    const handleSave = () => {
        if (validateStep1()) {
            console.log('Datos de la hora:', horaData);

            const sanitizedHoraData = {
                idBloqueHora: horaData.idBloqueHora || 0,
                idUsuario: horaData.idUsuario || 0,
                idMascota: horaData.idMascota || 0,
                motivo: horaData.motivo
            };

            BloqueHoraService.agendarBloqueHora(sanitizedHoraData.idBloqueHora, sanitizedHoraData.idUsuario, sanitizedHoraData.idMascota, sanitizedHoraData.motivo)
                .then(response => {
                    console.log('Hora general registrada:', response.data);
                    setCurrentCard(4);  // Cambia a la tarjeta 4 después de guardar los datos
                })
                .catch(error => {
                    console.error('Error al registrar la hora general:', error.response ? error.response.data : error.message);
                });
        }
        if (validateStep2()) {
            console.log('Datos de la hora:', horaData);
            // Elimina cualquier propiedad que no se necesita o que puede ser nula
            const sanitizedHoraData = {
                idBloqueHora: horaData.idBloqueHora || 0,
                idUsuario: horaData.idUsuario || 0,
                idMascota: horaData.idMascota || 0,
                motivo: horaData.motivo
            };

            BloqueHoraService.agendarBloqueHora(sanitizedHoraData.idBloqueHora, sanitizedHoraData.idUsuario, sanitizedHoraData.idMascota, sanitizedHoraData.motivo)
                .then(response => {
                    console.log('Hora con especialista registrada:', response.data);
                    setCurrentCard(7);  // Cambia a la tarjeta 7 de guardar los datos
                })
                .catch(error => {
                    console.error('Error al registrar la hora con el especialista:', error.response ? error.response.data : error.message);
                });

        }
    }

    // Donde el id = 1 hace referencia a la especialidad "general"
    const filteredDoctors = doctores.filter(doctor =>
        doctor.id_especialidad_1 === 1 || doctor.id_especialidad_2 === 1 || doctor.id_especialidad_3 === 1
    );
    const handleSpecialtyChange = (event) => {
        setSelectedSpecialty(event.target.value);
        setSelectedDoctor('');
    };
    // Donde se puede seleccionar cualquier medico, pero es ideal para los especialistas
    const filteredDoctors2 = doctores.filter(doctor =>
        doctor.id_especialidad_1 === selectedSpecialty ||
        doctor.id_especialidad_2 === selectedSpecialty ||
        doctor.id_especialidad_3 === selectedSpecialty
    );

    const location = useLocation();
    const { user } = location.state || {};

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await UsuarioService.getMascotas(user.id);
                console.log('Mascotas:', response.data);
                setMascotas(response.data);
            } catch (error) {
                console.error('Error al obtener las mascotas:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDoctores = async () => {
            try {
                const response = await DoctorService.getDoctores();
                console.log('Doctores:', response.data);
                setDoctores(response.data);
            } catch (error) {
                console.error('Error al obtener los doctores:', error);
            }
        };

        if (user) {
            fetchMascotas();
            fetchDoctores();
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        const now = new Date();
        const isToday = format(date, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');

        const times = availableTimes.filter((time) => {
            if (!isToday) return true;
            const [hours, minutes] = time.split(':').map(Number);
            const timeDate = new Date(date);
            timeDate.setHours(hours, minutes, 0, 0);
            return timeDate > now;
        });

        setFilteredTimes(times);
    }, [date, availableTimes]);

    const handleBack = () => {
        if (selectedOption === 'general' && currentCard > 2) {
            setCurrentCard((prevCard) => prevCard - 1);
        } else if (selectedOption === 'especialista' && currentCard > 5) {
            setCurrentCard((prevCard) => prevCard - 1);
        } else if (selectedOption === 'anular' && currentCard > 8) {
            setCurrentCard((prevCard) => prevCard - 1);
        } else {
            setCurrentCard(1);
            setSelectedOption(null);
        }
    };

    const handleClose = () => navigate('/usuario');

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleOptionSelect = (option, targetCard) => {
        setSelectedOption(option);
        setCurrentCard(targetCard);
    };


    const validateStep1 = () => {
        let newErrors = {};
        if (!horaData.doctor) newErrors.doctor = 'El doctor es requerido';
        if (!horaData.idMascota) newErrors.idMascota = 'La mascota es requerida';
        if (!horaData.motivo) newErrors.motivo = 'El motivo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const validateStep2 = () => {
        let newErrors = {};
        if (!selectedSpecialty) newErrors.selectedSpecialty = 'La especialidad del veterinario es requerida';
        if (!horaData.doctor) newErrors.doctor = 'El doctor es requerido';
        if (!horaData.idMascota) newErrors.idMascota = 'La mascota es requerida';
        if (!horaData.motivo) newErrors.motivo = 'El motivo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        if (selectedOption === 'general') {
            if (currentCard === 5) {
                // Lógica para finalizar o continuar desde la card 4
            } else {
                if (currentCard === 2 && validateStep1()) {
                    setCurrentCard(3);
                } else if (currentCard === 3) {
                    setCurrentCard((prevCard) => prevCard + 1);
                }
            }
        } else if (selectedOption === 'especialista') {
            if (currentCard === 8) {
                // Lógica para finalizar o continuar desde la card 7
            } else {
                if (currentCard === 5 && validateStep2()) {
                    setCurrentCard(6);
                } else if (currentCard === 6) {
                    setCurrentCard((prevCard) => prevCard + 1);
                }
            }
        } else if (selectedOption === 'anular') {
            if (currentCard === 9) {
                // Lógica para finalizar o continuar desde la card 9
            } else {
                setCurrentCard((prevCard) => prevCard + 1);
            }
        }
    };
    const renderCardContent = () => {
        switch (currentCard) {
            case 1:
                return (
                    <Card style={styles.card2}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            title={<Typography variant="h6" component="div">Agendamiento de hora veterinaria</Typography>}
                            subheader="Selecciona la opcion para agendar tu cita a la veterinaria"
                            style={{ textAlign: 'left' }}
                        />
                        <Box sx={{ backgroundColor: '#fff1', minHeight: '50vh', padding: '20px' }}>
                            <Typography variant="h4" align="center" color="white" gutterBottom />
                            <Grid container spacing={3} justifyContent="center">
                                {items.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <CardStyled>
                                            <CardActionArea onClick={() => handleOptionSelect(index === 0 ? 'general' : index === 1 ? 'especialista' : 'anular', item.targetCard)}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: '200px',
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center',
                                                        backgroundImage: `url(${item.imageUrl})`,
                                                    }}
                                                />
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {item.title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </CardStyled>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
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
                                <Typography variant="h6" component="div">Selecciona el medico y la mascota
                                    <span style={styles.contador}>1 de 2</span>
                                </Typography>
                            }
                            subheader="Seleccione el medico con quien le gustaria atenderse"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona un medico</Typography>
                                    <Select
                                        value={horaData.doctor}
                                        onChange={(e) => setHoraData({ ...horaData, doctor: e.target.value })}
                                        fullWidth
                                    >
                                        {doctores.length === 0 ? (
                                            <MenuItem disabled>No hay doctores disponibles</MenuItem>
                                        ) : (
                                            filteredDoctors.length === 0 ? (
                                                <MenuItem disabled>No hay doctores con la especialidad requerida</MenuItem>
                                            ) : (
                                                filteredDoctors.map(doctor => (
                                                    <MenuItem key={doctor.id} value={doctor.id}>
                                                        {doctor.nombre1} {doctor.apellido1} {doctor.apellido2}
                                                    </MenuItem>
                                                ))
                                            )
                                        )}
                                    </Select>
                                    {errors.doctor && <Typography color="error">{errors.doctor}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona una mascota</Typography>
                                    <Select
                                        value={horaData.idMascota}
                                        onChange={(e) => setHoraData({ ...horaData, idMascota: e.target.value })}
                                        fullWidth
                                    >
                                        {mascotas.map(mascota => (
                                            <MenuItem key={mascota.id} value={mascota.id}>
                                                {mascota.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.idMascota && <Typography color="error">{errors.idMascota}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Describe el motivo de la consulta</Typography>
                                    <TextField
                                        name="motivo"
                                        label="Descripción"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        value={horaData.motivo}
                                        onChange={(e) => setHoraData({ ...horaData, motivo: e.target.value })}
                                        required
                                        error={!!errors.motivo} helperText={errors.motivo}
                                    />
                                </Grid>
                            </Grid>
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
                                <Typography variant="h6" component="div">
                                    Fecha y Hora de atención
                                    <span style={styles.contador}>2 de 2</span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                            <Grid container spacing={2} sx={{ padding: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        label="Seleccione una fecha"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                            handleDateChange(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                        inputFormat="dd/MM/yyyy"
                                        minDate={new Date()} 
                                        componentsProps={{
                                            actionBar: { actions: [] } 
                                        }}
                                        
                                        sx={{
                                            '.MuiPickersBasePicker-container': {
                                                width: '100%',
                                                minHeight: '300px'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {selectedDate && (
                                        <List>
                                            {doctores.map((bloqueHora) => (
                                                <ListItem key={bloqueHora} button onClick={() => handleTimeSelect(bloqueHora)}>
                                                    <ListItemText primary={bloqueHora} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -1 }}>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                                </Grid>
                                {selectedTime && (
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="primary" onClick={handleSave} sx={styles.button}>
                                            Agendar cita a las: {selectedTime}
                                        </Button>
                                    </Grid>
                                )}
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
                            title={<Typography variant="h6" component="div">Confirmación</Typography>}
                            subheader="Confirmación de la cita agendada"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent>
                            <Typography variant="h6">La hora se ha agendado exitosamente.</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -1 }}>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={handleClose} sx={styles.button}>Cerrar</Button>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                );

            case 5:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">Selecciona el medico y la mascota
                                    <span style={styles.contador}>1 de 2</span>
                                </Typography>
                            }
                            subheader="Seleccione el medico con quien le gustaria atenderse"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona la especialidad del medico</Typography>
                                    <Select
                                        value={selectedSpecialty}
                                        onChange={handleSpecialtyChange}
                                        fullWidth
                                    >
                                        {specialties.map(specialty => (
                                            <MenuItem key={specialty.id} value={specialty.id}>
                                                {specialty.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.selectedSpecialty && <Typography color="error">{errors.selectedSpecialty}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona un medico</Typography>
                                    <Select
                                        value={horaData.doctor}
                                        onChange={(e) => setHoraData({ ...horaData, doctor: e.target.value })}
                                        fullWidth
                                    >
                                        {doctores.length === 0 ? (
                                            <MenuItem disabled>No hay doctores disponibles</MenuItem>
                                        ) : (
                                            filteredDoctors2.length === 0 ? (
                                                <MenuItem disabled>No hay doctores con la especialidad requerida</MenuItem>
                                            ) : (
                                                filteredDoctors2.map(doctor => (
                                                    <MenuItem key={doctor.id} value={doctor.id}>
                                                        {doctor.nombre1} {doctor.apellido1} {doctor.apellido2}
                                                    </MenuItem>
                                                ))
                                            )
                                        )}
                                    </Select>
                                    {errors.doctor && <Typography color="error">{errors.doctor}</Typography>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona una mascota</Typography>
                                    <Select
                                        value={horaData.idMascota}
                                        onChange={(e) => setHoraData({ ...horaData, idMascota: e.target.value })}
                                        fullWidth
                                    >
                                        {mascotas.map(mascota => (
                                            <MenuItem key={mascota.id} value={mascota.id}>
                                                {mascota.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.idMascota && <Typography color="error">{errors.idMascota}</Typography>}
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6">Describe el motivo de la consulta</Typography>
                                    <TextField
                                        name="motivo"
                                        label="Descripción"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        fullWidth
                                        value={horaData.motivo}
                                        onChange={(e) => setHoraData({ ...horaData, motivo: e.target.value })}
                                        required
                                        error={!!errors.motivo} helperText={errors.motivo}
                                    />
                                </Grid>
                            </Grid>
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

            case 6:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">
                                    Fecha y Hora de atención
                                    <span style={styles.contador}>2 de 2</span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                            <Grid container spacing={2} sx={{ padding: 2 }}>
                                <Grid item xs={12} sm={6}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        label="Seleccione una fecha"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                            handleDateChange(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                        inputFormat="dd/MM/yyyy"
                                        minDate={new Date()} // Disables past dates
                                        componentsProps={{
                                            actionBar: { actions: [] } // Hide the actions (cancel/accept buttons)
                                        }}
                                        // Custom style for the calendar
                                        sx={{
                                            '.MuiPickersBasePicker-container': {
                                                width: '100%', // You can adjust this as needed
                                                minHeight: '300px' // Adjust the height as needed
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {selectedDate && (
                                        <List>
                                            {filteredTimes.map((time) => (
                                                <ListItem key={time} button onClick={() => handleTimeSelect(time)}>
                                                    <ListItemText primary={time} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    )}
                                </Grid>
                            </Grid>
                        </LocalizationProvider>
                        <CardActions disableSpacing>
                            <Grid container spacing={2} sx={{ mt: -1 }}>
                                <Grid item xs={6}>
                                    <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                                </Grid>
                                {selectedTime && (
                                    <Grid item xs={6}>
                                        <Button variant="contained" color="primary" onClick={handleSave} sx={styles.button}>
                                            Agendar cita a las: {selectedTime}
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </CardActions>
                    </Card>
                );
            case 7:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={<Typography variant="h6" component="div">Hora agendada! </Typography>}
                            style={{ textAlign: 'left' }}
                        />
                        <CardMedia
                            component="img"
                            height="350" // Altura de la imagen
                            image="/images_app/doctora_1.png" // Ruta de tu imagen
                            alt="Imagen de la mascota" // Descripción de la imagen
                        />
                        <CardContent style={styles.cardContent}>
                            <Typography variant="body1">Se ha agendado su hora exitosamente.</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" sx={styles.button} onClick={() => navigate('/mis_horas')}>
                                Ver mis horas agendadas
                            </Button>
                        </CardActions>
                    </Card>
                );
            case 8:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={
                                <Typography variant="h6" component="div">Anulación de Hora
                                    <span style={styles.contador}></span>
                                </Typography>
                            }
                            subheader="Complete el formulario para continuar"
                            style={{ textAlign: 'left' }}
                        />
                        {/* Aquí puedes añadir la lógica para la anulación de citas */}
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

            case 9:
                return (
                    <Card style={styles.card}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}><CloseIcon /></IconButton>
                                </Tooltip>
                            }
                            title={<Typography variant="h6" component="div">Hora Anulada </Typography>}
                            style={{ textAlign: 'left' }}
                        />
                        <CardMedia
                            component="img"
                            height="350" // Altura de la imagen
                            image="/images_app/doctora_1.png" // Ruta de tu imagen
                            alt="Imagen de la mascota" // Descripción de la imagen
                        />
                        <CardContent style={styles.cardContent}>
                            <Typography variant="body1">Se ha anulado su hora agendada exitosamente.</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" sx={styles.button} onClick={() => navigate('/mis_horas')}>
                                Ver mis horas agendadas
                            </Button>
                        </CardActions>
                    </Card>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <CircularProgress />
            </div>
        );
    }

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
};

export default AgendamientoUsuarioComponent;