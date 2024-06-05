import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmación</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button
                    style={buttonConfirmStyle}
                    onMouseEnter={() => setHoverConfirm(true)}
                    onMouseLeave={() => setHoverConfirm(false)}
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>
                <Button
                    style={buttonCancelStyle}
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;