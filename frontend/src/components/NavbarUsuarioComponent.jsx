import React from "react";
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Settings } from "@mui/icons-material";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';


const drawerWidth = 240;

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
    },
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 0',
  },
  logoImage: {
    width: '200px',
    height: 'auto',
  },
  listItem: {
    padding: '10px 20px',
  },
  listItemText: {
    marginLeft: '10px',
  },
};


function VerticalNavbarComponent() {
    return (
      <>
        <Drawer
          variant="permanent"
          sx={styles.drawer}
        >
          <div style={styles.logo}>
            <img src="/images/logo-buscavet-5.png" alt="Logo buscavet" style={styles.logoImage} />
          </div>
          <List>
            <ListItem style={styles.listItem}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
  
            <ListItem button component="a" href="/usuario" style={styles.listItem}>
              <ListItemIcon><MonitorHeartIcon /></ListItemIcon>
              <ListItemText primary="Inicio" style={styles.listItemText} />
            </ListItem>
            <ListItem button component="a" href="/mis_horas" style={styles.listItem}>
              <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
              <ListItemText primary="Mis horas" style={styles.listItemText} />
            </ListItem>
            <ListItem button component="a" href="/perfil_usuario" style={styles.listItem}>
              <ListItemIcon><MarkEmailReadIcon /></ListItemIcon>
              <ListItemText primary="Perfil" style={styles.listItemText} />
            </ListItem>
            <ListItem button component="a" href="/factura_usuario" style={styles.listItem}>
              <ListItemIcon><BarChartIcon /></ListItemIcon>
              <ListItemText primary="Facturación" style={styles.listItemText} />
            </ListItem>
            <ListItem button component="a" href="/configuracion" style={styles.listItem}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Configuración" style={styles.listItemText} />
            </ListItem>
          </List>
        </Drawer>
      </>
    );
  }
  
  export default VerticalNavbarComponent;