import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
    Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, IconButton, List, ListItem, ListItemText, InputLabel, MenuItem, Radio, RadioGroup,
    Select, TextField, Tooltip, Typography, CardMedia, CircularProgress, Grid, FormControl, Box, CardActionArea,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { DatePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
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
    radioGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 0 },
    noHoursMessage: {marginTop: '20px', textAlign: 'center', color: 'gray',},
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
    const [bloquesHora, setBloquesHora] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [currentCard, setCurrentCard] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [date, setDate] = useState(selectedDate || new Date());
    const [filteredTimes, setFilteredTimes] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const location = useLocation();
    const [scheduledHours, setScheduledHours] = useState([]);
    const [selectedHourToCancel, setSelectedHourToCancel] = useState('');
    const { user } = location.state || {};

    const obtenerBloquesHoraPorFecha = (fecha) => {
        const fechaActual = new Date();
        const esHoy = format(fechaActual, 'yyyy-MM-dd') === fecha;

        if (Array.isArray(bloquesHora)) {
            return bloquesHora
                .filter(bloque => {
                    if (bloque.fecha !== fecha) return false;
                    if (esHoy) {
                        const horaInicio = new Date(`${fecha}T${bloque.horaInicio}`);
                        return horaInicio >= fechaActual;
                    }
                    return true;
                })
                .sort((a, b) => {
                    const horaInicioA = new Date(`${fecha}T${a.horaInicio}`);
                    const horaInicioB = new Date(`${fecha}T${b.horaInicio}`);
                    return horaInicioA - horaInicioB;
                });
        } else {
            console.error("bloquesHora no es un arreglo");
            return [];
        }
    };

    const handleHoraSelect = (bloque) => {
        console.log("horaBloqueSeleccionada: ",bloque.id);
        setSelectedTime(bloque);
    };

    const handleSeleccionFecha = (fecha) => {
        setFechaSeleccionada(fecha);
        const fechaStr = format(fecha, 'yyyy-MM-dd');
        const bloquesFiltrados = obtenerBloquesHoraPorFecha(fechaStr);
        setFilteredTimes(bloquesFiltrados);
        setSelectedTime(null);
    };

    const handleSave = () => {
        if (selectedTime) {
            setHoraData(prevData => {
                const newHoraData = {
                    ...prevData,
                    idBloqueHora: selectedTime.id
                };
                if (validateStep1() || validateStep2()) {
                    const sanitizedHoraData = {
                        idBloqueHora: newHoraData.idBloqueHora,
                        idUsuario: newHoraData.idUsuario,
                        idMascota: newHoraData.idMascota,
                        motivo: newHoraData.motivo
                    };
    
                    BloqueHoraService.agendarBloqueHora(sanitizedHoraData.idBloqueHora, sanitizedHoraData.idUsuario, sanitizedHoraData.idMascota, sanitizedHoraData.motivo)
                        .then(response => {
                            console.log('Hora general registrada:', response.data);
                            setCurrentCard(4); 
                        })
                        .catch(error => {
                            console.error('Error al registrar la hora general:', error.response ? error.response.data : error.message);
                        });
                }
                return newHoraData;
            });
        }
    };

    const filteredDoctors = doctores.filter(doctor =>
        doctor.id_especialidad_1 === 1 || doctor.id_especialidad_2 === 1 || doctor.id_especialidad_3 === 1
    );
    const handleSpecialtyChange = (event) => {
        setSelectedSpecialty(event.target.value);
        setSelectedDoctor('');
    };

    const filteredDoctors2 = doctores.filter(doctor =>
        doctor.id_especialidad_1 === selectedSpecialty ||
        doctor.id_especialidad_2 === selectedSpecialty ||
        doctor.id_especialidad_3 === selectedSpecialty
    );

    const handleBLoquesHora = async () => {
        try {
            const idVeterinario = horaData.idVeterinario;
            if (!idVeterinario) {
                console.error('idVeterinario no está definido');
                return;
            }
            const bloquesHoraDoctor = await BloqueHoraService.obtenerBloquesHoraPorVeterinario(idVeterinario);
            setBloquesHora(bloquesHoraDoctor.data);
            console.log('Bloques de hora obtenidos del doctor:', bloquesHoraDoctor.data);
        } catch (error) {
            console.error('Error al obtener los bloques de hora:', error);
        }
    };

    const [horaData, setHoraData] = useState({
        idBloqueHora: null,
        idUsuario: user.id,
        idMascota: null,
        motivo: '',
        idVeterinario: "",
    });

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

        const fetchScheduledHours = async () => {
            try {
                const response = await BloqueHoraService.obtenerBloquesHoraPorUsuario(user.id);
                setScheduledHours(response.data);
            } catch (error) {
                console.error('Error al obtener las horas agendadas:', error);
            } finally {
                setLoading(false);
            }
        };

        

        if (user) {
            setLoading(true);
            fetchMascotas();
            fetchDoctores();
            fetchScheduledHours();
        } else {
            setLoading(false);
        }
    }, [user]);

    
    console.log(scheduledHours);

    useEffect(() => {
        if (bloquesHora.length > 0) {
            console.log('Estado bloquesHora actualizado:', bloquesHora);
        }
    }, [bloquesHora]);

    useEffect(() => {
        if (horaData.idVeterinario) {
            handleBLoquesHora();
        }
    }, [horaData.idVeterinario]);

    const handleCancel = () => {
        const selectedHourId = parseInt(selectedHourToCancel, 10);
        if (!selectedHourToCancel) return;

        const bloqueHoraActualizada = {
            motivo: '',
            agendadoPorUsuario: false,

        };
        handleContinue();
        BloqueHoraService.actualizarBloqueHora(selectedHourId, bloqueHoraActualizada)
            .then(() => {
                setScheduledHours(scheduledHours.filter(hour => hour.id !== selectedHourToCancel));
                setSelectedHourToCancel('');
                navigate('/mis_horas');
            })
            .catch(error => {
                console.error('Error al anular la hora:', error);
            });
    };

    if (loading) {
        return <CircularProgress />;
    }

    const handleOptionSelect = (option, targetCard) => {
        setSelectedOption(option);
        setCurrentCard(targetCard);
    };

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

    const validateStep1 = () => {
        let newErrors = {};
        if (!horaData.idVeterinario) newErrors.idVeterinario = 'El doctor es requerido';
        if (!horaData.idMascota) newErrors.idMascota = 'La mascota es requerida';
        if (!horaData.motivo) newErrors.motivo = 'El motivo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        let newErrors = {};
        if (!selectedSpecialty) newErrors.selectedSpecialty = 'La especialidad del veterinario es requerida';
        if (!horaData.idVeterinario) newErrors.idVeterinario = 'El doctor es requerido';
        if (!horaData.idMascota) newErrors.idMascota = 'La mascota es requerida';
        if (!horaData.motivo) newErrors.motivo = 'El motivo es requerido';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinue = () => {
        const handleNextStep = () => {
            if (selectedOption === 'general' && validateStep1()) {
                setCurrentCard((prevCard) => prevCard + 1);
            } else if (selectedOption === 'especialista' && validateStep2()) {
                setCurrentCard(3);
            } else if (selectedOption === 'anular') {
                setCurrentCard((prevCard) => prevCard + 1);
            }
        };

        if (selectedOption === 'general') {
            handleNextStep();
        } else if (selectedOption === 'especialista') {
            handleNextStep();
        } else if (selectedOption === 'anular') {
            handleNextStep();
        }
    };


    const renderHorasDisponibles = () => (
        <div>
            <Typography variant="h6">Horas disponibles:</Typography>
            <Grid container spacing={2}>
                {filteredTimes.length > 0 ? (
                    filteredTimes.map(bloque => (
                        <Grid item xs={6} sm={4} md={3} key={bloque.id}>
                            <Button
                                variant={selectedTime && selectedTime.id === bloque.id ? "contained" : "outlined"}
                                onClick={() => handleHoraSelect(bloque)}
                                fullWidth
                                disabled={bloque.taken} 
                            >
                                {bloque.horaInicio}
                            </Button>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" style={styles.noHoursMessage}>No hay horas disponibles para este día</Typography> 
        
                )}
            </Grid>
        </div>
    );

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
                            subheader="Selecciona la opción para agendar tu cita a la veterinaria"
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
                                <Typography variant="h6" component="div">Selecciona el médico y la mascota
                                    <span style={styles.contador}>1 de 2</span>
                                </Typography>
                            }
                            subheader="Seleccione el médico con quien le gustaría atenderse"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona un médico</Typography>
                                    <Select
                                        value={horaData.idVeterinario}
                                        onChange={(e) => setHoraData({ ...horaData, idVeterinario: e.target.value })}
                                        fullWidth
                                    >
                                        {doctores.length === 0 ? (
                                            <MenuItem disabled>No hay doctores disponibles</MenuItem>
                                        ) : (
                                            filteredDoctors.length === 0 ? (
                                                <MenuItem disabled>No hay doctores con la especialidad requerida</MenuItem>
                                            ) : (
                                                filteredDoctors.map(idVeterinario => (
                                                    <MenuItem key={idVeterinario.id} value={idVeterinario.id}>
                                                        {idVeterinario.nombre1} {idVeterinario.apellido1} {idVeterinario.apellido2}
                                                    </MenuItem>
                                                ))
                                            )
                                        )}
                                    </Select>
                                    {errors.idVeterinario && <Typography color="error">{errors.idVeterinario}</Typography>}
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
                            title="Selecciona una fecha"
                        />
                        <CardContent>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={es}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    label="Selecciona una fecha"
                                    value={fechaSeleccionada}
                                    shouldDisableDate={(date) => date < new Date()}
                                    onChange={(date) => handleSeleccionFecha(date)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </CardContent>
                        <CardContent>
                            {renderHorasDisponibles()}
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                            {selectedTime && (
                                <Button variant="contained" onClick={() => handleSave(selectedTime)} sx={styles.button}>Agendar</Button>
                            )}
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
                            title={<Typography variant="h6" component="div">Se ha agendado su hora!</Typography>}
                            style={{ textAlign: 'left' }}
                        />
                        <CardMedia
                            component="img"
                            height="350"
                            image="/images_app/doctora_1.png"
                            alt="Imagen de la mascota"
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
                                <Typography variant="h6" component="div">Selecciona el médico y la mascota
                                    <span style={styles.contador}>1 de 2</span>
                                </Typography>
                            }
                            subheader="Seleccione el médico con quien le gustaría atenderse"
                            style={{ textAlign: 'left' }}
                        />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Selecciona la especialidad del médico</Typography>
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
                                    <Typography variant="h6">Selecciona un médico</Typography>
                                    <Select
                                        value={horaData.idVeterinario}
                                        onChange={(e) => setHoraData({ ...horaData, idVeterinario: e.target.value })}
                                        fullWidth
                                    >
                                        {doctores.length === 0 ? (
                                            <MenuItem disabled>No hay doctores disponibles</MenuItem>
                                        ) : (
                                            filteredDoctors2.length === 0 ? (
                                                <MenuItem disabled>No hay doctores con la especialidad requerida</MenuItem>
                                            ) : (
                                                filteredDoctors2.map(idVeterinario => (
                                                    <MenuItem key={idVeterinario.id} value={idVeterinario.id}>
                                                        {idVeterinario.nombre1} {idVeterinario.apellido1} {idVeterinario.apellido2}
                                                    </MenuItem>
                                                ))
                                            )
                                        )}
                                    </Select>
                                    {errors.idVeterinario && <Typography color="error">{errors.idVeterinario}</Typography>}
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
                case 8:
                    return (
                        <Card style={styles.card}>
                            <CardHeader
                                action={
                                    <Tooltip title="cerrar" placement="top-end">
                                        <IconButton aria-label="cerrar" onClick={() => navigate('/mis_horas')}><CloseIcon /></IconButton>
                                    </Tooltip>
                                }
                                title={
                                    <Typography variant="h6" component="div">Anulación de Hora</Typography>
                                }
                                subheader="Seleccione la hora que desea anular"
                                style={{ textAlign: 'left' }}
                            />
                            <CardContent>
                                <Select
                                    value={selectedHourToCancel}
                                    onChange={e => setSelectedHourToCancel(e.target.value)}
                                    displayEmpty
                                    fullWidth
                                >
                                    <MenuItem value="" disabled>
                                        Seleccione la hora que desea anular 
                                    </MenuItem>
                                    {scheduledHours.map(hour => (
                                        <MenuItem key={hour.id} value={hour.id}>
                                            {hour.idVeterinario}: {hour.fecha} {hour.horaInicio} - hora para: {hour.idMascota}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </CardContent>
                            <CardActions disableSpacing>
                                <Grid container spacing={2} sx={{ mt: -1 }}>
                                    <Grid item xs={6}>
                                        <Button variant="contained" onClick={handleBack} sx={styles.button}>Atrás</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" onClick={handleCancel} sx={styles.button} disabled={!selectedHourToCancel}>
                                            Anular
                                        </Button>
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
                            title={<Typography variant="h6" component="div">Hora Anulada</Typography>}
                            style={{ textAlign: 'left' }}
                        />
                        <CardMedia
                            component="img"
                            height="350"
                            image="/images_app/doctora_1.png"
                            alt="Imagen de la mascota"
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
