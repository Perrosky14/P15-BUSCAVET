import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterByType = ({ onFilterChange }) => {
    return (
        <div className="filter-by-type d-flex align-items-center mb-3">
            <label htmlFor="filterOptions" className="mr-2 filter-by-type">Filtrar por tipo:</label>
            <select
                id="filterOptions"
                className="form-control w-auto filter-by-type"
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="">Todos</option>
                <option value="Mascota">Mascota</option>
                <option value="Veterinaria">Veterinaria</option>
                <option value="Doctor">Doctor</option>
                <option value="Usuario">Usuario</option>
            </select>
        </div>
    );
};

export default FilterByType;
