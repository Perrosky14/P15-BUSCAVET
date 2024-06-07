import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortButton = ({ onSortChange }) => {
    return (
        <FormControl
            variant="outlined"
            sx={{
                minWidth: 100, // Reducido el tamaño mínimo
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
            <InputLabel id="sort-options-label">Ordenar por</InputLabel>
            <Select
                labelId="sort-options-label"
                id="sortOptions"
                onChange={(e) => onSortChange(e.target.value)}
                label="Ordenar por"
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
                <MenuItem value="rut">RUT</MenuItem>
                <MenuItem value="name">Nombre</MenuItem>
                <MenuItem value="tipo">Tipo</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortButton;
