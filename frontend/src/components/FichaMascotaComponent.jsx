import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import theme from "./styles/themeComponent";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import { Button, Card, RadioGroup, Typography, FormLabel, FormControlLabel, Radio, IconButton } from "@mui/material";
import NavbarComponent from "./NavbarComponent";
import CardHeader from '@mui/material/CardHeader';


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '85vh', // Ocupa toda la altura de la pantalla
        backgroundColor: '#FBFBFB',
    },
    card: {
        width: '80%', // El Box ocupa el 80% del ancho de la pantalla
        maxWidth: 300, // Máximo ancho del Box
        padding: 20,
        textAlign: 'center',
        height: 'center',
        maxHeight: 200,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    button: {
        width: '100%',
    },
    contador: {
        color: '#6BC62D',
        marginLeft: '10px', // "1 de 3"
    },
};

export default function FichaMascotaComponent() {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
    };
    

    return (
        <>
            <NavbarComponent />
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            action={
                                <Tooltip title="cerrar" placement="top-end">
                                    <IconButton aria-label="cerrar" onClick={handleClose}>
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            title={
                                <>
                                    Perfil de mascota
                                    <span style={styles.contador}>1 de 3</span>
                                </>
                            }
                            subheader="Complete el formulario para continuar"
                        />
                        <CardContent>
                            <Typography variant="subtitle2">Qué tipo de mascota es</Typography>
                            <FormLabel id="radio-buttons-group-label"></FormLabel>
                            <RadioGroup
                                aria-labelledby="radio-buttons-group-label"
                                defaultValue="perro"
                                name="radio-buttons-group"
                                style={styles.radioGroup}
                            >
                                <FormControlLabel value="perro" control={<Radio />} label="Perro" />
                                <FormControlLabel value="gato" control={<Radio />} label="Gato" />
                                <FormControlLabel value="exotico" control={<Radio />} label="Exótico" />
                            </RadioGroup>
                        </CardContent>
                        <CardActions disableSpacing>
                            <Button variant="contained" type="submit" fullWidth>Continuar</Button>
                        </CardActions>
                    </Card>
                </div>
            </ThemeProvider>
        </>
    );
}