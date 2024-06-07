import React, { useState, useEffect, useMemo } from 'react';
import Pagination from '@mui/material/Pagination';
import UserDetailsModal from './UserDetailsModal';
import DeleteUserModal from './DeleteUserModal';
import AddUserModal from './AddUserModal';
import SortButton from './SortButton';
import FilterByType from './FilterByType';
import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import MascotaService from '../../services/MascotaService';
import VeterinariaService from '../../services/VeterinariaService';
import { Button, Box } from '@mui/material';

const styles = {
    container: {
        maxWidth: '1200px',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        overflowY: 'auto',
        height: '90vh',  // Adjust height to make sure it allows scrolling
    },
    header: {
        fontWeight: 600,
        color: '#ff436f',
        textAlign: 'center',
        fontSize: '24px',
    },
    table: {
        width: '100%',
        tableLayout: 'fixed',
        borderCollapse: 'collapse',
        marginTop: '10px',
    },
    tableHeader: {
        backgroundColor: '#f5f5f5',
    },
    tableCell: {
        border: '1px solid #ddd',
        padding: '8px', // Reduce padding for better fit
        fontSize: '16px', // Adjust font size
    },
    button: {
        border: '1px solid #ff436f', // Border color to pink
        borderRadius: '5px',
        padding: '4px 8px', // Adjust padding for better fit
        fontWeight: 600,
        transition: 'background-color 0.3s ease, color 0.3s ease',
        marginRight: '5px',
        fontSize: '12px',
        cursor: 'pointer',
        color: '#ff436f', // Font color to pink
        '&:hover': {
            backgroundColor: '#ff436f',
            color: 'white',
            borderColor: '#ff436f', // Ensure border color stays pink on hover
        },
        '&:focus': {
            borderColor: '#ff436f', // Ensure border color stays pink on focus
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(255, 67, 111, 0.5)', // Optional: Add pink shadow for focus
        },
    },
    buttonHover: {
        backgroundColor: '#ff436f',
        color: 'white',
    },
    pagination: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
    },
    paginationButton: {
        '& .MuiPaginationItem-root': {
            color: '#ff436f',
        },
        '& .Mui-selected': {
            backgroundColor: '#ff436f !important',
            color: 'white',
        },
    },
    formControl: {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
    },
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [sortAttribute, setSortAttribute] = useState('id');
    const [filterType, setFilterType] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const usersPerPage = 10;

    const fetchData = async () => {
        try {
            const [doctorsResponse, usuariosResponse, mascotasResponse, veterinariasResponse] = await Promise.all([
                DoctorService.getDoctors(),
                UsuarioService.getUsuarios(),
                MascotaService.getMascotas(),
                VeterinariaService.getVeterinarias()
            ]);

            const doctors = doctorsResponse.data.map(doctor => ({
                ...doctor,
                id: `D-${doctor.id}`,
                name: `${doctor.nombre1} ${doctor.apellido1}`,
                tipo: 'Doctor'
            }));

            const usuarios = usuariosResponse.data.map(usuario => ({
                ...usuario,
                id: `U-${usuario.id}`,
                name: `${usuario.nombre1} ${usuario.apellido1}`,
                tipo: 'Usuario'
            }));

            const mascotas = mascotasResponse.data.map(mascota => ({
                ...mascota,
                id: `M-${mascota.id}`,
                name: mascota.nombre,
                tipo: 'Mascota'
            }));

            const veterinarias = veterinariasResponse.data.map(veterinaria => ({
                ...veterinaria,
                id: `V-${veterinaria.id}`,
                name: veterinaria.nombre_comercial,
                tipo: 'Veterinaria'
            }));

            setUsers([...doctors, ...usuarios, ...mascotas, ...veterinarias]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleShowModal = (user, editMode = false) => {
        setSelectedUser(user);
        setIsEditMode(editMode);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser({});
    };

    const handleSaveUser = (updatedUser) => {
        const updatedUsers = users.map(user => user.id === updatedUser.id ? updatedUser : user);
        setUsers(updatedUsers);
    };

    const reloadCurrentPage = () => {
        fetchData();
    };

    const handleSortChange = (attribute) => {
        setSortAttribute(attribute);
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (userId) => {
        setUsers(users.filter(user => user.id !== userId));
        setShowDeleteModal(false);
    };

    const filteredAndSortedUsers = useMemo(() => {
        let filteredUsers = filterType ? users.filter(user => user.tipo === filterType) : users;

        filteredUsers.sort((a, b) => {
            if (a[sortAttribute] < b[sortAttribute]) return -1;
            if (a[sortAttribute] > b[sortAttribute]) return 1;
            return 0;
        });

        return filteredUsers;
    }, [users, filterType, sortAttribute]);

    const offset = (currentPage - 1) * usersPerPage;
    const currentPageData = filteredAndSortedUsers.slice(offset, offset + usersPerPage);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Lista de Usuarios</h2>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Button
                    variant="outlined"
                    sx={{ borderColor: '#ff436f', color: '#ff436f', '&:hover': { backgroundColor: '#ff436f', color: 'white' } }}
                    onClick={() => setShowAddModal(true)}
                >
                    Agregar Usuario
                </Button>
                <Box display="flex" alignItems="center">
                    <FilterByType onFilterChange={handleFilterChange} />
                    <SortButton onSortChange={handleSortChange} sx={{ ml: 2 }} />
                </Box>
            </Box>
            <table style={styles.table}>
                <thead style={styles.tableHeader}>
                <tr>
                    <th style={styles.tableCell}>ID</th>
                    <th style={styles.tableCell}>RUT</th>
                    <th style={styles.tableCell}>Nombre</th>
                    <th style={styles.tableCell}>Tipo</th>
                    <th style={styles.tableCell}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {currentPageData.map(user => (
                    <tr key={user.id}>
                        <td style={styles.tableCell}>{user.id}</td>
                        <td style={styles.tableCell}>{user.rut}</td>
                        <td style={styles.tableCell}>{user.name}</td>
                        <td style={styles.tableCell}>{user.tipo}</td>
                        <td style={styles.tableCell}>
                            <Button
                                variant="outlined"
                                sx={{ ...styles.button }}
                                onClick={() => handleShowModal(user, false)}
                            >
                                Ver
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ ...styles.button }}
                                onClick={() => handleShowModal(user, true)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ ...styles.button }}
                                onClick={() => handleDeleteUser(user)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                count={Math.ceil(filteredAndSortedUsers.length / usersPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ ...styles.pagination, ...styles.paginationButton }}
            />
            <UserDetailsModal
                showModal={showModal}
                handleClose={handleCloseModal}
                userDetails={selectedUser}
                isEditMode={isEditMode}
                reloadCurrentPage={reloadCurrentPage}
            />
            <DeleteUserModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                user={selectedUser}
                handleDelete={handleConfirmDelete}
                reloadCurrentPage={reloadCurrentPage}
            />
            <AddUserModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                reloadCurrentPage={reloadCurrentPage}
            />
        </div>
    );
};

export default UserList;

