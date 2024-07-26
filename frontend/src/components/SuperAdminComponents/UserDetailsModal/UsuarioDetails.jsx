import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, IconButton, Modal, Button, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WCIcon from '@mui/icons-material/Wc';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssistantIcon from '@mui/icons-material/Assistant';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

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

const UsuarioDetails = ({ usuario, handleCopy, isEditMode, handleChange }) => {
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
                        <PersonIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Nombres:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="nombre1"
                                    value={usuario.nombre1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.nombre1} {usuario.nombre2}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${usuario.nombre1} ${usuario.nombre2}`)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PersonIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Apellidos:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="apellido1"
                                    value={usuario.apellido1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.apellido1} {usuario.apellido2}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${usuario.apellido1} ${usuario.apellido2}`)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <EmailIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Email:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    value={usuario.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.email}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(usuario.email)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
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
                                    value={usuario.telefono}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.telefono}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(usuario.telefono)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
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
                                    value={usuario.celular}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.celular}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(usuario.celular)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LockIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Contraseña:</Typography>
                            <Typography sx={styles.attributeValue}>
                                <Button onClick={() => handleOpenPasswordModal(usuario.contrasenia)}>Mostrar</Button>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <CalendarTodayIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Fecha de Nacimiento:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="fecha_nacimiento"
                                    value={`${usuario.dia_nac}/${usuario.mes_nac}/${usuario.anio_nac}`}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{`${usuario.dia_nac}/${usuario.mes_nac}/${usuario.anio_nac}`}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${usuario.dia_nac}/${usuario.mes_nac}/${usuario.anio_nac}`)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PersonIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>RUT:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="rut"
                                    value={usuario.rut}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.rut}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(usuario.rut)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <AssistantIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Dirección:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="direccion"
                                    value={usuario.direccion}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.direccion}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <HomeIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Número:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="numero"
                                    value={usuario.numero}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.numero}</Typography>
                            )}
                        </Box>
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
                                    value={usuario.id_codigo_postal}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.id_codigo_postal}</Typography>
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
                                    value={usuario.id_comuna}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.id_comuna}</Typography>
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
                                    value={usuario.id_provincia}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.id_provincia}</Typography>
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
                                    value={usuario.id_region}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.id_region}</Typography>
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
                                    value={usuario.geolocalizacion}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.geolocalizacion}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Zona BDoc:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_zona_BDoc"
                                    value={usuario.id_zona_BDoc}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.id_zona_BDoc}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>RRSS1:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="rrss1"
                                    value={usuario.rrss1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.rrss1}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>RRSS2:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="rrss2"
                                    value={usuario.rrss2}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.rrss2}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Otro:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="otro"
                                    value={usuario.otro}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{usuario.otro}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Modal
                open={openPasswordModal}
                onClose={handleClosePasswordModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={styles.modalBox}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Contraseña
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {passwordToShow}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button onClick={handleClosePasswordModal}>Cerrar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default UsuarioDetails;