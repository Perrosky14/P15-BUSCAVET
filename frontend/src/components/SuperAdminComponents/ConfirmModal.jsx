import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ConfirmModal = ({ show, handleClose, handleConfirm, message }) => {
    const [hoverConfirm, setHoverConfirm] = useState(false);

    const buttonConfirmStyle = {
        backgroundColor: hoverConfirm ? '#e03a5e' : '#ff436f',
        borderColor: hoverConfirm ? '#e03a5e' : '#ff436f',
        color: 'white'
    };

    const buttonCancelStyle = {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        color: 'white'
    };

    return (
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle>Confirmación</DialogTitle>
            <DialogContent dividers>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleConfirm}
                    onMouseEnter={() => setHoverConfirm(true)}
                    onMouseLeave={() => setHoverConfirm(false)}
                    style={buttonConfirmStyle}
                >
                    Confirmar
                </Button>
                <Button
                    onClick={handleClose}
                    style={buttonCancelStyle}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;
