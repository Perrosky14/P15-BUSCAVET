import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, FormControl, InputLabel, Select, MenuItem, useTheme, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortButton from './SortButton';
import FilterByType from './FilterByType';

const AdvancedSearchModal = ({ style, onSortChange, onFilterChange, onSearchChange, initialSort, initialFilter, initialSearch }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState(initialSearch);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
        onSortChange(value);
    };

    const handleFilterChange = (value) => {
        setFilterOption(value);
        onFilterChange(value);
    };

    const handleSearchTypeChange = (event) => {
        const newSearchType = event.target.value;
        setSearchType(newSearchType);
        onSearchChange({ type: newSearchType, value: searchValue });
    };

    const handleSearchValueChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        onSearchChange({ type: searchType, value: newValue });
    };

    const handleReset = () => {
        setSortOption('');
        setFilterOption('');
        setSearchType('name');
        setSearchValue('');
        onSortChange('');
        onFilterChange('');
        onSearchChange({ type: 'name', value: '' });
    };

    return (
        <>
            <Button variant="outlined" sx={style} onClick={handleClickOpen}>
                Búsqueda avanzada
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Búsqueda avanzada</DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={3} mt={1}>
                        <SortButton onSortChange={handleSortChange} initialSort={sortOption} />
                        <FilterByType onFilterChange={handleFilterChange} initialFilter={filterOption} />
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="search-type-label">Buscar por</InputLabel>
                            <Select
                                labelId="search-type-label"
                                id="searchType"
                                value={searchType}
                                onChange={handleSearchTypeChange}
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
                            onChange={handleSearchValueChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleReset} sx={{ color: theme.palette.primary.main }}>
                        <RefreshIcon />
                    </IconButton>
                    <Button onClick={handleClose} sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdvancedSearchModal;
