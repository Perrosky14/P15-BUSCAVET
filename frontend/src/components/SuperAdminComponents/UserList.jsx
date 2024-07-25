import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import UserDetailsModal from './UserDetailsModal/UserDetailsModal';
import DeleteUserModal from './DeleteUserModal';
import AddUserModal from './AddUserModal';
import DoctorService from '../../services/DoctorService.jsx';
import UsuarioService from '../../services/UsuarioService.jsx';
import MascotaService from '../../services/MascotaService.jsx';
import VeterinariaService from '../../services/VeterinariaService.jsx';
import RefreshIcon from '@mui/icons-material/Refresh';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/themeComponent';
import UserComponent from './UserComponent';
import AdvancedSearchModal from './AdvanceSearchModal';

const styles = {
    container: {
        backgroundColor: '#FBFBFB',
        borderRadius: '16px',
        p: 0,
        width: '60%',
        maxWidth: '1200px',
        marginLeft: 2,
        overflowY: 'auto',
        height: '90vh',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 0.5,
    },
    header: {
        fontWeight: 'bold',
        color: '#ff436f',
        textAlign: 'center',
        fontSize: '24px',
    },
    recargarIcon: {
        color: '#FF4081',
        fontSize: '30px',
        mt: 2.5,
        mr: 1,
    },
    button: {
        borderRadius: '25px',
        border: '1px solid #FF4081',
        color: '#000000',
        padding: '10px 25px',
        textTransform: 'none',
        fontSize: '17px',
        height: '30px',
        mt: 2.5,
    },
    paginationButton: {
        mt: 0,
        mx: 1,
    },
};

const normalizeText = (text) => {
    if (typeof text !== 'string') return '';
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

const normalizeRut = (rut) => {
    if (typeof rut !== 'string') return '';
    return rut.replace(/[.\-]/g, '').toLowerCase();
};

const HeaderWithButton = ({ totalUsers, recargar, onSortChange, onFilterChange, onSearchChange, initialSort, initialFilter, initialSearchType, initialSearchValue }) => (
    <Box sx={styles.headerContainer}>
        <Box>
            <Typography variant="h6" sx={{ mb: -0.5, fontWeight: 'bold' }}>Usuarios en el Sistema</Typography>
            <Typography variant="subtitle1" sx={{ color: '#B9B9B9' }}>Hay {totalUsers} usuarios registrados</Typography>
        </Box>
        <Box>
            <IconButton
                sx={styles.recargarIcon}
                onClick={recargar}
            >
                <RefreshIcon />
            </IconButton>
            <AdvancedSearchModal
                style={styles.button}
                onSortChange={onSortChange}
                onFilterChange={onFilterChange}
                onSearchChange={onSearchChange}
                initialSort={initialSort}
                initialFilter={initialFilter}
                initialSearchType={initialSearchType}
                initialSearchValue={initialSearchValue}
            />
        </Box>
    </Box>
);

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [sortAttribute, setSortAttribute] = useState('id');
    const [filterType, setFilterType] = useState('');
    const [searchCriteria, setSearchCriteria] = useState({ type: 'name', value: '' });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const usersPerPage = 6; // Cambiado a 6 usuarios por página
    const [key, setKey] = useState(0);

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
    }, [key]);

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
        fetchData(); // Simplemente vuelve a cargar los datos sin modificar la paginación
        setKey(key + 1); // Este valor puede ser utilizado para forzar una recarga visual si es necesario
    };

    const handleSortChange = (attribute) => {
        setSortAttribute(attribute);
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1);
    };

    const handleSearchChange = (criteria) => {
        setSearchCriteria(criteria);
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

        if (searchCriteria.value) {
            filteredUsers = filteredUsers.filter(user => {
                if (searchCriteria.type === 'rut') {
                    return normalizeRut(user[searchCriteria.type] ?? '').includes(normalizeRut(searchCriteria.value));
                }
                return normalizeText(user[searchCriteria.type] ?? '').includes(normalizeText(searchCriteria.value));
            });
        }

        filteredUsers.sort((a, b) => {
            const aValue = normalizeText(a[sortAttribute] ?? '');
            const bValue = normalizeText(b[sortAttribute] ?? '');
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });

        return filteredUsers;
    }, [users, filterType, sortAttribute, searchCriteria]);

    const offset = (currentPage - 1) * usersPerPage;
    const currentPageData = filteredAndSortedUsers.slice(offset, offset + usersPerPage);

    return (
        <ThemeProvider theme={theme}>
            <Box key={key} sx={styles.container}>
                <HeaderWithButton
                    totalUsers={users.length}
                    recargar={reloadCurrentPage}
                    onSortChange={handleSortChange}
                    onFilterChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                    initialSort={sortAttribute}
                    initialFilter={filterType}
                    initialSearchType={searchCriteria.type}
                    initialSearchValue={searchCriteria.value}
                />
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={2}>
                    <Button
                        variant="outlined"
                        sx={{ borderColor: '#ff436f', color: '#ff436f', '&:hover': { backgroundColor: '#ff436f', color: 'white' } }}
                        onClick={() => setShowAddModal(true)}
                    >
                        Agregar Usuario
                    </Button>
                </Box>
                {currentPageData.length > 0 ? (
                    currentPageData.map(user => (
                        <UserComponent
                            key={user.id}
                            user={user}
                            onDelete={handleDeleteUser}
                            onView={handleShowModal}
                        />
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                        No hay usuarios para esta busqueda
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={currentPage === 1 || filteredAndSortedUsers.length === 0}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        sx={styles.paginationButton}
                        disabled={currentPage === Math.ceil(filteredAndSortedUsers.length / usersPerPage) || filteredAndSortedUsers.length === 0}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Siguiente
                    </Button>
                </Box>
                <UserDetailsModal
                    open={showModal}
                    handleClose={handleCloseModal}
                    user={selectedUser}
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
            </Box>
        </ThemeProvider>
    );
};

export default UserList;