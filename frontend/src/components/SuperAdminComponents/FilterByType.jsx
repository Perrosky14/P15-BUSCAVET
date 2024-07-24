import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FilterByType = ({ onFilterChange, initialFilter }) => {
    return (
        <FormControl
            variant="outlined"
            sx={{
                minWidth: 130,
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#ff436f',
                    },
                    '&:hover fieldset': {
                        borderColor: '#ff436f',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ff436f',
                    },
                    '& .MuiSelect-select': {
                        padding: '8px 14px',
                        fontSize: '14px',
                    },
                },
                '& .MuiInputLabel-root': {
                    color: '#ff436f',
                    fontSize: '14px',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#ff436f',
                },
                fontSize: '14px',
            }}
        >
            <InputLabel id="filter-options-label">Filtrar por tipo</InputLabel>
            <Select
                labelId="filter-options-label"
                id="filterOptions"
                value={initialFilter}
                onChange={(e) => onFilterChange(e.target.value)}
                label="Filtrar por tipo"
                MenuProps={{
                    PaperProps: {
                        sx: {
                            '& .MuiMenuItem-root': {
                                fontSize: '14px',
                                '&.Mui-selected': {
                                    backgroundColor: '#ff436f1a',
                                },
                                '&:hover': {
                                    backgroundColor: '#ff436f1a',
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
