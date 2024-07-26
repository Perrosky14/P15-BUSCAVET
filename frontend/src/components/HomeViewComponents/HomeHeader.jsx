import React from 'react';
import { AppBar, Toolbar, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const styles = {
    logo: {
        height: '2.5em', // Altura en em
        marginRight: '1.25em', // Margen en em
        filter: 'invert(100%)',  // Esto hace que el logo se vea blanco
    },
    navList: {
        display: 'flex',
        padding: 0,
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    navItem: {
        margin: '0 3em', // Reducir el margen en em para menos espacio entre elementos
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.875em',  // Tamaño de letra más pequeño en em (equivale a 14px si 1em es 16px)
    },
    downloadButton: {
        backgroundColor: '#ff5f7e',
        color: '#fff',
        borderRadius: '1.25em', // Bordes redondeados en em
        marginLeft: '1em', // Reducir el margen a la izquierda
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1.25em', // Padding en em
    },
    navBox: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '0em', // Achicar el padding de la Box
    },
};

const HomeHeader = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="static">
            <Toolbar sx={styles.toolbar}>
                <Box display="flex" alignItems="center">
                    <img src="/images/logo-buscavet-5.png" alt="BUSCAVET" style={styles.logo} />
                </Box>
                {!isMobile && (
                    <Box sx={styles.navBox}>
                        <List style={styles.navList}>
                            <ListItem style={styles.navItem}>
                                <ListItemText>
                                    <a style={styles.navLink} href="#nosotros">NOSOTROS</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem style={styles.navItem}>
                                <ListItemText>
                                    <a style={styles.navLink} href="#servicio">NUESTRO SERVICIO</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem style={styles.navItem}>
                                <ListItemText>
                                    <a style={styles.navLink} href="#colaboradores">COLABORADORES</a>
                                </ListItemText>
                            </ListItem>
                            <ListItem style={styles.navItem}>
                                <ListItemText>
                                    <a style={styles.navLink} href="#contacto">CONTACTANOS</a>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Box>
                )}
                <Button variant="contained" sx={styles.downloadButton}>DESCARGAR APP</Button>
            </Toolbar>
        </AppBar>
    );
};

export default HomeHeader;
