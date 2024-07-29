import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavbarDoctorComponent from './NavbarDoctorComponent';
import HorarioService from '../services/HorarioService';
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MoreVert } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InputMask from 'react-input-mask';

const styles = {
  container: { display: 'flex', height: '100vh' },
  content: { flexGrow: 1, padding: '20px', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  welcomeMessage: { fontSize: '24px', fontWeight: 'bold', padding: '8px 10px' },
  searchBar: { display: 'flex', alignItems: 'center', border: '2px solid #FF4081', borderRadius: '40px', padding: '8px 16px', maxWidth: '600px', width: '100%' },
  searchInput: { marginLeft: '8px', width: '100%', border: 'none', outline: 'none' },
  agendaContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 },
  agendaCard: { width: '750px', maxWidth: 750, borderRadius: '15px' },
  consultaCard: { backgroundColor: '#FF4081', color: 'white', padding: '20px', marginBottom: '20px', borderRadius: '10px', textAlign: 'center', width: '100%', maxWidth: '750px', height: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' },
  subtitle: { fontSize: '14px' },
  title2: { fontSize: '18px', fontWeight: 'bold', padding: '4px 16px', textAlign: 'center' },
  subtitle2: { fontSize: '14px', color: '#C5C5C5', textAlign: 'center' },
  especialidadesContainer: { marginBottom: '20px', textAlign: 'center' },
  telemedicinaCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '10px', textAlign: 'center' },
  button: {
    backgroundColor: '#FF4081',
    color: 'white',
    borderRadius: '30px',
    padding: '10px 20px',
    marginTop: '20px',
    marginBottom: '20px',
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#FF80AB',
    },
  },
};

const agendaData = [
  {
    id: 1,
    nombre: 'Gaucho',
    especie: 'Gato',
    motivo: 'Pata quebrada',
    lugar: 'Domicilio',
    fecha: 'Hoy',
    hora: '12:30 PM',
  },
  {
    id: 2,
    nombre: 'Gaucho',
    especie: 'Gato',
    motivo: 'Pata quebrada',
    lugar: 'Domicilio',
    fecha: 'Hoy',
    hora: '12:30 PM',
  },
  {
    id: 3,
    nombre: 'Gaucho',
    especie: 'Gato',
    motivo: 'Pata quebrada',
    lugar: 'Domicilio',
    fecha: 'Hoy',
    hora: '12:30 PM',
  },
];

const HomeDoctorComponent = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [user, setUser] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const [crearBloque, setCrearBloque] = useState({
    turno: '',
    cantidadBloquesPorDia: '',
    tiempoBloques: '',
    tiempoPausas: '',
    tiempoTrabajoTurno: '',
    horaInicio: '',
    horaFinal: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        console.error('Token inválido', e);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const openFormDialog = () => {
    setOpenForm(true);
  };

  const closeFormDialog = () => {
    setOpenForm(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCrearBloque({ ...crearBloque, [name]: value });
  };

  const handleCrear = async () => {
    const bloqueHorario = {
      ...crearBloque,
      idDoctor: user.id,
    };

    try {
      console.log('id del doctor', user.id);
      console.log('bloque horario generado', bloqueHorario);
      await HorarioService.crearBloqueHorarioPorDoctor(bloqueHorario);
      closeFormDialog();
    } catch (error) {
      console.error('Error al crear el bloque horario', error);
    }
  };

  const turnos = [
    { value: 'manana', label: 'Mañana' },
    { value: 'tarde', label: 'Tarde' },
  ];

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={styles.container}>
      <NavbarDoctorComponent />
      <div style={styles.content}>
        <div style={styles.header}>
          <div>
            <Typography style={styles.welcomeMessage}>Hola, {user.nombre}</Typography>
            <Typography style={styles.subtitle2}>Hay 3 nuevas solicitudes de atención</Typography>
          </div>
          <div style={styles.searchBar}>
            <SearchIcon color="action" />
            <input
              type="text"
              placeholder="Buscar solicitud de atención"
              style={styles.searchInput}
            />
          </div>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box style={styles.agendaContainer}>
              <Typography style={styles.title2}>Próximas horas agendadas</Typography>
              <Typography style={styles.subtitle2}>Hay 3 citas programadas para hoy</Typography>
              <Grid item xs={10}>
                <Card style={styles.agendaCard}>
                  <CardContent>
                    <Button
                      variant="contained"
                      style={styles.button}
                      onClick={() => navigate('/agenda-completa')}
                    >
                      Ver agenda completa
                    </Button>
                    <List>
                      {agendaData.map((agenda, index) => (
                        <React.Fragment key={agenda.id}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <HomeIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={agenda.nombre}
                              secondary={
                                <React.Fragment>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="body2">{agenda.motivo}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="body2">{agenda.especie}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Typography variant="body2">{agenda.lugar}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                                    <Typography variant="body2">{agenda.fecha}</Typography>
                                  </Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                                    <Typography variant="body2">{agenda.hora}</Typography>
                                  </Box>
                                </React.Fragment>
                              }
                            />
                            <IconButton edge="end" aria-label="more" onClick={(event) => handleClick(event, index)}>
                              <MoreVert />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={selectedIndex === index}
                              onClose={handleClose}
                            >
                              <MenuItem onClick={handleClose}>Acción 1</MenuItem>
                              <MenuItem onClick={handleClose}>Acción 2</MenuItem>
                            </Menu>
                          </ListItem>
                          {index < agendaData.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Card style={styles.consultaCard}>
              <Typography style={styles.title}>Tienes 3 consultas programadas</Typography>
              <Typography style={styles.subtitle}>para hoy</Typography>
            </Card>
            <Card style={styles.telemedicinaCard}>
              <Typography style={styles.title2}>Telemedicina</Typography>
              <Typography style={styles.subtitle2}>Disponible para atención remota</Typography>
              <Button variant="contained" style={styles.button} onClick={openFormDialog}>
                Agendar Bloques de Horario
              </Button>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={openForm} onClose={closeFormDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Crear Bloque de Horario</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Horario de atención</Typography>
              <RadioGroup row name="turno" value={crearBloque.turno} onChange={handleChange}>
                {turnos.map((turno) => (
                  <FormControlLabel key={turno.value} value={turno.value} control={<Radio />} label={turno.label} />
                ))}
              </RadioGroup>
              <TextField
                label="Cantidad de bloques por día"
                name="cantidadBloquesPorDia"
                value={crearBloque.cantidadBloquesPorDia}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
              <InputMask
                mask="99:99:99"
                value={crearBloque.tiempoBloques}
                onChange={handleChange}
              >
                {() => <TextField label="Tiempo por bloque (HH:MM:SS)" name="tiempoBloques" fullWidth margin="normal" />}
              </InputMask>
              <InputMask
                mask="99:99:99"
                value={crearBloque.tiempoPausas}
                onChange={handleChange}
              >
                {() => <TextField label="Tiempo de pausas (HH:MM:SS)" name="tiempoPausas" fullWidth margin="normal" />}
              </InputMask>
              <InputMask
                mask="99:99:99"
                value={crearBloque.tiempoTrabajoTurno}
                onChange={handleChange}
              >
                {() => <TextField label="Tiempo total de trabajo por turno (HH:MM:SS)" name="tiempoTrabajoTurno" fullWidth margin="normal" />}
              </InputMask>
              <InputMask
                mask="99:99:99"
                value={crearBloque.horaInicio}
                onChange={handleChange}
              >
                {() => <TextField label="Hora de inicio" name="horaInicio" fullWidth margin="normal" />}
              </InputMask>
              <InputMask
                mask="99:99:99"
                value={crearBloque.horaFinal}
                onChange={handleChange}
              >
                {() => <TextField label="Hora de finalización" name="horaFinal" fullWidth margin="normal" />}
              </InputMask>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeFormDialog}>Cancelar</Button>
            <Button onClick={handleCrear} variant="contained" style={styles.button}>Crear</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default HomeDoctorComponent;