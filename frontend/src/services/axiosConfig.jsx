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
                window.location.href = '/login';
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
        //En el caso que el token esta adulterado
        if (error.response && error.response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axios;
