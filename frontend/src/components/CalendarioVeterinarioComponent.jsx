import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@mui/material';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { CalendarPicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import NavbarDoctorComponent from './NavbarDoctorComponent';
import HorarioService from '../services/HorarioService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const locales = {
  es: esLocale,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarioVeterinarioComponent = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
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
  const [minTime, setMinTime] = useState(new Date(2024, 1, 1, 10, 0));
  const [maxTime, setMaxTime] = useState(new Date(2024, 1, 1, 18, 0));

  const fetchBloques = async (idDoctor) => {
    try {
      const response = await HorarioService.verbloque(idDoctor);
      const data = response.data;

      // Generar eventos
      const bloquesEvents = [];
      const pausasEvents = [];
      data.forEach(bloque => {
        const startTime = new Date(`2024-01-01T${bloque.horaInicio}`);
        const endTime = new Date(`2024-01-01T${bloque.horaFinal}`);
        const blockDuration = 45 * 60 * 1000; // 45 minutes in milliseconds
        const pauseDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

        let currentTime = startTime;
        while (currentTime < endTime) {
          const blockEndTime = new Date(currentTime.getTime() + blockDuration);
          if (blockEndTime > endTime) break;

          bloquesEvents.push({
            title: 'Disponible',
            start: currentTime,
            end: blockEndTime,
            allDay: false,
            isPause: false,
          });

          const pauseStartTime = blockEndTime;
          const pauseEndTime = new Date(pauseStartTime.getTime() + pauseDuration);

          if (pauseEndTime > endTime) break;

          pausasEvents.push({
            title: 'Pausa',
            start: pauseStartTime,
            end: pauseEndTime,
            allDay: false,
            isPause: true,
          });

          currentTime = pauseEndTime;
        }
      });

      setEvents([...bloquesEvents, ...pausasEvents]);

      // Calcular min y max dinámicamente
      const allTimes = data.flatMap(bloque => [
        new Date(`2024-01-01T${bloque.horaInicio}`),
        new Date(`2024-01-01T${bloque.horaFinal}`),
      ]);

      const minTime = new Date(Math.min(...allTimes.map(time => time.getTime())));
      const maxTime = new Date(Math.max(...allTimes.map(time => time.getTime())));

      setMinTime(minTime);
      setMaxTime(maxTime);
    } catch (error) {
      console.error('Error al obtener los bloques de horario', error);
    }
  };

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

  useEffect(() => {
    if (user) {
      fetchBloques(user.id);
    }
  }, [user]);

  const openFormDialog = () => {
    setOpenForm(true);
  };

  const closeFormDialog = () => {
    setOpenForm(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCrearBloque(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCrear = async () => {
    const bloqueHorario = {
      ...crearBloque,
      idDoctor: user.id,
    };

    try {
      await HorarioService.crearBloqueHorarioPorDoctor(bloqueHorario);
      closeFormDialog();
      fetchBloques(user.id); // Refresh the calendar after creating a new block
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

  const CustomEvent = ({ event }) => {
    return (
      <div className={event.isPause ? 'custom-pause-event' : ''}>
        <span>{event.title}</span>
      </div>
    );
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    const isPause = events.some(event =>
      event.isPause &&
      ((start >= event.start && start < event.end) ||
        (end > event.start && end <= event.end) ||
        (start < event.start && end > event.end))
    );

    if (isPause) {
      return; // No permitir la creación de eventos en tiempos de pausa
    }

    // Lógica para crear un nuevo evento (puede abrir un formulario o similar)
  };

  return (
    <div style={{ display: 'flex' }}>
      <NavbarDoctorComponent />
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item xs={8}>
          <Box display="flex" justifyContent="space-between" alignItems="center" padding={3}>
            <div>
              <Typography variant="h5">Buenos días</Typography>
            </div>
          </Box>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month', 'week', 'day']}
            defaultView="week"
            step={15} // Intervalo de tiempo en minutos
            timeslots={4} // Cuántos "steps" hay en una hora
            min={minTime}
            max={maxTime}
            selectable
            onSelectSlot={handleSelectSlot}
            components={{
              event: CustomEvent,
            }}
            messages={{
              week: 'Semana',
              day: 'Día',
              today: 'Hoy',
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" alignItems="center" padding={3}>
            <Button
              variant="contained"
              color="secondary"
              style={{
                backgroundColor: '#FF4081',
                borderRadius: '30px',
                marginBottom: '20px',
              }}
              onClick={openFormDialog}
            >
              Crear horas de atención
            </Button>
            <Paper elevation={3} style={{ padding: '16px', width: '100%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
              </LocalizationProvider>
            </Paper>
          </Box>
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
            <TextField
              label="Tiempo por bloque (HH:MM:SS)"
              name="tiempoBloques"
              value={crearBloque.tiempoBloques}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tiempo de pausas (HH:MM:SS)"
              name="tiempoPausas"
              value={crearBloque.tiempoPausas}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tiempo total de trabajo por turno (HH:MM:SS)"
              name="tiempoTrabajoTurno"
              value={crearBloque.tiempoTrabajoTurno}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hora de inicio"
              name="horaInicio"
              value={crearBloque.horaInicio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hora de finalización"
              name="horaFinal"
              value={crearBloque.horaFinal}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFormDialog}>Cancelar</Button>
          <Button onClick={handleCrear} variant="contained">Crear</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarioVeterinarioComponent;
