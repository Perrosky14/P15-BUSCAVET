import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterByType = ({ onFilterChange }) => {
    return (
        <FormControl
            variant="outlined"
            sx={{
                minWidth: 130, // Reducido el tamaño mínimo
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ff436f', // Rosado
                    },
                    '&:hover fieldset': {
                        borderColor: '#ff436f', // Rosado en hover
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ff436f', // Rosado en focus
                    },
                    '& .MuiSelect-select': {
                        padding: '8px 14px', // Ajustar padding para tamaño más pequeño
                        fontSize: '14px', // Asegurar el tamaño de fuente consistente
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#ff436f', // Color del label
                    fontSize: '14px', // Tamaño de fuente consistente
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ff436f', // Color del label en focus
                },
                fontSize: '14px', // Tamaño de fuente consistente
            }}
        >
            <InputLabel id="filter-options-label">Filtrar por tipo</InputLabel>
            <Select
                labelId="filter-options-label"
                id="filterOptions"
                onChange={(e) => onFilterChange(e.target.value)}
                label="Filtrar por tipo"
                MenuProps={{
                    PaperProps: {
                        sx: {
                            '& .MuiMenuItem-root': {
                                fontSize: '14px', // Tamaño de fuente consistente
                                '&.Mui-selected': {
                                    backgroundColor: '#ff436f1a', // Fondo rosado claro al seleccionar
                                },
                                '&:hover': {
                                    backgroundColor: '#ff436f1a', // Fondo rosado claro al pasar el mouse
                                },
                            },
                        },
                    },
                }}
            >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Mascota">Mascota</MenuItem>
                <MenuItem value="Veterinaria">Veterinaria</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Usuario">Usuario</MenuItem>
            </Select>
        </FormControl>
    );
};

export default FilterByType;
