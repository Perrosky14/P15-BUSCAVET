import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token);
        if (exp < Date.now() / 1000) {
            return true;
        }
        return false;
    } catch (error) {
        return true;
    }
};

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                //Redirige al usuario a la pagina login si el token expiro.
                //window.location.href = '/login';
                return Promise.reject(new Error('token expirado'));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;
        const isloginRequest = originalRequest.url && originalRequest.url.includes('/login');
        //En el caso que el token esta adulterado
        if (error.response && error.response.status === 403) {
            //No redirigir si es un intento de inicio de sesión.
            if (isloginRequest) {
                return Promise.reject(error);
            } else {
                //Para otras solicitudes o error de token adulterado, bad request, etc.
                //localStorage.removeItem('token');
                //window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
