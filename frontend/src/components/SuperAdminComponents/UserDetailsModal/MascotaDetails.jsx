import React from 'react';
import { Grid, Paper, Typography, Box, IconButton, TextField } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';

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
};

const MascotaDetails = ({ mascota, isEditMode, handleChange, handleCopy }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PetsIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>ID Categoría Animal:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="id_categoria_animal"
                                value={mascota.id_categoria_animal}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.id_categoria_animal}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PetsIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>ID Especie:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="id_especie"
                                value={mascota.id_especie}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.id_especie}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PetsIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>ID Raza:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="id_raza"
                                value={mascota.id_raza}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.id_raza}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PetsIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>ID Sexo:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="id_sexo"
                                value={mascota.id_sexo}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.id_sexo}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PersonIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Nombre:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="nombre"
                                value={mascota.nombre}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.nombre}</Typography>
                        )}
                    </Box>
                    <IconButton sx={styles.copyButton} onClick={() => handleCopy(mascota.nombre)}>
                        <ContentCopyIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <CalendarTodayIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Fecha de Nacimiento:</Typography>
                        {isEditMode ? (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="dia_nac"
                                    value={mascota.dia_nac}
                                    onChange={handleChange}
                                    sx={{ width: '33%' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="mes_nac"
                                    value={mascota.mes_nac}
                                    onChange={handleChange}
                                    sx={{ width: '33%' }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="anio_nac"
                                    value={mascota.anio_nac}
                                    onChange={handleChange}
                                    sx={{ width: '33%' }}
                                />
                            </Box>
                        ) : (
                            <Typography sx={styles.attributeValue}>{`${mascota.dia_nac}/${mascota.mes_nac}/${mascota.anio_nac}`}</Typography>
                        )}
                    </Box>
                    <IconButton sx={styles.copyButton} onClick={() => handleCopy(`${mascota.dia_nac}/${mascota.mes_nac}/${mascota.anio_nac}`)}>
                        <ContentCopyIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <InfoIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Otro:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="otro"
                                value={mascota.otro}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.otro}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <HistoryIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Historial de Consulta:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="historial_consulta"
                                value={mascota.historial_consulta}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.historial_consulta}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <HeightIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Estatura:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="estatura"
                                value={mascota.estatura}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.estatura}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <ColorLensIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Color:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="color"
                                value={mascota.color}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.color}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <FitnessCenterIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Peso:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="peso"
                                value={mascota.peso}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.peso}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <InfoIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>Otro 2:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="otro2"
                                value={mascota.otro2}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.otro2}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={styles.detailItem}>
                    <PersonIcon sx={styles.detailIcon} />
                    <Box sx={styles.detailTextContainer}>
                        <Typography sx={styles.attributeTitle}>ID Usuario Asociado:</Typography>
                        {isEditMode ? (
                            <TextField
                                fullWidth
                                variant="outlined"
                                name="usuario"
                                value={mascota.usuario ? mascota.usuario.id : 'Sin Dueño'}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography sx={styles.attributeValue}>{mascota.usuario ? mascota.usuario.id : 'Sin Dueño'}</Typography>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MascotaDetails;