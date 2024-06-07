import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel } from '@mui/material';
import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import MascotaService from '../../services/MascotaService';
import VeterinariaService from '../../services/VeterinariaService';

const AddUserModal = ({ show, handleClose, reloadCurrentPage }) => {
    const [hoverConfirm, setHoverConfirm] = useState(false);
    const [userData, setUserData] = useState({
        tipo: '',
        contrasenia: '',
        id_institucion_vet_1: '',
        id_institucion_vet_2: '',
        id_institucion_vet_3: '',
        id_pais: '',
        rut: '',
        matricula: '',
        nombre1: '',
        nombre2: '',
        apellido1: '',
        apellido2: '',
        id_genero: '',
        dia_nac: '',
        mes_nac: '',
        anio_nac: '',
        id_nacionalidad: '',
        id_especialidad_1: '',
        id_especialidad_2: '',
        id_especialidad_3: '',
        resenia: '',
        resenia_confirmada: '',
        id_estado_medico_vet: '',
        telefono: '',
        codigo_area: '',
        celular: '',
        id_convenio: '',
        email: '',
        RRSS1: '',
        RRSS2: '',
        asistente_nom: '',
        asistente_telefono: '',
        asistente_codigo_area: '',
        asistente_celular: '',
        otro: '',
        validado: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setUserData({
            ...userData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSaveUser = () => {
        const { tipo, ...data } = userData;

        switch (tipo) {
            case 'Doctor':
                DoctorService.createDoctor(data)
                    .then(response => {
                        console.log("User added:", response.data);
                        handleClose();
                        reloadCurrentPage();
                    })
                    .catch(error => {
                        console.error("There was an error adding the doctor!", error);
                    });
                break;
            case 'Usuario':
                UsuarioService.createUsuario(data)
                    .then(response => {
                        console.log("User added:", response.data);
                        handleClose();
                        reloadCurrentPage();
                    })
                    .catch(error => {
                        console.error("There was an error adding the usuario!", error);
                    });
                break;
            case 'Veterinaria':
                VeterinariaService.createVeterinaria(data)
                    .then(response => {
                        console.log("User added:", response.data);
                        handleClose();
                        reloadCurrentPage();
                    })
                    .catch(error => {
                        console.error("There was an error adding the veterinaria!", error);
                    });
                break;
            case 'Mascota':
                MascotaService.createMascota(data)
                    .then(response => {
                        console.log("User added:", response.data);
                        handleClose();
                        reloadCurrentPage();
                    })
                    .catch(error => {
                        console.error("There was an error adding the mascota!", error);
                    });
                break;
            default:
                console.error("Unknown user type:", tipo);
        }
    };

    const buttonConfirmStyle = {
        backgroundColor: hoverConfirm ? '#e03a5e' : '#ff436f',
        color: 'white',
    };

    const buttonCancelStyle = {
        backgroundColor: '#6c757d',
        color: 'white',
    };

    const renderCommonFields = () => (
        <>
            <TextField
                fullWidth
                margin="dense"
                label="Nombre 1"
                name="nombre1"
                value={userData.nombre1}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre 2"
                name="nombre2"
                value={userData.nombre2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Apellido 1"
                name="apellido1"
                value={userData.apellido1}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Apellido 2"
                name="apellido2"
                value={userData.apellido2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="RUT"
                name="rut"
                value={userData.rut}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Teléfono"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Celular"
                name="celular"
                value={userData.celular}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                variant="outlined"
            />
        </>
    );

    const renderDoctorForm = () => (
        <>
            {renderCommonFields()}
            <TextField
                fullWidth
                margin="dense"
                label="Contraseña"
                type="password"
                name="contrasenia"
                value={userData.contrasenia}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Institución Veterinaria 1"
                type="number"
                name="id_institucion_vet_1"
                value={userData.id_institucion_vet_1}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Institución Veterinaria 2"
                type="number"
                name="id_institucion_vet_2"
                value={userData.id_institucion_vet_2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Institución Veterinaria 3"
                type="number"
                name="id_institucion_vet_3"
                value={userData.id_institucion_vet_3}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="País"
                type="number"
                name="id_pais"
                value={userData.id_pais}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Matrícula"
                name="matricula"
                value={userData.matricula}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Género"
                type="number"
                name="id_genero"
                value={userData.id_genero}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Día de Nacimiento"
                type="number"
                name="dia_nac"
                value={userData.dia_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Mes de Nacimiento"
                type="number"
                name="mes_nac"
                value={userData.mes_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Año de Nacimiento"
                type="number"
                name="anio_nac"
                value={userData.anio_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nacionalidad"
                type="number"
                name="id_nacionalidad"
                value={userData.id_nacionalidad}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Especialidad 1"
                type="number"
                name="id_especialidad_1"
                value={userData.id_especialidad_1}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Especialidad 2"
                type="number"
                name="id_especialidad_2"
                value={userData.id_especialidad_2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Especialidad 3"
                type="number"
                name="id_especialidad_3"
                value={userData.id_especialidad_3}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Reseña"
                name="resenia"
                value={userData.resenia}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Reseña Confirmada"
                name="resenia_confirmada"
                value={userData.resenia_confirmada}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Estado Médico Veterinario"
                type="number"
                name="id_estado_medico_vet"
                value={userData.id_estado_medico_vet}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Código de Área"
                name="codigo_area"
                value={userData.codigo_area}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Red Social 1"
                name="RRSS1"
                value={userData.RRSS1}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Red Social 2"
                name="RRSS2"
                value={userData.RRSS2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre del Asistente"
                name="asistente_nom"
                value={userData.asistente_nom}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Teléfono del Asistente"
                name="asistente_telefono"
                value={userData.asistente_telefono}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Código de Área del Asistente"
                name="asistente_codigo_area"
                value={userData.asistente_codigo_area}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Celular del Asistente"
                name="asistente_celular"
                value={userData.asistente_celular}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Otro"
                name="otro"
                value={userData.otro}
                onChange={handleChange}
                variant="outlined"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={userData.validado}
                        onChange={handleChange}
                        name="validado"
                        color="primary"
                    />
                }
                label="Validado"
            />
        </>
    );

    const renderUsuarioForm = () => (
        <>
            {renderCommonFields()}
            <TextField
                fullWidth
                margin="dense"
                label="Dirección"
                name="direccion"
                value={userData.direccion}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Número"
                name="numero"
                value={userData.numero}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Tipo"
                name="tipo"
                value={userData.tipo}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Código Postal"
                type="number"
                name="id_codigo_postal"
                value={userData.id_codigo_postal}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Comuna"
                type="number"
                name="id_comuna"
                value={userData.id_comuna}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Provincia"
                type="number"
                name="id_provincia"
                value={userData.id_provincia}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Región"
                type="number"
                name="id_region"
                value={userData.id_region}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Geolocalización"
                name="geolocalizacion"
                value={userData.geolocalizacion}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Zona BDoc"
                type="number"
                name="id_zona_BDoc"
                value={userData.id_zona_BDoc}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Otro 2"
                name="otro2"
                value={userData.otro2}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Otro 3"
                name="otro3"
                value={userData.otro3}
                onChange={handleChange}
                variant="outlined"
            />
        </>
    );

    const renderVeterinariaForm = () => (
        <>
            {renderCommonFields()}
            <TextField
                fullWidth
                margin="dense"
                label="Contraseña"
                type="password"
                name="contrasenia"
                value={userData.contrasenia}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Segmento"
                type="number"
                name="id_segmento"
                value={userData.id_segmento}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Tipo de Institución Veterinaria"
                type="number"
                name="id_tipo_institucion_vet"
                value={userData.id_tipo_institucion_vet}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Estado de la Institución"
                type="number"
                name="id_estado_institucion"
                value={userData.id_estado_institucion}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Razón Social"
                name="razon_social"
                value={userData.razon_social}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre Comercial"
                name="nombre_comercial"
                value={userData.nombre_comercial}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre 1 Representante Legal"
                name="nombre_1_rep_legal"
                value={userData.nombre_1_rep_legal}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre 2 Representante Legal"
                name="nombre_2_rep_legal"
                value={userData.nombre_2_rep_legal}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Dirección"
                name="direccion"
                value={userData.direccion}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Número"
                name="numero"
                value={userData.numero}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Código Postal"
                type="number"
                name="id_codigo_postal"
                value={userData.id_codigo_postal}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Comuna"
                type="number"
                name="id_comuna"
                value={userData.id_comuna}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Provincia"
                type="number"
                name="id_provincia"
                value={userData.id_provincia}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Región"
                type="number"
                name="id_region"
                value={userData.id_region}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Geolocalización"
                name="geolocalizacion"
                value={userData.geolocalizacion}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Zona BDoc"
                type="number"
                name="id_zona_BDoc"
                value={userData.id_zona_BDoc}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Servicio"
                type="number"
                name="id_servicio"
                value={userData.id_servicio}
                onChange={handleChange}
                variant="outlined"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={userData.validado}
                        onChange={handleChange}
                        name="validado"
                        color="primary"
                    />
                }
                label="Validado"
            />
        </>
    );

    const renderMascotaForm = () => (
        <>
            <TextField
                fullWidth
                margin="dense"
                label="Categoría Animal"
                type="number"
                name="id_categoria_animal"
                value={userData.id_categoria_animal}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Especie"
                type="number"
                name="id_especie"
                value={userData.id_especie}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Raza"
                type="number"
                name="id_raza"
                value={userData.id_raza}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Sexo"
                type="number"
                name="id_sexo"
                value={userData.id_sexo}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Día de Nacimiento"
                type="number"
                name="dia_nac"
                value={userData.dia_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Mes de Nacimiento"
                type="number"
                name="mes_nac"
                value={userData.mes_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Año de Nacimiento"
                type="number"
                name="anio_nac"
                value={userData.anio_nac}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Historial de Consulta"
                name="historial_consulta"
                value={userData.historial_consulta}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Estatura"
                type="number"
                name="estatura"
                value={userData.estatura}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Color"
                name="color"
                value={userData.color}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Peso"
                type="number"
                name="peso"
                value={userData.peso}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Otro"
                name="otro"
                value={userData.otro}
                onChange={handleChange}
                variant="outlined"
            />
            <TextField
                fullWidth
                margin="dense"
                label="Otro 2"
                name="otro2"
                value={userData.otro2}
                onChange={handleChange}
                variant="outlined"
            />
        </>
    );

    return (
        <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Agregar Usuario</DialogTitle>
            <DialogContent dividers>
                <FormControl fullWidth margin="dense" variant="outlined">
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        name="tipo"
                        value={userData.tipo}
                        onChange={handleChange}
                        label="Tipo"
                    >
                        <MenuItem value="">Seleccione un tipo</MenuItem>
                        <MenuItem value="Doctor">Doctor</MenuItem>
                        <MenuItem value="Usuario">Usuario</MenuItem>
                        <MenuItem value="Veterinaria">Veterinaria</MenuItem>
                        <MenuItem value="Mascota">Mascota</MenuItem>
                    </Select>
                </FormControl>
                {userData.tipo === 'Doctor' && renderDoctorForm()}
                {userData.tipo === 'Usuario' && renderUsuarioForm()}
                {userData.tipo === 'Veterinaria' && renderVeterinariaForm()}
                {userData.tipo === 'Mascota' && renderMascotaForm()}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSaveUser}
                    onMouseEnter={() => setHoverConfirm(true)}
                    onMouseLeave={() => setHoverConfirm(false)}
                    style={buttonConfirmStyle}
                >
                    Guardar
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

export default AddUserModal;
