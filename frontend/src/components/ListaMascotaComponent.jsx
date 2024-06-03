import * as React from 'react';
import {Card,CardContent,List,ListItem,Divider,ListItemText,ListItemAvatar,Avatar,Typography,Box,IconButton,
  Menu,MenuItem} from '@mui/material';
import { MoreVert, Star, Height, ColorLens, FitnessCenter } from '@mui/icons-material';
import Navbar2Component from './Navbar2Component';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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

export default function ListaMascotaComponent() {
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

  return (
    <div>
      <Navbar2Component />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Card sx={{ width: '100%', maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Lista de Mascotas
            </Typography>
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
        </Card>
      </Box>
    </div>
  );
}
