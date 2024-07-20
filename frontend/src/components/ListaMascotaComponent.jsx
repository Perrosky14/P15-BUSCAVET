import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Button, CircularProgress } from "@mui/material";
import UsuarioService from '../services/UsuarioService';
import Navbar2Component from "./Navbar2Component";
import {jwtDecode} from 'jwt-decode';

const styles = {
    container: { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    card: { width: '300px', margin: '10px', textAlign: 'center' },
    button: { marginTop: '20px', borderRadius: '20px', backgroundColor: '#FF4081' },
    loading: { marginTop: '50px' }
};

const ListaMascotaComponent = () => {
    const [mascotas, setMascotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserFromToken = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            }
        };

        fetchUserFromToken();
    }, []);

    useEffect(() => {
        const fetchMascotas = async () => {
            if (user && user.id) {
                setLoading(true);
                try {
                    const response = await UsuarioService.getMascotas(user.id);
                    console.log(response.data);
                    setMascotas(response.data);
                } catch (error) {
                    console.error('Error al obtener las mascotas:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchMascotas();
    }, [user]);

    const handleAddMascota = () => {
        navigate('/registrar_mascota', { state: { user } });
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
