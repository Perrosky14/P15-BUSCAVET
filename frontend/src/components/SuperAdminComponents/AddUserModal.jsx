import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
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
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
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
        borderColor: hoverConfirm ? '#e03a5e' : '#ff436f',
        color: 'white'
    };

    const buttonCancelStyle = {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        color: 'white'
    };

    const renderCommonFields = () => (
        <>
            <Form.Group controlId="formNombre1">
                <Form.Label>Nombre 1</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre1"
                    value={userData.nombre1}
                    onChange={handleChange}
                    placeholder="Nombre 1"
                />
            </Form.Group>
            <Form.Group controlId="formNombre2">
                <Form.Label>Nombre 2</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre2"
                    value={userData.nombre2}
                    onChange={handleChange}
                    placeholder="Nombre 2"
                />
            </Form.Group>
            <Form.Group controlId="formApellido1">
                <Form.Label>Apellido 1</Form.Label>
                <Form.Control
                    type="text"
                    name="apellido1"
                    value={userData.apellido1}
                    onChange={handleChange}
                    placeholder="Apellido 1"
                />
            </Form.Group>
            <Form.Group controlId="formApellido2">
                <Form.Label>Apellido 2</Form.Label>
                <Form.Control
                    type="text"
                    name="apellido2"
                    value={userData.apellido2}
                    onChange={handleChange}
                    placeholder="Apellido 2"
                />
            </Form.Group>
            <Form.Group controlId="formRut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                    type="text"
                    name="rut"
                    value={userData.rut}
                    onChange={handleChange}
                    placeholder="RUT"
                />
            </Form.Group>
            <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                    type="text"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    placeholder="Teléfono"
                />
            </Form.Group>
            <Form.Group controlId="formCelular">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                    type="text"
                    name="celular"
                    value={userData.celular}
                    onChange={handleChange}
                    placeholder="Celular"
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
            </Form.Group>
        </>
    );

    const renderDoctorForm = () => (
        <>
            {renderCommonFields()}
            <Form.Group controlId="formContrasenia">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="contrasenia"
                    value={userData.contrasenia}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />
            </Form.Group>
            <Form.Group controlId="formInstitucionVet1">
                <Form.Label>Institución Veterinaria 1</Form.Label>
                <Form.Control
                    type="number"
                    name="id_institucion_vet_1"
                    value={userData.id_institucion_vet_1}
                    onChange={handleChange}
                    placeholder="ID Institución Vet 1"
                />
            </Form.Group>
            <Form.Group controlId="formInstitucionVet2">
                <Form.Label>Institución Veterinaria 2</Form.Label>
                <Form.Control
                    type="number"
                    name="id_institucion_vet_2"
                    value={userData.id_institucion_vet_2}
                    onChange={handleChange}
                    placeholder="ID Institución Vet 2"
                />
            </Form.Group>
            <Form.Group controlId="formInstitucionVet3">
                <Form.Label>Institución Veterinaria 3</Form.Label>
                <Form.Control
                    type="number"
                    name="id_institucion_vet_3"
                    value={userData.id_institucion_vet_3}
                    onChange={handleChange}
                    placeholder="ID Institución Vet 3"
                />
            </Form.Group>
            <Form.Group controlId="formPais">
                <Form.Label>País</Form.Label>
                <Form.Control
                    type="number"
                    name="id_pais"
                    value={userData.id_pais}
                    onChange={handleChange}
                    placeholder="ID País"
                />
            </Form.Group>
            <Form.Group controlId="formMatricula">
                <Form.Label>Matrícula</Form.Label>
                <Form.Control
                    type="text"
                    name="matricula"
                    value={userData.matricula}
                    onChange={handleChange}
                    placeholder="Matrícula"
                />
            </Form.Group>
            <Form.Group controlId="formGenero">
                <Form.Label>Género</Form.Label>
                <Form.Control
                    type="number"
                    name="id_genero"
                    value={userData.id_genero}
                    onChange={handleChange}
                    placeholder="ID Género"
                />
            </Form.Group>
            <Form.Group controlId="formDiaNac">
                <Form.Label>Día de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="dia_nac"
                    value={userData.dia_nac}
                    onChange={handleChange}
                    placeholder="Día de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formMesNac">
                <Form.Label>Mes de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="mes_nac"
                    value={userData.mes_nac}
                    onChange={handleChange}
                    placeholder="Mes de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formAnioNac">
                <Form.Label>Año de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="anio_nac"
                    value={userData.anio_nac}
                    onChange={handleChange}
                    placeholder="Año de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formNacionalidad">
                <Form.Label>Nacionalidad</Form.Label>
                <Form.Control
                    type="number"
                    name="id_nacionalidad"
                    value={userData.id_nacionalidad}
                    onChange={handleChange}
                    placeholder="ID Nacionalidad"
                />
            </Form.Group>
            <Form.Group controlId="formEspecialidad1">
                <Form.Label>Especialidad 1</Form.Label>
                <Form.Control
                    type="number"
                    name="id_especialidad_1"
                    value={userData.id_especialidad_1}
                    onChange={handleChange}
                    placeholder="ID Especialidad 1"
                />
            </Form.Group>
            <Form.Group controlId="formEspecialidad2">
                <Form.Label>Especialidad 2</Form.Label>
                <Form.Control
                    type="number"
                    name="id_especialidad_2"
                    value={userData.id_especialidad_2}
                    onChange={handleChange}
                    placeholder="ID Especialidad 2"
                />
            </Form.Group>
            <Form.Group controlId="formEspecialidad3">
                <Form.Label>Especialidad 3</Form.Label>
                <Form.Control
                    type="number"
                    name="id_especialidad_3"
                    value={userData.id_especialidad_3}
                    onChange={handleChange}
                    placeholder="ID Especialidad 3"
                />
            </Form.Group>
            <Form.Group controlId="formResenia">
                <Form.Label>Reseña</Form.Label>
                <Form.Control
                    type="text"
                    name="resenia"
                    value={userData.resenia}
                    onChange={handleChange}
                    placeholder="Reseña"
                />
            </Form.Group>
            <Form.Group controlId="formReseniaConfirmada">
                <Form.Label>Reseña Confirmada</Form.Label>
                <Form.Control
                    type="text"
                    name="resenia_confirmada"
                    value={userData.resenia_confirmada}
                    onChange={handleChange}
                    placeholder="Reseña Confirmada"
                />
            </Form.Group>
            <Form.Group controlId="formEstadoMedicoVet">
                <Form.Label>Estado Médico Veterinario</Form.Label>
                <Form.Control
                    type="number"
                    name="id_estado_medico_vet"
                    value={userData.id_estado_medico_vet}
                    onChange={handleChange}
                    placeholder="ID Estado Médico Veterinario"
                />
            </Form.Group>
            <Form.Group controlId="formCodigoArea">
                <Form.Label>Código de Área</Form.Label>
                <Form.Control
                    type="text"
                    name="codigo_area"
                    value={userData.codigo_area}
                    onChange={handleChange}
                    placeholder="Código de Área"
                />
            </Form.Group>
            <Form.Group controlId="formRRSS1">
                <Form.Label>Red Social 1</Form.Label>
                <Form.Control
                    type="text"
                    name="RRSS1"
                    value={userData.RRSS1}
                    onChange={handleChange}
                    placeholder="Red Social 1"
                />
            </Form.Group>
            <Form.Group controlId="formRRSS2">
                <Form.Label>Red Social 2</Form.Label>
                <Form.Control
                    type="text"
                    name="RRSS2"
                    value={userData.RRSS2}
                    onChange={handleChange}
                    placeholder="Red Social 2"
                />
            </Form.Group>
            <Form.Group controlId="formAsistenteNom">
                <Form.Label>Nombre del Asistente</Form.Label>
                <Form.Control
                    type="text"
                    name="asistente_nom"
                    value={userData.asistente_nom}
                    onChange={handleChange}
                    placeholder="Nombre del Asistente"
                />
            </Form.Group>
            <Form.Group controlId="formAsistenteTelefono">
                <Form.Label>Teléfono del Asistente</Form.Label>
                <Form.Control
                    type="text"
                    name="asistente_telefono"
                    value={userData.asistente_telefono}
                    onChange={handleChange}
                    placeholder="Teléfono del Asistente"
                />
            </Form.Group>
            <Form.Group controlId="formAsistenteCodigoArea">
                <Form.Label>Código de Área del Asistente</Form.Label>
                <Form.Control
                    type="text"
                    name="asistente_codigo_area"
                    value={userData.asistente_codigo_area}
                    onChange={handleChange}
                    placeholder="Código de Área del Asistente"
                />
            </Form.Group>
            <Form.Group controlId="formAsistenteCelular">
                <Form.Label>Celular del Asistente</Form.Label>
                <Form.Control
                    type="text"
                    name="asistente_celular"
                    value={userData.asistente_celular}
                    onChange={handleChange}
                    placeholder="Celular del Asistente"
                />
            </Form.Group>
            <Form.Group controlId="formOtro">
                <Form.Label>Otro</Form.Label>
                <Form.Control
                    type="text"
                    name="otro"
                    value={userData.otro}
                    onChange={handleChange}
                    placeholder="Otro"
                />
            </Form.Group>
            <Form.Group controlId="formValidado">
                <Form.Check
                    type="checkbox"
                    name="validado"
                    checked={userData.validado}
                    onChange={(e) => setUserData({ ...userData, validado: e.target.checked })}
                    label="Validado"
                />
            </Form.Group>
        </>
    );

    const renderUsuarioForm = () => (
        <>
            {renderCommonFields()}
            <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="text"
                    name="direccion"
                    value={userData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                />
            </Form.Group>
            <Form.Group controlId="formNumero">
                <Form.Label>Número</Form.Label>
                <Form.Control
                    type="text"
                    name="numero"
                    value={userData.numero}
                    onChange={handleChange}
                    placeholder="Número"
                />
            </Form.Group>
            <Form.Group controlId="formTipoUsuario">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                    type="text"
                    name="tipo"
                    value={userData.tipo}
                    onChange={handleChange}
                    placeholder="Tipo"
                />
            </Form.Group>
            <Form.Group controlId="formCodigoPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                    type="number"
                    name="id_codigo_postal"
                    value={userData.id_codigo_postal}
                    onChange={handleChange}
                    placeholder="ID Código Postal"
                />
            </Form.Group>
            <Form.Group controlId="formComuna">
                <Form.Label>Comuna</Form.Label>
                <Form.Control
                    type="number"
                    name="id_comuna"
                    value={userData.id_comuna}
                    onChange={handleChange}
                    placeholder="ID Comuna"
                />
            </Form.Group>
            <Form.Group controlId="formProvincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                    type="number"
                    name="id_provincia"
                    value={userData.id_provincia}
                    onChange={handleChange}
                    placeholder="ID Provincia"
                />
            </Form.Group>
            <Form.Group controlId="formRegion">
                <Form.Label>Región</Form.Label>
                <Form.Control
                    type="number"
                    name="id_region"
                    value={userData.id_region}
                    onChange={handleChange}
                    placeholder="ID Región"
                />
            </Form.Group>
            <Form.Group controlId="formGeolocalizacion">
                <Form.Label>Geolocalización</Form.Label>
                <Form.Control
                    type="text"
                    name="geolocalizacion"
                    value={userData.geolocalizacion}
                    onChange={handleChange}
                    placeholder="Geolocalización"
                />
            </Form.Group>
            <Form.Group controlId="formZonaBDoc">
                <Form.Label>Zona BDoc</Form.Label>
                <Form.Control
                    type="number"
                    name="id_zona_BDoc"
                    value={userData.id_zona_BDoc}
                    onChange={handleChange}
                    placeholder="ID Zona BDoc"
                />
            </Form.Group>
            <Form.Group controlId="formOtro2">
                <Form.Label>Otro 2</Form.Label>
                <Form.Control
                    type="text"
                    name="otro2"
                    value={userData.otro2}
                    onChange={handleChange}
                    placeholder="Otro 2"
                />
            </Form.Group>
            <Form.Group controlId="formOtro3">
                <Form.Label>Otro 3</Form.Label>
                <Form.Control
                    type="text"
                    name="otro3"
                    value={userData.otro3}
                    onChange={handleChange}
                    placeholder="Otro 3"
                />
            </Form.Group>
        </>
    );

    const renderVeterinariaForm = () => (
        <>
            {renderCommonFields()}
            <Form.Group controlId="formContrasenia">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="contrasenia"
                    value={userData.contrasenia}
                    onChange={handleChange}
                    placeholder="Contraseña"
                />
            </Form.Group>
            <Form.Group controlId="formSegmento">
                <Form.Label>Segmento</Form.Label>
                <Form.Control
                    type="number"
                    name="id_segmento"
                    value={userData.id_segmento}
                    onChange={handleChange}
                    placeholder="ID Segmento"
                />
            </Form.Group>
            <Form.Group controlId="formTipoInstitucionVet">
                <Form.Label>Tipo de Institución Veterinaria</Form.Label>
                <Form.Control
                    type="number"
                    name="id_tipo_institucion_vet"
                    value={userData.id_tipo_institucion_vet}
                    onChange={handleChange}
                    placeholder="ID Tipo de Institución Veterinaria"
                />
            </Form.Group>
            <Form.Group controlId="formEstadoInstitucion">
                <Form.Label>Estado de la Institución</Form.Label>
                <Form.Control
                    type="number"
                    name="id_estado_institucion"
                    value={userData.id_estado_institucion}
                    onChange={handleChange}
                    placeholder="ID Estado de la Institución"
                />
            </Form.Group>
            <Form.Group controlId="formRazonSocial">
                <Form.Label>Razón Social</Form.Label>
                <Form.Control
                    type="text"
                    name="razon_social"
                    value={userData.razon_social}
                    onChange={handleChange}
                    placeholder="Razón Social"
                />
            </Form.Group>
            <Form.Group controlId="formNombreComercial">
                <Form.Label>Nombre Comercial</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre_comercial"
                    value={userData.nombre_comercial}
                    onChange={handleChange}
                    placeholder="Nombre Comercial"
                />
            </Form.Group>
            <Form.Group controlId="formNombre1RepLegal">
                <Form.Label>Nombre 1 Representante Legal</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre_1_rep_legal"
                    value={userData.nombre_1_rep_legal}
                    onChange={handleChange}
                    placeholder="Nombre 1 Representante Legal"
                />
            </Form.Group>
            <Form.Group controlId="formNombre2RepLegal">
                <Form.Label>Nombre 2 Representante Legal</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre_2_rep_legal"
                    value={userData.nombre_2_rep_legal}
                    onChange={handleChange}
                    placeholder="Nombre 2 Representante Legal"
                />
            </Form.Group>
            <Form.Group controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                    type="text"
                    name="direccion"
                    value={userData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                />
            </Form.Group>
            <Form.Group controlId="formNumero">
                <Form.Label>Número</Form.Label>
                <Form.Control
                    type="text"
                    name="numero"
                    value={userData.numero}
                    onChange={handleChange}
                    placeholder="Número"
                />
            </Form.Group>
            <Form.Group controlId="formCodigoPostal">
                <Form.Label>Código Postal</Form.Label>
                <Form.Control
                    type="number"
                    name="id_codigo_postal"
                    value={userData.id_codigo_postal}
                    onChange={handleChange}
                    placeholder="ID Código Postal"
                />
            </Form.Group>
            <Form.Group controlId="formComuna">
                <Form.Label>Comuna</Form.Label>
                <Form.Control
                    type="number"
                    name="id_comuna"
                    value={userData.id_comuna}
                    onChange={handleChange}
                    placeholder="ID Comuna"
                />
            </Form.Group>
            <Form.Group controlId="formProvincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Control
                    type="number"
                    name="id_provincia"
                    value={userData.id_provincia}
                    onChange={handleChange}
                    placeholder="ID Provincia"
                />
            </Form.Group>
            <Form.Group controlId="formRegion">
                <Form.Label>Región</Form.Label>
                <Form.Control
                    type="number"
                    name="id_region"
                    value={userData.id_region}
                    onChange={handleChange}
                    placeholder="ID Región"
                />
            </Form.Group>
            <Form.Group controlId="formGeolocalizacion">
                <Form.Label>Geolocalización</Form.Label>
                <Form.Control
                    type="text"
                    name="geolocalizacion"
                    value={userData.geolocalizacion}
                    onChange={handleChange}
                    placeholder="Geolocalización"
                />
            </Form.Group>
            <Form.Group controlId="formZonaBDoc">
                <Form.Label>Zona BDoc</Form.Label>
                <Form.Control
                    type="number"
                    name="id_zona_BDoc"
                    value={userData.id_zona_BDoc}
                    onChange={handleChange}
                    placeholder="ID Zona BDoc"
                />
            </Form.Group>
            <Form.Group controlId="formServicio">
                <Form.Label>Servicio</Form.Label>
                <Form.Control
                    type="number"
                    name="id_servicio"
                    value={userData.id_servicio}
                    onChange={handleChange}
                    placeholder="ID Servicio"
                />
            </Form.Group>
            <Form.Group controlId="formValidado">
                <Form.Check
                    type="checkbox"
                    name="validado"
                    checked={userData.validado}
                    onChange={(e) => setUserData({ ...userData, validado: e.target.checked })}
                    label="Validado"
                />
            </Form.Group>
        </>
    );

    const renderMascotaForm = () => (
        <>
            <Form.Group controlId="formCategoriaAnimal">
                <Form.Label>Categoría Animal</Form.Label>
                <Form.Control
                    type="number"
                    name="id_categoria_animal"
                    value={userData.id_categoria_animal}
                    onChange={handleChange}
                    placeholder="ID Categoría Animal"
                />
            </Form.Group>
            <Form.Group controlId="formEspecie">
                <Form.Label>Especie</Form.Label>
                <Form.Control
                    type="number"
                    name="id_especie"
                    value={userData.id_especie}
                    onChange={handleChange}
                    placeholder="ID Especie"
                />
            </Form.Group>
            <Form.Group controlId="formRaza">
                <Form.Label>Raza</Form.Label>
                <Form.Control
                    type="number"
                    name="id_raza"
                    value={userData.id_raza}
                    onChange={handleChange}
                    placeholder="ID Raza"
                />
            </Form.Group>
            <Form.Group controlId="formSexo">
                <Form.Label>Sexo</Form.Label>
                <Form.Control
                    type="number"
                    name="id_sexo"
                    value={userData.id_sexo}
                    onChange={handleChange}
                    placeholder="ID Sexo"
                />
            </Form.Group>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
            </Form.Group>
            <Form.Group controlId="formDiaNac">
                <Form.Label>Día de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="dia_nac"
                    value={userData.dia_nac}
                    onChange={handleChange}
                    placeholder="Día de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formMesNac">
                <Form.Label>Mes de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="mes_nac"
                    value={userData.mes_nac}
                    onChange={handleChange}
                    placeholder="Mes de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formAnioNac">
                <Form.Label>Año de Nacimiento</Form.Label>
                <Form.Control
                    type="number"
                    name="anio_nac"
                    value={userData.anio_nac}
                    onChange={handleChange}
                    placeholder="Año de Nacimiento"
                />
            </Form.Group>
            <Form.Group controlId="formHistorialConsulta">
                <Form.Label>Historial de Consulta</Form.Label>
                <Form.Control
                    type="text"
                    name="historial_consulta"
                    value={userData.historial_consulta}
                    onChange={handleChange}
                    placeholder="Historial de Consulta"
                />
            </Form.Group>
            <Form.Group controlId="formEstatura">
                <Form.Label>Estatura</Form.Label>
                <Form.Control
                    type="number"
                    name="estatura"
                    value={userData.estatura}
                    onChange={handleChange}
                    placeholder="Estatura"
                />
            </Form.Group>
            <Form.Group controlId="formColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                    type="text"
                    name="color"
                    value={userData.color}
                    onChange={handleChange}
                    placeholder="Color"
                />
            </Form.Group>
            <Form.Group controlId="formPeso">
                <Form.Label>Peso</Form.Label>
                <Form.Control
                    type="number"
                    name="peso"
                    value={userData.peso}
                    onChange={handleChange}
                    placeholder="Peso"
                />
            </Form.Group>
            <Form.Group controlId="formOtro">
                <Form.Label>Otro</Form.Label>
                <Form.Control
                    type="text"
                    name="otro"
                    value={userData.otro}
                    onChange={handleChange}
                    placeholder="Otro"
                />
            </Form.Group>
            <Form.Group controlId="formOtro2">
                <Form.Label>Otro 2</Form.Label>
                <Form.Control
                    type="text"
                    name="otro2"
                    value={userData.otro2}
                    onChange={handleChange}
                    placeholder="Otro 2"
                />
            </Form.Group>
        </>
    );

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTipo">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control as="select" name="tipo" value={userData.tipo} onChange={handleChange}>
                            <option value="">Seleccione un tipo</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Usuario">Usuario</option>
                            <option value="Veterinaria">Veterinaria</option>
                            <option value="Mascota">Mascota</option>
                        </Form.Control>
                    </Form.Group>
                    {userData.tipo === 'Doctor' && renderDoctorForm()}
                    {userData.tipo === 'Usuario' && renderUsuarioForm()}
                    {userData.tipo === 'Veterinaria' && renderVeterinariaForm()}
                    {userData.tipo === 'Mascota' && renderMascotaForm()}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    style={buttonConfirmStyle}
                    onMouseEnter={() => setHoverConfirm(true)}
                    onMouseLeave={() => setHoverConfirm(false)}
                    onClick={handleSaveUser}
                >
                    Guardar
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

export default AddUserModal;
