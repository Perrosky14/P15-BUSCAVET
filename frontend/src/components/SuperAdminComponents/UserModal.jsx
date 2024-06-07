import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
            <Dialog open={showModal} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {isEditMode ? 'Editar Usuario' : 'Detalles del Usuario'}
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant="body1"><strong>ID:</strong> {user.id}</Typography>
                    <Typography variant="body1"><strong>Nombre:</strong> {user.name}</Typography>
                    <Typography variant="body1"><strong>Tipo:</strong> {user.tipo}</Typography>
                </DialogContent>
                <DialogActions>
                    {isEditMode ? (
                        <Button
                            variant="contained"
                            style={buttonDetailsStyle}
                            onMouseEnter={() => setHoverDetails(true)}
                            onMouseLeave={() => setHoverDetails(false)}
                            onClick={handleEditDetailsClick}
                        >
                            Editar Detalles
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            style={buttonDetailsStyle}
                            onMouseEnter={() => setHoverDetails(true)}
                            onMouseLeave={() => setHoverDetails(false)}
                            onClick={handleDetailsClick}
                        >
                            Detalles
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        style={buttonCloseStyle}
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
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
