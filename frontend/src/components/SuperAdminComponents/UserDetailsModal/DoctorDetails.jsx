import React, { useState } from 'react';
import { Grid, Paper, Typography, Box, IconButton, Modal, Button, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BusinessIcon from '@mui/icons-material/Business';
import WCIcon from '@mui/icons-material/Wc';
import AssistantIcon from '@mui/icons-material/Assistant';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

const DoctorDetails = ({ doctor, handleCopy, isEditMode, handleChange }) => {
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
                                    value={doctor.nombre1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.nombre1} {doctor.nombre2}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${doctor.nombre1} ${doctor.nombre2}`)}>
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
                                    value={doctor.apellido1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.apellido1} {doctor.apellido2}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${doctor.apellido1} ${doctor.apellido2}`)}>
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
                                    value={doctor.email}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.email}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.email)}>
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
                                    value={doctor.telefono}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.telefono}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.telefono)}>
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
                                    value={doctor.celular}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.celular}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.celular)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PhoneIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Asistente Teléfono:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="asistente_telefono"
                                    value={doctor.asistente_telefono}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.asistente_telefono}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.asistente_telefono)}>
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
                                    value={doctor.rut}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.rut}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.rut)}>
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
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="password"
                                    name="contrasenia"
                                    value={doctor.contrasenia}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>
                                    <Button onClick={() => handleOpenPasswordModal(doctor.contrasenia)}>Mostrar</Button>
                                </Typography>
                            )}
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
                                    value={`${doctor.dia_nac}/${doctor.mes_nac}/${doctor.anio_nac}`}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{`${doctor.dia_nac}/${doctor.mes_nac}/${doctor.anio_nac}`}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${doctor.dia_nac}/${doctor.mes_nac}/${doctor.anio_nac}`)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <AssistantIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Asistente Nombre:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="asistente_nom"
                                    value={doctor.asistente_nom}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.asistente_nom}</Typography>
                            )}
                        </Box>
                        {!isEditMode && (
                            <IconButton sx={styles.copyButton} onClick={() => handleCopy(doctor.asistente_nom)}>
                                <ContentCopyIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Nacionalidad:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_nacionalidad"
                                    value={doctor.id_nacionalidad}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_nacionalidad}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Especialidad 1:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_especialidad_1"
                                    value={doctor.id_especialidad_1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_especialidad_1}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Especialidad 2:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_especialidad_2"
                                    value={doctor.id_especialidad_2}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_especialidad_2}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Especialidad 3:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_especialidad_3"
                                    value={doctor.id_especialidad_3}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_especialidad_3}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <PublicIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Estado Médico Vet:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_estado_medico_vet"
                                    value={doctor.id_estado_medico_vet}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_estado_medico_vet}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Institución Vet 1:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_institucion_vet_1"
                                    value={doctor.id_institucion_vet_1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_institucion_vet_1}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Institución Vet 2:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_institucion_vet_2"
                                    value={doctor.id_institucion_vet_2}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_institucion_vet_2}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <BusinessIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Institución Vet 3:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_institucion_vet_3"
                                    value={doctor.id_institucion_vet_3}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_institucion_vet_3}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <WCIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Género:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_genero"
                                    value={doctor.id_genero}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_genero}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        <LanguageIcon sx={styles.detailIcon} />
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>ID Convenio:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="id_convenio"
                                    value={doctor.id_convenio}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.id_convenio}</Typography>
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
                                    value={doctor.rrss1}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.rrss1}</Typography>
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
                                    value={doctor.rrss2}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.rrss2}</Typography>
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
                                    value={doctor.otro}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.otro}</Typography>
                            )}
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={styles.detailItem}>
                        {doctor.validado ? (
                            <CheckCircleIcon sx={styles.detailIcon} />
                        ) : (
                            <CancelIcon sx={styles.detailIcon} />
                        )}
                        <Box sx={styles.detailTextContainer}>
                            <Typography sx={styles.attributeTitle}>Validado:</Typography>
                            {isEditMode ? (
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="validado"
                                    value={doctor.validado ? 'Sí' : 'No'}
                                    onChange={handleChange}
                                />
                            ) : (
                                <Typography sx={styles.attributeValue}>{doctor.validado ? 'Sí' : 'No'}</Typography>
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

export default DoctorDetails;