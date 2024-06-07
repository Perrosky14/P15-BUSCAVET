import React from "react";
import { useNavigate } from 'react-router-dom';
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { styled } from '@mui/system';
import { Typography, Card, CardContent, List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Box, IconButton, Menu, MenuItem, Button } from "@mui/material";
import { MoreVert, StarBorder as StarBorderIcon, ColorLens, FitnessCenter } from '@mui/icons-material';

const Container = styled('div')({
  display: 'flex',
  height: '100vh',
});

const Content = styled('div')({
  flexGrow: 1,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
});

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const WelcomeMessage = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const BackButton = styled(Button)({
  backgroundColor: '#FF4081',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E73370',
  },
});

const MascotaListContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '20px',
  marginBottom: '20px',
  width: '100%',
});

const MascotaCard = styled(Card)({
  width: '100%',
  maxWidth: '600px',
});

const mascotaData = [
  {
    id: 1,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/1.jpg',
  },
  {
    id: 2,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/2.jpg',
  },
  {
    id: 3,
    nombre: 'Gaucho',
    especie: 'Gato',
    edad: '10 años',
    color: 'Color negro',
    peso: '5 kg',
    avatar: '/static/images/avatar/3.jpg',
  },
];

function HomeUsuarioComponent() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleBackClick = () => {
    navigate('/usuario');
  };

  return (
    <Container>
      <NavbarUsuarioComponent />
      <Content>
        <Header>
          <div>
            <WelcomeMessage>Hola, Cristian! Bienvenido</WelcomeMessage>
            <Typography>Hay 3 nuevas citas programadas para hoy</Typography>
          </div>
          <BackButton onClick={handleBackClick}>
            Volver
          </BackButton>
        </Header>
        <MascotaListContainer>
          <Typography variant="h5" component="div" sx={{ marginBottom: '16px', textAlign: 'center' }}>
            Tus mascotas
          </Typography>
          <MascotaCard>
            <CardContent>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {mascotaData.map((mascota, index) => (
                  <React.Fragment key={mascota.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={mascota.nombre} src={mascota.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={mascota.nombre}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {mascota.especie}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <StarBorderIcon fontSize="small" sx={{ mr: 0.5, color: '#FF4081' }} />
                              <Typography variant="body2">{mascota.edad}</Typography>
                              <ColorLens fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                              <Typography variant="body2">{mascota.color}</Typography>
                              <FitnessCenter fontSize="small" sx={{ mx: 1, color: '#FF4081' }} />
                              <Typography variant="body2">{mascota.peso}</Typography>
                            </Box>
                          </React.Fragment>
                        }
                      />
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, index)}
                        sx={{ color: '#FF4081' }}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedIndex === index}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Ver</MenuItem>
                        <MenuItem onClick={handleClose}>Editar</MenuItem>
                        <MenuItem onClick={handleClose}>Eliminar</MenuItem>
                      </Menu>
                    </ListItem>
                    {index < mascotaData.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </MascotaCard>
        </MascotaListContainer>
      </Content>
    </Container>
  );
}

export default HomeUsuarioComponent;