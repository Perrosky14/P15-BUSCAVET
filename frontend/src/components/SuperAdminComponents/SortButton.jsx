import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SortButton = ({ onSortChange }) => {
    return (
        <div className="sort-button d-flex align-items-center mb-3">
            <label htmlFor="sortOptions" className="mr-2 sort-button">Ordenar por:</label>
            <select
                id="sortOptions"
                className="form-control w-auto sort-button"
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="rut">RUT</option>
                <option value="name">Nombre</option>
                <option value="tipo">Tipo</option>
            </select>
        </div>
    );
};

export default SortButton;
