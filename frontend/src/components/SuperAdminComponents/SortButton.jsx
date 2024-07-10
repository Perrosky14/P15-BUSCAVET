import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortButton = ({ onSortChange, initialSort }) => {
    return (
        <FormControl
            variant="outlined"
            sx={{
                minWidth: 100,
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
            <InputLabel id="sort-options-label">Ordenar por</InputLabel>
            <Select
                labelId="sort-options-label"
                id="sortOptions"
                value={initialSort}
                onChange={(e) => onSortChange(e.target.value)}
                label="Ordenar por"
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
                <MenuItem value="rut">RUT</MenuItem>
                <MenuItem value="name">Nombre</MenuItem>
                <MenuItem value="tipo">Tipo</MenuItem>
            </Select>
        </FormControl>
    );
};

export default SortButton;
