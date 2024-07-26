import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Avatar } from "@mui/material";
import { Settings, MonitorHeart, CalendarMonth, MarkEmailRead, BarChart, ExitToApp, Person } from "@mui/icons-material";
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/system';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 250;

const token = localStorage.getItem('token');

const DrawerStyled = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: '#fff', // Fondo blanco
    },
});

const Logo = styled('div')({
    display: 'flex',
    justifyContent: 'top',
    alignItems: 'center',
    padding: '0px 0', // Espacio alrededor del logo
});

const LogoImage = styled('img')({
    width: '200px',
    height: 'auto',
});

const UserInfo = styled('div')({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#F8F8F8', // Fondo del usuario
});

const AvatarStyled = styled(Avatar)({
    marginRight: '10px',
});

const UserName = styled('div')({
    color: '#ff436f', // Color rosado
});

const UserWelcome = styled('div')({
    color: '#000', // Color negro
    fontWeight: 'bold', // Negrita
});

const ListItemStyled = styled(ListItem)({
    padding: '10px 20px',
    '&:hover': {
        backgroundColor: '#ff436f', // Fondo rosado al pasar el mouse
        '& .MuiListItemIcon-root': {
            color: '#fff', // Icono blanco al pasar el mouse
        },
        '& .MuiListItemText-primary': {
            color: '#fff', // Texto blanco al pasar el mouse
        },
    },
});

const ListItemTextStyled = styled(ListItemText)({
    marginLeft: '10px',
    color: '#000', // Color negro del texto
});

const ListItemIconStyled = styled(ListItemIcon)({
    color: '#000', // Color negro de los iconos
});

const ListItemIconLogoutStyled = styled(ListItemIcon)({
    color: '#ff436f', // Color rosado del icono de cerrar sesión
});

const Logout = styled(ListItemStyled)({
    marginTop: 'auto',
    color: '#ff436f',
    '&:hover': {
        backgroundColor: '#ff436f',
        color: '#fff',
        '& .MuiListItemIcon-root': {
            color: '#fff',
        },
        '& .MuiListItemText-primary': {
            color: '#fff',
        },
    },
});

function VerticalNavbarComponent() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (token) {
            const tokenDecodificado = jwtDecode(token);
            setUserName(tokenDecodificado.nombre);
        } else {
            console.error('No se encontró un token en el localStorage');
        }
    }, []);

    return (
        <DrawerStyled variant="permanent">
            <Logo>
                <LogoImage src="/images/logo-buscavet-5.png" alt="Logo buscavet" />
            </Logo>
            <UserInfo>
                <AvatarStyled>
                    <ImageIcon />
                </AvatarStyled>
                <div>
                    <UserName>Hola, {userName}!</UserName>
                    <UserWelcome>Bienvenido</UserWelcome>
                </div>
            </UserInfo>
            <List>
                <ListItemStyled button component="a" >
                    <ListItemIconStyled><MonitorHeart /></ListItemIconStyled>
                    <ListItemTextStyled primary="Inicio" />
                </ListItemStyled>
                <ListItemStyled button component="a" href="/admin/usuarios">
                    <ListItemIconStyled><Person/></ListItemIconStyled>
                    <ListItemTextStyled primary="Usuarios" />
                </ListItemStyled>
                <ListItemStyled button component="a">
                    <ListItemIconStyled><MarkEmailRead /></ListItemIconStyled>
                    <ListItemTextStyled primary="Perfil" />
                </ListItemStyled>
                <ListItemStyled button component="a">
                    <ListItemIconStyled><Settings /></ListItemIconStyled>
                    <ListItemTextStyled primary="Configuración" />
                </ListItemStyled>
            </List>
            <Logout button component="a" href="/">
                <ListItemIconLogoutStyled><ExitToApp /></ListItemIconLogoutStyled>
                <ListItemTextStyled primary="Cerrar sesión" />
            </Logout>
        </DrawerStyled>
    );
}

export default VerticalNavbarComponent;