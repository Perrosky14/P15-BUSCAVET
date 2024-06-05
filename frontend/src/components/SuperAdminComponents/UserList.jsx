import React, { useState, useEffect, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import UserDetailsModal from './UserDetailsModal';
import DeleteUserModal from './DeleteUserModal'; // Importa el nuevo componente
import AddUserModal from './AddUserModal'; // Importa el nuevo componente
import SortButton from './SortButton';
import FilterByType from './FilterByType';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomAdminControl.css';
import './pagination.css';

import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import MascotaService from '../../services/MascotaService';
import VeterinariaService from '../../services/VeterinariaService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [sortAttribute, setSortAttribute] = useState('id');
    const [filterType, setFilterType] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación
    const [showAddModal, setShowAddModal] = useState(false); // Estado para el modal de agregar usuario
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

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
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
        fetchData(); // No need to reset the page
    };

    const handleSortChange = (attribute) => {
        setSortAttribute(attribute);
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(0); // Reset page to 0 when filter changes
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (userId) => {
        // Lógica para eliminar el usuario. Reemplaza esto con la llamada a tu API o servicio.
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

    const offset = currentPage * usersPerPage;
    const currentPageData = filteredAndSortedUsers.slice(offset, offset + usersPerPage);

    return (
        <div className="container">
            <h2 className="text-center my-4">Lista de Usuarios</h2>
            <div className="row mb-3">
                <div className="col d-flex justify-content-between align-items-center">
                    <button className="btn btn-custom-add" onClick={() => setShowAddModal(true)}>Agregar Usuario</button>
                    <div className="d-flex">
                        <FilterByType onFilterChange={handleFilterChange} />
                        <SortButton onSortChange={handleSortChange} className="spacing-left" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-striped table-bordered table-custom-bg">
                        <thead className="thead-custom">
                        <tr>
                            <th>ID</th>
                            <th>RUT</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPageData.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.rut}</td>
                                <td>{user.name}</td>
                                <td>{user.tipo}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-custom btn-custom-view"
                                        onClick={() => handleShowModal(user, false)}
                                    >
                                        Ver
                                    </button>
                                    <button
                                        className="btn btn-sm btn-custom btn-custom-edit"
                                        onClick={() => handleShowModal(user, true)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-custom btn-custom-delete"
                                        onClick={() => handleDeleteUser(user)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={"← Anterior"}
                        nextLabel={"Siguiente →"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(filteredAndSortedUsers.length / usersPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-number"}
                        previousClassName={"previous"}
                        nextClassName={"next"}
                    />
                </div>
            </div>
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
                reloadCurrentPage={reloadCurrentPage} // Pasar la función de recarga
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
