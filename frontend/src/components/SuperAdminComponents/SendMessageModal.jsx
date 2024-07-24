import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider } from '@mui/material/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa el estilo por defecto
import theme from '../styles/themeComponent';

// Estilos personalizados para ReactQuill para incluir la fuente Commissioner
const customStyles = `
    .ql-font-Commissioner {
        font-family: 'Commissioner', sans-serif;
    }
`;

const styles = {
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Ancho aumentado para acomodar más opciones
        maxHeight: '90vh', // Altura máxima para evitar overflow
        overflowY: 'auto',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '1rem', // 16px / 16 = 1rem
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
    },
    closeButton: {
        color: '#ff436f',
    },
    formField: {
        mt: 2,
        mb: 2,
    },
    sendButton: {
        mt: 2,
        backgroundColor: '#ff436f',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#ff2d55',
        },
    },
    quillContainer: {
        height: '400px', // Altura fija para el editor
    },
};

const SendMessageModal = ({ open, handleClose, user }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);
    }, []);

    const handleSendMessage = () => {
        // Lógica para enviar el mensaje
        console.log(`Mensaje enviado a ${user.email}: ${message}`);
        handleClose();
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.modalBox}>
                    <Box sx={styles.header}>
                        <Typography variant="h6">
                            Enviar Mensaje a: <strong>{user.email}</strong>
                        </Typography>
                        <IconButton onClick={handleClose} sx={styles.closeButton}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <ReactQuill
                        value={message}
                        onChange={setMessage}
                        theme="snow"
                        modules={{
                            toolbar: [
                                [{ 'font': ['sans-serif', 'serif', 'monospace', 'Commissioner'] }],
                                [{ 'size': [] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'color': [] }, { 'background': [] }],
                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                [{ 'direction': 'rtl' }, { 'align': [] }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ],
                        }}
                        style={styles.quillContainer}
                        formats={[
                            'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
                            'script', 'header', 'blockquote', 'code-block', 'list', 'bullet', 'indent', 'direction',
                            'align', 'link', 'image', 'video'
                        ]}
                    />
                    <Button
                        sx={styles.sendButton}
                        fullWidth
                        startIcon={<SendIcon />}
                        onClick={handleSendMessage}
                    >
                        Enviar
                    </Button>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default SendMessageModal;