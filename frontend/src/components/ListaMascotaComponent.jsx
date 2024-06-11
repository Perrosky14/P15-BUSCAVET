import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from "@mui/material";
import MascotaService from '../services/MascotaService';
import Navbar2Component from "./Navbar2Component";

const styles = {
    container: { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    card: { width: '300px', margin: '10px', textAlign: 'center' },
    button: { marginTop: '20px', borderRadius: '20px', backgroundColor: '#FF4081' },
    loading: { marginTop: '50px' }
};

const ListaMascotaComponent = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await MascotaService.getMascotas();
                console.log(response.data);  // Verifica la estructura de los datos
                setMascotas(response.data);
            } catch (error) {
                console.error('Error al obtener las mascotas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, []);

    const handleAddMascota = () => {
        navigate('/registrar_mascota');
    };

    return (
        <>
            <Navbar2Component />
            <div style={styles.container}>
                <Button variant="contained" color="primary" onClick={handleAddMascota} style={styles.button}>
                    Registrar Nueva Mascota
                </Button>
                {loading ? (
                    <CircularProgress style={styles.loading} />
                ) : (
                    <Grid container spacing={3}>
                        {mascotas.map(mascota => (
                            <Grid item key={mascota.id}>
                                <Card style={styles.card}>
                                    <CardContent>
                                        <Typography variant="h6">{mascota.nombre}</Typography>
                                        <Typography variant="body2">Especie: {mascota.id_especie}</Typography>
                                        <Typography variant="body2">Raza: {mascota.id_raza}</Typography>
                                        <Typography variant="body2">Color: {mascota.color}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </div>
        </>
    );
};

export default ListaMascotaComponent;