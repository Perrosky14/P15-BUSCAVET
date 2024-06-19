import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DoctorComponent from './DoctorComponent'; // Importa el componente de Doctor
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';
import RefreshIcon from '@mui/icons-material/Refresh'; // Importa el icono de recarga
import VeterinariaService from "../../services/VeterinariaService";
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode para decodificar el token

const styles = {
    container: {
        mb: 1,
        backgroundColor: '#FBFBFB',
        borderRadius: '16px',
        p: 0,
        width: '60%',
        maxWidth: '1200px',
        marginLeft: 2,
    },
    recargarIcon: {
        color: '#FF4081',
        fontSize: '30px',
        mt: 2.5,
        mr: 1,
    },
    verDoctoresButton: {
        borderRadius: '25px',
        border: '1px solid #FF4081',
        color: '#000000',
        padding: '10px 25px',
        textTransform: 'none',
        fontSize: '17px',
        height: '30px',
        mt: 2.5,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0.5,
    },
    subtitle: {
        color: '#B9B9B9',
    },
    paginationButton: {
        mt: 0,
        mx: 1,
    },
};

const HeaderWithButton = ({ totalDoctores, recargar }) => (
    <Box sx={styles.headerContainer}>
        <Box>
            <Typography variant="h6" sx={{ mb: -0.5, fontWeight: 'bold' }}>Doctores en mi Veterinaria</Typography>
            <Typography variant="subtitle1" sx={styles.subtitle}>Hay {totalDoctores} doctores registrados</Typography>
        </Box>
        <Box>
            <IconButton
                sx={styles.recargarIcon}
                onClick={recargar}
            >
                <RefreshIcon />
            </IconButton>
            <Button variant="outlined" sx={styles.verDoctoresButton}>Búsqueda avanzada</Button>
        </Box>
    </Box>
);

const DoctoresListVeterinaria = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [doctores, setDoctores] = useState([]);
    const [key, setKey] = useState(0); // Utiliza el estado para forzar una recarga del componente

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                // Recupera el token del localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token no encontrado en localStorage');
                    return;
                }

                // Decodifica el token para obtener el id
                const decoded = jwtDecode(token);
                const idVeterinaria = decoded.id;

                // Llama a la función getDoctors con el id decodificado
                const response = await VeterinariaService.getDoctors(idVeterinaria);
                const doctoresObtenidos = response.data.map((doctor) => ({
                    id: doctor.id,
                    nombre: `${doctor.nombre1} ${doctor.apellido1}`,
                    nombres: `${doctor.nombre1} ${doctor.nombre2}`,
                    apellidos: `${doctor.apellido1} ${doctor.apellido2}`,
                    rut: doctor.rut,
                    celular: `+${doctor.codigo_area} ${doctor.celular}`,
                    email: doctor.email,
                    nombreAsistente: doctor.asistente_nom,
                    numeroAsistente: `+${doctor.asistente_codigo_area} ${doctor.asistente_celular}`,
                    fechaNacimiento: `${doctor.dia_nac}/${doctor.mes_nac}/${doctor.anio_nac}`,
                    idPais: doctor.id_pais,
                    validado: doctor.validado,
                    id_genero: doctor.id_genero,
                    matricula: doctor.matricula,
                    rrss1: doctor.rrss1,
                    rrss2: doctor.rrss2,
                    especialidad: 'Especialidad', // Puedes reemplazar esto con el valor real si está disponible
                    sexo: doctor.id_genero === 1 ? 'M' : 'F', // Asumiendo que 1 es Masculino y 2 es Femenino
                }));
                setDoctores(doctoresObtenidos);
            } catch (error) {
                console.error('Error al obtener los doctores:', error);
            }
        };

        fetchDoctors();
    }, [key]);

    const recargar = () => {
        setKey(key + 1); // Cambia el valor de la clave para forzar una nueva renderización
    };

    const eliminarDoctor = async (idDoctor) => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const idVeterinaria = decoded.id;

            await VeterinariaService.deleteDoctor(idVeterinaria, idDoctor);
            const updatedDoctores = doctores.filter((doctor) => doctor.id !== idDoctor);
            setDoctores(updatedDoctores);
            if (updatedDoctores.length % doctoresPorPagina === 0 && paginaActual > 1) {
                setPaginaActual(paginaActual - 1);
            }
        } catch (error) {
            console.error('Error al eliminar el doctor:', error);
        }
    };

    const totalDoctores = doctores.length;
    const doctoresPorPagina = 6;

    const indiceUltimoDoctor = paginaActual * doctoresPorPagina;
    const indicePrimerDoctor = indiceUltimoDoctor - doctoresPorPagina;
    const doctoresActuales = doctores.slice(indicePrimerDoctor, indiceUltimoDoctor);

    const paginasTotales = Math.ceil(totalDoctores / doctoresPorPagina);

    return (
        <ThemeProvider theme={theme}>
            <Box key={key} sx={styles.container}>
                <HeaderWithButton totalDoctores={totalDoctores} recargar={recargar} />
                {doctoresActuales.length > 0 ? (
                    doctoresActuales.map((doctor, index) => (
                        <DoctorComponent key={index} {...doctor} onDelete={eliminarDoctor} />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        No hay doctores registrados
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={paginaActual === 1 || totalDoctores === 0}
                        onClick={() => setPaginaActual(paginaActual - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={paginaActual === paginasTotales || totalDoctores === 0}
                        onClick={() => setPaginaActual(paginaActual + 1)}
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default DoctoresListVeterinaria;
