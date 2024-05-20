import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: 'Commissioner',//Tipo fuente para el proyecto
    },

    components : {
        MuiTypography: {
            styleOverrides: {
                subtitle1: {
                    color: 'rgba(26, 7, 16, 0.4)',//Gris con transparencia del 60%
                },
                subtitle2: {
                    color: 'rgba(26, 7, 16, 0.65)',//Gris con transparencia del 35%
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',//configuracion para que los tabs no vengan en mayusculas por defecto
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',//Configuracion para que los bottones no vengan en mayusculas por defecto
                },
            },
        },
    },

    palette: {
      primary: {
        main: '#ff436f',//Color Principal rosado del proyecto
      },
      secondary: {
        main: '#f5759e',//Color rosado para utilizarlo en botones desabilitados
      },
    },
});

export default theme;