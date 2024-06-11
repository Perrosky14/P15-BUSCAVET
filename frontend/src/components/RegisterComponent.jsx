import { useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import theme from "./styles/themeComponent";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ThemeProvider } from "@mui/material/styles";
import { Button, Card, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import NavbarComponent from "./NavbarComponent";

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75vh',
    },
    card: {
        width: '90%',
        maxWidth: 502,
        padding: 5,
        textAlign: 'center',
        height: 'auto',
        margin: 'auto',
        borderRadius: '16px',
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
        width: '100%',
        height: '50px',
        borderRadius: '16px',
    },
};

export default function RegisterComponent() {
    const navigate = useNavigate();
    const [tipoUsuario, setTipoUsuario] = useState("");

    const location = useLocation();
    const { usuario } = location.state || {}; // Verificación adicional

    const handleTipoUsuarioChange = (event) => {
        setTipoUsuario(event.target.value);
    };

    const handleClose = () => {
        navigate('/login');
    };

    const handleContinue = () => {
        if (tipoUsuario === "Tutor de mascota") {
            navigate('/registroTutor', { state: { usuario } });
        } else if (tipoUsuario === "Veterinario") {
            navigate('/registroVeterinario', { state: { usuario } });
        } else if (tipoUsuario === "Centro veterinario") {
            navigate('/registroCentro', { state: { usuario } });
        }
    };

    const getPasosTexto = () => {
        if (tipoUsuario === "Tutor de mascota") {
            return "1 de 3";
        } else if (tipoUsuario === "Veterinario" || tipoUsuario === "Centro veterinario") {
            return "1 de 4";
        } else {
            return "";
        }
    };

    const card = (
        <Fragment>
            <CardContent>
                <div style={styles.header}>
                    <Typography textAlign="left" sx={{ fontWeight: 'bold' }}>Perfil de usuario</Typography>
                    <Typography sx={styles.stepText}>
                        {getPasosTexto()}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Typography variant="subtitle2" textAlign="left" sx={{ marginTop: 3 }}>¿Qué tipo de usuario eres?</Typography>
                <FormControl component="fieldset" sx={{ ...styles.formControl, textAlign: 'left' }}>
                    <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-users"
                        value={tipoUsuario}
                        onChange={handleTipoUsuarioChange}
                    >
                        <FormControlLabel value="Tutor de mascota" control={<Radio />} label="Tutor de mascota" />
                        <FormControlLabel value="Veterinario" control={<Radio />} label="Veterinario" />
                        <FormControlLabel value="Centro veterinario" control={<Radio />} label="Centro veterinario" />
                    </RadioGroup>
                </FormControl>
            </CardContent>
            <CardActions>
                <Button variant="contained" sx={styles.button} fullWidth onClick={handleContinue}>Continuar</Button>
            </CardActions>
        </Fragment>
    );

    return (
        <>
            <NavbarComponent />
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    <Card sx={styles.card}>
                        {card}
                    </Card>
                </div>
            </ThemeProvider>
        </>
    )
};
