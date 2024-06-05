import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailsModal from './UserDetailsModal';

const UserModal = ({ showModal, handleClose, userDetails, isEditMode, handleSave }) => {
    const [user, setUser] = useState(userDetails);
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverDetails, setHoverDetails] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [isEditingDetails, setIsEditingDetails] = useState(false);

    useEffect(() => {
        setUser(userDetails);
    }, [userDetails]);

    const handleDetailsClick = () => {
        setShowDetailsModal(true);
        setIsEditingDetails(false); // Ensure it starts with false
    };

    const handleEditDetailsClick = () => {
        setShowDetailsModal(true);
        setIsEditingDetails(true);
    };

    const buttonCloseStyle = {
        backgroundColor: hoverClose ? '#e03a5e' : '#ff436f',
        borderColor: hoverClose ? '#e03a5e' : '#ff436f',
        color: 'white'
    };

    const buttonDetailsStyle = {
        backgroundColor: hoverDetails ? '#4CAF50' : '#6EC732',
        borderColor: hoverDetails ? '#4CAF50' : '#6EC732',
        color: 'white'
    };

    const handleDetailsModalClose = () => {
        setShowDetailsModal(false);
        setIsEditingDetails(false); // Reset isEditingDetails to false
    };

    return (
        <>
            <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{isEditMode ? 'Editar Usuario' : 'Detalles del Usuario'}</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={handleClose}
                                aria-label="Close"
                                style={{ position: 'absolute', right: '15px', top: '15px' }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p><strong>ID:</strong> {user.id}</p>
                            <p><strong>Nombre:</strong> {user.name}</p>
                            <p><strong>Tipo:</strong> {user.tipo}</p>
                        </div>
                        <div className="modal-footer">
                            {isEditMode ? (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={buttonDetailsStyle}
                                    onMouseEnter={() => setHoverDetails(true)}
                                    onMouseLeave={() => setHoverDetails(false)}
                                    onClick={handleEditDetailsClick}
                                >
                                    Editar Detalles
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    style={buttonDetailsStyle}
                                    onMouseEnter={() => setHoverDetails(true)}
                                    onMouseLeave={() => setHoverDetails(false)}
                                    onClick={handleDetailsClick}
                                >
                                    Detalles
                                </button>
                            )}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                                style={buttonCloseStyle}
                                onMouseEnter={() => setHoverClose(true)}
                                onMouseLeave={() => setHoverClose(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <UserDetailsModal
                showModal={showDetailsModal}
                handleClose={handleDetailsModalClose}
                userDetails={user}
                isEditMode={isEditingDetails}
            />
        </>
    );
};

export default UserModal;
