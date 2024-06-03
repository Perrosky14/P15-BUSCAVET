import React from "react";
import NavbarUsuarioComponent from "./NavbarUsuarioComponent";
import { styled } from '@mui/system';
import { TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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

const SearchBar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '24px',
  padding: '8px 16px',
  maxWidth: '400px',
  width: '100%',
});

const SearchInput = styled(TextField)({
  marginLeft: '8px',
  width: '100%',
});

function HomeUsuarioComponent() {
  return (
    <Container>
      <NavbarUsuarioComponent />
      <Content>
        <Header>
          <WelcomeMessage>Bienvenido</WelcomeMessage>
          <h5>hay 3 citas confirmadas para hoy</h5>
          <SearchBar>
            <SearchIcon color="action" />
            <SearchInput
              placeholder="Buscar hora veterinaria"
              variant="outlined"
              size="small"
              InputProps={{ disableUnderline: true }}
            />
          </SearchBar>
        </Header>
        
        
      </Content>
    </Container>
  );
}

export default HomeUsuarioComponent;
