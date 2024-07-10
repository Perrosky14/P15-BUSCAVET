import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SearchBy = ({ searchType, searchValue, onSearchTypeChange, onSearchValueChange }) => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="search-type-label">Buscar por</InputLabel>
                <Select
                    labelId="search-type-label"
                    id="searchType"
                    value={searchType}
                    onChange={onSearchTypeChange}
                    label="Buscar por"
                >
                    <MenuItem value="name">Nombre</MenuItem>
                    <MenuItem value="rut">RUT</MenuItem>
                    <MenuItem value="id">ID</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="searchValue"
                label="Valor de búsqueda"
                variant="outlined"
                value={searchValue}
                onChange={onSearchValueChange}
                fullWidth
            />
        </Box>
    );
};

export default SearchBy;
