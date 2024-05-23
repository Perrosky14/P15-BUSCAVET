import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import PropTypes from 'prop-types';
import theme from "./styles/themeComponent";
import { ThemeProvider } from "@mui/material/styles";
import NavbarComponent from "./NavbarComponent";

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
        padding: 5,
        textAlign: 'center',
        height: 'auto',
        margin: 'auto',
        borderRadius: '16px',
        marginTop: 'auto',
        marginBottom: 'auto'
    },
};

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    )
};

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
};

export default function UserSessionComponent() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmitRegister = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          setError('Las contraseñas no coinciden');
        } else {
          setError('');
          // Aquí puedes manejar el envío del formulario.
          console.log('Contraseña registrada:', password);
          navigate('/registro'); // Cambia '/otra-vista' por la ruta de la otra vista
        }
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault();
        navigate('/HomeComponent.jsx');
    }

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    return (
        <>
            <NavbarComponent/>
            <ThemeProvider theme={theme}>
                <div style={styles.container}>
                    <Card sx ={styles.card}>
                        <Box>
                            <Box>
                                <Tabs textColor="black" indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Log in" {...a11yProps(1)} />
                                    <Tab label="Registro" {...a11yProps(0)} />
                                </Tabs>
                            </Box>

                            <CustomTabPanel value={value} index={1}>
                                <form onSubmit={handleSubmitRegister}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Typography variant="subtitle1" align="left">O registrate con tu email</Typography>
                                        <TextField
                                            id="outlined-basic-email-register"
                                            label="Dirección Email"
                                            variant="outlined"
                                            fullWidth
                                        />
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-password-register">Contraseña</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password-register"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                label="Contraseña"
                                                error={error !== ''}
                                                helperText={error}
                                                required
                                            />
                                        </FormControl>
                                        <FormControl variant="outlined" fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-confirm-password-register">Confirmar Contraseña</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-confirm-password-register"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                label="Confirmar Contraseña"
                                                error={error !== ''}
                                                helperText={error}
                                                required
                                            />
                                        </FormControl>
                                        <Typography variant="subtitle2" align="left">8+ caracteres</Typography>
                                        <Button variant="contained" type="submit">Crear Perfil</Button>
                                        <FormControlLabel control={<Checkbox />} label="Enviame noticias y promociones " />
                                        <Typography variant="body1">
                                            By continuing I agree with the 
                                            <Link 
                                                href="https://www.example.com" 
                                                underline="always" 
                                                color="primary" 
                                                sx={{ ml: 1, textDecoration: 'underline' }}
                                            >
                                                Terms & Conditions, Privacy Policy
                                            </Link>
                                        </Typography>
                                    </Box>
                                </form>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={0}>
                                <form onSubmit={handleSubmitLogin}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            id="outlined-basic-email-login"
                                            label="Dirección Email"
                                            variant="outlined"
                                        />
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password-login">Contraseña</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password-login"
                                                type={showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                label="Contraseña"
                                            />
                                        </FormControl>
                                        <Button variant="contained">Iniciar Sesión</Button>
                                    </Box>
                                </form>
                            </CustomTabPanel>
                        </Box>
                    </Card>  
                </div>
            </ThemeProvider>
        </>
    )
};