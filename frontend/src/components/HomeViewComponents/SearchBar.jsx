import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const styles = {
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '20px',
    },
    input: {
        margin: '0 10px',
    },
    searchButton: {
        backgroundColor: '#ff436f',
        color: '#fff',
    },
};

const SearchBar = () => {
    return (
        <Box sx={styles.searchBar}>
            <TextField label="Especialidad" variant="outlined" sx={styles.input} />
            <TextField label="¿Dónde estás?" variant="outlined" sx={styles.input} />
            <TextField label="Especie de tu mascota" variant="outlined" sx={styles.input} />
            <Button variant="contained" sx={styles.searchButton}>Buscar</Button>
        </Box>
    );
};

export default SearchBar;