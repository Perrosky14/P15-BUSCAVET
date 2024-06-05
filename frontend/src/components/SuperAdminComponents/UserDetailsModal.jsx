import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DoctorService from '../../services/DoctorService';
import UsuarioService from '../../services/UsuarioService';
import VeterinariaService from '../../services/VeterinariaService';
import MascotaService from '../../services/MascotaService';
import ConfirmModal from './ConfirmModal'; // Asegúrate de que la ruta sea correcta

const UserDetailsModal = ({ showModal, handleClose, userDetails, isEditMode, reloadCurrentPage }) => {
    const [details, setDetails] = useState(userDetails);
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverDetails, setHoverDetails] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        setDetails(userDetails);
        setChangesMade(false);
    }, [userDetails]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
        setChangesMade(true);
    };

    const handleConfirmSave = () => {
        const idNumber = parseInt(details.id.match(/\d+/)[0], 10);
        switch (details.tipo) {
            case 'Doctor':
                DoctorService.updateDoctor(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        setChangesMade(false);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error updating the doctor!", error);
                    });
                break;
            case 'Usuario':
                UsuarioService.updateUsuario(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        setChangesMade(false);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error updating the usuario!", error);
                    });
                break;
            case 'Veterinaria':
                VeterinariaService.updateVeterinaria(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        setChangesMade(false);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error updating the veterinaria!", error);
                    });
                break;
            case 'Mascota':
                MascotaService.updateMascota(idNumber, details)
                    .then(response => {
                        console.log("Changes saved:", response.data);
                        setChangesMade(false);
                        handleClose();
                        reloadCurrentPage(); // Recargar la página actual sin reiniciar
                    })
                    .catch(error => {
                        console.error("There was an error updating the mascota!", error);
                    });
                break;
            default:
                console.error("Unknown user type:", details.tipo);
        }
    };

    const handleSave = () => {
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleConfirmModalSave = () => {
        handleConfirmSave();
        setShowConfirmModal(false);
    };

    const buttonCloseStyle = {
        backgroundColor: hoverClose ? '#e03a5e' : '#ff436f',
        borderColor: hoverClose ? '#e03a5e' : '#ff436f',
        color: 'white'
    };

    const buttonDetailsStyle = {
        backgroundColor: changesMade ? (hoverDetails ? '#4CAF50' : '#6EC732') : '#d3d3d3',
        borderColor: changesMade ? (hoverDetails ? '#4CAF50' : '#6EC732') : '#d3d3d3',
        color: 'white',
        cursor: changesMade ? 'pointer' : 'not-allowed'
    };

    const renderDoctorDetails = (details) => (
        <>
            <p><strong>Nombre 1:</strong> <input type="text" name="nombre1" value={details.nombre1}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Nombre 2:</strong> <input type="text" name="nombre2" value={details.nombre2}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 1:</strong> <input type="text" name="apellido1" value={details.apellido1}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 2:</strong> <input type="text" name="apellido2" value={details.apellido2}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>

            <p><strong>Contraseña:</strong> <input type="text" name="contrasenia" value={details.contrasenia}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Institución Vet 1:</strong> <input type="text" name="id_institucion_vet_1"
                                                             value={details.id_institucion_vet_1}
                                                             onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Institución Vet 2:</strong> <input type="text" name="id_institucion_vet_2"
                                                             value={details.id_institucion_vet_2}
                                                             onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Institución Vet 3:</strong> <input type="text" name="id_institucion_vet_3"
                                                             value={details.id_institucion_vet_3}
                                                             onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID País:</strong> <input type="text" name="id_pais" value={details.id_pais}
                                                onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>RUT:</strong> <input type="text" name="rut" value={details.rut} onChange={handleChange}
                                            disabled={!isEditMode}/></p>
            <p><strong>Matrícula:</strong> <input type="text" name="matricula" value={details.matricula}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Nombre 1:</strong> <input type="text" name="nombre1" value={details.nombre1}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Nombre 2:</strong> <input type="text" name="nombre2" value={details.nombre2}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 1:</strong> <input type="text" name="apellido1" value={details.apellido1}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 2:</strong> <input type="text" name="apellido2" value={details.apellido2}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Género:</strong> <input type="text" name="id_genero" value={details.id_genero}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Fecha de Nacimiento:</strong> <input type="text" name="fecha_nacimiento"
                                                            value={`${details.dia_nac}/${details.mes_nac}/${details.anio_nac}`}
                                                            onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Nacionalidad:</strong> <input type="text" name="id_nacionalidad"
                                                        value={details.id_nacionalidad} onChange={handleChange}
                                                        disabled={!isEditMode}/></p>
            <p><strong>ID Especialidad 1:</strong> <input type="text" name="id_especialidad_1"
                                                          value={details.id_especialidad_1} onChange={handleChange}
                                                          disabled={!isEditMode}/></p>
            <p><strong>ID Especialidad 2:</strong> <input type="text" name="id_especialidad_2"
                                                          value={details.id_especialidad_2} onChange={handleChange}
                                                          disabled={!isEditMode}/></p>
            <p><strong>ID Especialidad 3:</strong> <input type="text" name="id_especialidad_3"
                                                          value={details.id_especialidad_3} onChange={handleChange}
                                                          disabled={!isEditMode}/></p>
            <p><strong>Reseña:</strong> <input type="text" name="resenia" value={details.resenia}
                                               onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Reseña Confirmada:</strong> <input type="text" name="resenia_confirmada"
                                                          value={details.resenia_confirmada} onChange={handleChange}
                                                          disabled={!isEditMode}/></p>
            <p><strong>ID Estado Médico Vet:</strong> <input type="text" name="id_estado_medico_vet"
                                                             value={details.id_estado_medico_vet}
                                                             onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Teléfono:</strong> <input type="text" name="telefono" value={details.telefono}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Código de Área:</strong> <input type="text" name="codigo_area" value={details.codigo_area}
                                                       onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Celular:</strong> <input type="text" name="celular" value={details.celular}
                                                onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Convenio:</strong> <input type="text" name="id_convenio" value={details.id_convenio}
                                                    onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Email:</strong> <input type="text" name="email" value={details.email} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>RRSS1:</strong> <input type="text" name="RRSS1" value={details.rrss1} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>RRSS2:</strong> <input type="text" name="RRSS2" value={details.rrss2} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>Asistente Nombre:</strong> <input type="text" name="asistente_nom" value={details.asistente_nom}
                                                         onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Asistente Teléfono:</strong> <input type="text" name="asistente_telefono"
                                                           value={details.asistente_telefono} onChange={handleChange}
                                                           disabled={!isEditMode}/></p>
            <p><strong>Asistente Código de Área:</strong> <input type="text" name="asistente_codigo_area"
                                                                 value={details.asistente_codigo_area}
                                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Asistente Celular:</strong> <input type="text" name="asistente_celular"
                                                          value={details.asistente_celular} onChange={handleChange}
                                                          disabled={!isEditMode}/></p>
            <p><strong>Otro:</strong> <input type="text" name="otro" value={details.otro} onChange={handleChange}
                                             disabled={!isEditMode}/></p>
            <p><strong>Validado:</strong> {details.validado ? 'Sí' : 'No'}</p>
        </>
    );

    const renderUsuarioDetails = (details) => (
        <>
            <p><strong>Nombre 1:</strong> <input type="text" name="nombre1" value={details.nombre1}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Nombre 2:</strong> <input type="text" name="nombre2" value={details.nombre2}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 1:</strong> <input type="text" name="apellido1" value={details.apellido1}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 2:</strong> <input type="text" name="apellido2" value={details.apellido2}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Contraseña:</strong> <input type="text" name="contrasenia" value={details.contrasenia}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID País:</strong> <input type="text" name="id_pais" value={details.id_pais}
                                                onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>RUT:</strong> <input type="text" name="rut" value={details.rut} onChange={handleChange}
                                            disabled={!isEditMode}/></p>
            <p><strong>Nombre 1:</strong> <input type="text" name="nombre1" value={details.nombre1}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Nombre 2:</strong> <input type="text" name="nombre2" value={details.nombre2}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 1:</strong> <input type="text" name="apellido1" value={details.apellido1}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Apellido 2:</strong> <input type="text" name="apellido2" value={details.apellido2}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Género:</strong> <input type="text" name="id_genero" value={details.id_genero}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Fecha de Nacimiento:</strong> <input type="text" name="fecha_nacimiento"
                                                            value={`${details.dia_nac}/${details.mes_nac}/${details.anio_nac}`}
                                                            onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Nacionalidad:</strong> <input type="text" name="id_nacionalidad"
                                                        value={details.id_nacionalidad} onChange={handleChange}
                                                        disabled={!isEditMode}/></p>
            <p><strong>Otro:</strong> <input type="text" name="otro" value={details.otro} onChange={handleChange}
                                             disabled={!isEditMode}/></p>
            <p><strong>Dirección:</strong> <input type="text" name="direccion" value={details.direccion}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Número:</strong> <input type="text" name="numero" value={details.numero} onChange={handleChange}
                                               disabled={!isEditMode}/></p>
            <p><strong>Tipo:</strong> <input type="text" name="tipo" value={details.tipo} onChange={handleChange}
                                             disabled={!isEditMode}/></p>
            <p><strong>ID Código Postal:</strong> <input type="text" name="id_codigo_postal"
                                                         value={details.id_codigo_postal} onChange={handleChange}
                                                         disabled={!isEditMode}/></p>
            <p><strong>ID Comuna:</strong> <input type="text" name="id_comuna" value={details.id_comuna}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Provincia:</strong> <input type="text" name="id_provincia" value={details.id_provincia}
                                                     onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Región:</strong> <input type="text" name="id_region" value={details.id_region}
                                                  onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Geolocalización:</strong> <input type="text" name="geolocalizacion"
                                                        value={details.geolocalizacion} onChange={handleChange}
                                                        disabled={!isEditMode}/></p>
            <p><strong>ID Zona BDoc:</strong> <input type="text" name="id_zona_BDoc" value={details.id_zona_BDoc}
                                                     onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Otro 2:</strong> <input type="text" name="otro2" value={details.otro2} onChange={handleChange}
                                               disabled={!isEditMode}/></p>
            <p><strong>Teléfono:</strong> <input type="text" name="telefono" value={details.telefono}
                                                 onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Código de Área:</strong> <input type="text" name="codigo_area" value={details.codigo_area}
                                                       onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Celular:</strong> <input type="text" name="celular" value={details.celular}
                                                onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>Email:</strong> <input type="text" name="email" value={details.email} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>RRSS1:</strong> <input type="text" name="RRSS1" value={details.rrss1} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>RRSS2:</strong> <input type="text" name="RRSS2" value={details.rrss2} onChange={handleChange}
                                              disabled={!isEditMode}/></p>
            <p><strong>Otro 3:</strong> <input type="text" name="otro3" value={details.otro3} onChange={handleChange}
                                               disabled={!isEditMode}/></p>
        </>
    );

    const renderVeterinariaDetails = (details) => (
        <>
            <p><strong>Contraseña:</strong> <input type="text" name="contrasenia" value={details.contrasenia}
                                                   onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID País:</strong> <input type="text" name="id_pais" value={details.id_pais}
                                                onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Segmento:</strong> <input type="text" name="id_segmento" value={details.id_segmento}
                                                    onChange={handleChange} disabled={!isEditMode}/></p>
            <p><strong>ID Tipo Institución Vet:</strong> <input type="text" name="id_tipo_institucion_vet" value={details.id_tipo_institucion_vet} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Estado Institución:</strong> <input type="text" name="id_estado_institucion" value={details.id_estado_institucion} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>RUT:</strong> <input type="text" name="rut" value={details.rut} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Razón Social:</strong> <input type="text" name="razon_social" value={details.razon_social} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Nombre Comercial:</strong> <input type="text" name="nombre_comercial" value={details.nombre_comercial} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Nombre Representante Legal 1:</strong> <input type="text" name="nombre_1_rep_legal" value={details.nombre_1_rep_legal} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Nombre Representante Legal 2:</strong> <input type="text" name="nombre_2_rep_legal" value={details.nombre_2_rep_legal} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Reseña:</strong> <input type="text" name="resenia" value={details.resenia} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Reseña Confirmada:</strong> <input type="text" name="resenia_confirmada" value={details.resenia_confirmada} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Dirección:</strong> <input type="text" name="direccion" value={details.direccion} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Número:</strong> <input type="text" name="numero" value={details.numero} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Tipo:</strong> <input type="text" name="tipo" value={details.tipo} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Teléfono:</strong> <input type="text" name="telefono" value={details.telefono} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Código de Área:</strong> <input type="text" name="codigo_area" value={details.codigo_area} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Celular:</strong> <input type="text" name="celular" value={details.celular} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Código Postal:</strong> <input type="text" name="id_codigo_postal" value={details.id_codigo_postal} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Comuna:</strong> <input type="text" name="id_comuna" value={details.id_comuna} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Provincia:</strong> <input type="text" name="id_provincia" value={details.id_provincia} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Región:</strong> <input type="text" name="id_region" value={details.id_region} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Geolocalización:</strong> <input type="text" name="geolocalizacion" value={details.geolocalizacion} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Zona BDoc:</strong> <input type="text" name="id_zona_BDoc" value={details.id_zona_BDoc} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Servicio:</strong> <input type="text" name="id_servicio" value={details.id_servicio} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Validado:</strong> {details.validado ? 'Sí' : 'No'}</p>
        </>
    );

    const renderMascotaDetails = (details) => (
        <>
            <p><strong>ID Categoría Animal:</strong> <input type="text" name="id_categoria_animal" value={details.id_categoria_animal} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Especie:</strong> <input type="text" name="id_especie" value={details.id_especie} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Raza:</strong> <input type="text" name="id_raza" value={details.id_raza} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Sexo:</strong> <input type="text" name="id_sexo" value={details.id_sexo} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Nombre:</strong> <input type="text" name="nombre" value={details.nombre} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Fecha de Nacimiento:</strong> <input type="text" name="fecha_nacimiento" value={`${details.dia_nac}/${details.mes_nac}/${details.anio_nac}`} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Otro:</strong> <input type="text" name="otro" value={details.otro} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Historial de Consulta:</strong> <input type="text" name="historial_consulta" value={details.historial_consulta} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Estatura:</strong> <input type="text" name="estatura" value={details.estatura} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Color:</strong> <input type="text" name="color" value={details.color} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Peso:</strong> <input type="text" name="peso" value={details.peso} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>Otro 2:</strong> <input type="text" name="otro2" value={details.otro2} onChange={handleChange} disabled={!isEditMode} /></p>
            <p><strong>ID Usuario Asociado:</strong> {details.usuario ? details.usuario.id : 'Sin Dueño'}</p>
        </>
    );

    return (
        <>
            <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Detalles del Usuario</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={handleClose}
                                aria-label="Close"
                                style={{ position: 'absolute', right: '15px', top: '15px' }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                            <p><strong>ID:</strong> {details.id} </p>
                            <p><strong>Nombre Completo:</strong> {details.name}</p>
                            <p><strong>Tipo:</strong> {details.tipo}</p>
                            {details.tipo === 'Doctor' && renderDoctorDetails(details)}
                            {details.tipo === 'Usuario' && renderUsuarioDetails(details)}
                            {details.tipo === 'Veterinaria' && renderVeterinariaDetails(details)}
                            {details.tipo === 'Mascota' && renderMascotaDetails(details)}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={changesMade ? handleSave : null}
                                style={buttonDetailsStyle}
                                onMouseEnter={() => changesMade && setHoverDetails(true)}
                                onMouseLeave={() => changesMade && setHoverDetails(false)}
                                disabled={!changesMade}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                                style={buttonCloseStyle}
                                onMouseEnter={() => setHoverClose(true)}
                                onMouseLeave={() => setHoverClose(false)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={showConfirmModal}
                handleClose={handleCloseConfirmModal}
                handleConfirm={handleConfirmModalSave}
                message="¿Está seguro que desea guardar los cambios realizados?"
            />
        </>
    );
};

export default UserDetailsModal;
