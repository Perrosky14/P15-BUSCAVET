import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, IconButton, Modal, Button, TextField } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AssistantIcon from '@mui/icons-material/Assistant';
import PersonIcon from "@mui/icons-material/Person";

const styles = {
    detailItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px',
        border: '1px solid #f7f7f7',
        borderRadius: '4px',
        marginBottom: '8px',
        minHeight: '72px',
        boxShadow: '0 1px 3px rgba(255, 255, 255, 0.12)',
    },
    detailIcon: {
        color: '#FF4081',
        marginRight: '8px',
    },
    detailTextContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginRight: '8px',
    },
    attributeTitle: {
        color: '#B9B9B9',
        fontSize: '14px',
    },
    attributeValue: {
        fontWeight: 'bold',
        fontSize: '16px',
    },
    copyButton: {
        color: '#FF4081',
    },
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px',
    },
};

const VeterinariaDetails = ({ veterinaria, handleCopy, isEditMode, handleChange }) => {
    const [openPasswordModal, setOpenPasswordModal] = useState(false);
    const [passwordToShow, setPasswordToShow] = useState('');

    const handleOpenPasswordModal = (password) => {
        setPasswordToShow(password);
        setOpenPasswordModal(true);
    };

    const handleClosePasswordModal = () => {
        setOpenPasswordModal(false);
        setPasswordToShow('');
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LockIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Contraseña:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="contrasenia"
                                    value={veterinaria.contrasenia}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>
                                    <Button onClick={() => handleOpenPasswordModal(veterinaria.contrasenia)}>Mostrar</Button>
                                </Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID País:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_pais"
                                    value={veterinaria.id_pais}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_pais}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Segmento:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_segmento"
                                    value={veterinaria.id_segmento}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_segmento}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Tipo Institución Vet:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_tipo_institucion_vet"
                                    value={veterinaria.id_tipo_institucion_vet}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_tipo_institucion_vet}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Estado Institución:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_estado_institucion"
                                    value={veterinaria.id_estado_institucion}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_estado_institucion}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>RUT:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="rut"
                                    value={veterinaria.rut}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.rut}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.rut)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Razón Social:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="razon_social"
                                    value={veterinaria.razon_social}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.razon_social}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.razon_social)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Nombre Comercial:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="nombre_comercial"
                                    value={veterinaria.nombre_comercial}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.nombre_comercial}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.nombre_comercial)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid iteam xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PersonIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Nombre Representante Legal 1:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="nombre_1_rep_legal"
                                    value={veterinaria.nombre_1_rep_legal}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.nombre_1_rep_legal}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.nombre_1_rep_legal)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PersonIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Nombre Representante Legal 2:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="nombre_2_rep_legal"
                                    value={veterinaria.nombre_2_rep_legal}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.nombre_2_rep_legal}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.nombre_2_rep_legal)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <AssistantIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Reseña:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="resenia"
                                    value={veterinaria.resenia}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.resenia}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <CheckCircleIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Reseña Confirmada:</Typography>
                            <Typography sx={styles.attributeValue}>{veterinaria.resenia_confirmada ? 'Sí' : 'No'}</Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Dirección:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="direccion"
                                    value={veterinaria.direccion}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.direccion}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Número:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="numero"
                                    value={veterinaria.numero}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.numero}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Tipo:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="tipo"
                                    value={veterinaria.tipo}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.tipo}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PhoneIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Teléfono:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="telefono"
                                    value={veterinaria.telefono}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.telefono}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.telefono)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PhoneIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Código de Área:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="codigo_area"
                                    value={veterinaria.codigo_area}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.codigo_area}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PhoneIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Celular:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="celular"
                                    value={veterinaria.celular}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.celular}</Typography>
                            )}
                        </Box>
                        <IconButton sx={styles.copyButton} onClick={() => handleCopy(veterinaria.celular)}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Código Postal:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_codigo_postal"
                                    value={veterinaria.id_codigo_postal}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_codigo_postal}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Comuna:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_comuna"
                                    value={veterinaria.id_comuna}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_comuna}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Provincia:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_provincia"
                                    value={veterinaria.id_provincia}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_provincia}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Región:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_region"
                                    value={veterinaria.id_region}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_region}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LocationOnIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Geolocalización:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="geolocalizacion"
                                    value={veterinaria.geolocalizacion}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.geolocalizacion}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Zona BDoc:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_zona_BDoc"
                                    value={veterinaria.id_zona_BDoc}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_zona_BDoc}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Servicio:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_servicio"
                                    value={veterinaria.id_servicio}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{veterinaria.id_servicio}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        {veterinaria.validado ? (
                            <CheckCircleIcon sx={styles.detailIcon} />
                        ) : (
                            <CancelIcon sx={styles.detailIcon} />
                        )}
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Validado:</Typography>
                            <Typography sx={styles.attributeValue}>{veterinaria.validado ? 'Sí' : 'No'}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Modal
                open={openPasswordModal}
                onClose={handleClosePasswordModal}
                aria-labelledby="password-modal-title"
                aria-describedby="password-modal-description"
            >
                <Box sx={styles.modalBox}>
                    <Typography id="password-modal-title" variant="h6" component="h2">
                        Contraseña
                    </Typography>
                    <Typography id="password-modal-description" sx={{ mt: 2 }}>
                        {passwordToShow}
                    </Typography>
                    <Button onClick={handleClosePasswordModal} sx={{ mt: 2 }}>
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default VeterinariaDetails;