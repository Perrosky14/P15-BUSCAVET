package com.example.BUSCAVET.Services;

import com.example.BUSCAVET.Entities.*;
import com.example.BUSCAVET.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Service
public class BloqueHoraService {

    @Autowired
    BloqueHoraRepository bloqueHoraRepository;

    @Autowired
    BloqueHorarioRepository bloqueHorarioRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    MascotaRepository mascotaRepository;

    public void guardarBloqueHora(BloqueHoraEntity bloqueHora) {
        bloqueHoraRepository.save(bloqueHora);
    }

    public ArrayList<BloqueHoraEntity> obtenerBloquesHoras() {
        return (ArrayList<BloqueHoraEntity>) bloqueHoraRepository.findAll();
    }

    public BloqueHoraEntity obtenerPorId(Long id) {
        return bloqueHoraRepository.findById(id).orElse(null);
    }

    public ArrayList<BloqueHoraEntity> obtenerPorUsuario(Long idUsuario) {
        UsuarioEntity usuario = usuarioRepository.findById(idUsuario).orElse(null);
        if (usuario != null) {
            return bloqueHoraRepository.findAllByUsuario(usuario);
        }
        return null;
    }

    public ArrayList<BloqueHoraEntity> obtenerPorVeterinario(Long idVeterinario) {
        DoctorEntity veterinario = doctorRepository.findById(idVeterinario).orElse(null);
        if (veterinario != null) {
            return bloqueHoraRepository.findAllByDoctor(veterinario);
        }
        return null;
    }

    public ArrayList<BloqueHoraEntity> obtenerPorMascota(Long idMascota) {
        MascotaEntity mascota = mascotaRepository.findById(idMascota).orElse(null);
        if (mascota != null) {
            return bloqueHoraRepository.findAllByMascota(mascota);
        }
        return null;
    }

    public BloqueHoraEntity actualizarBloqueHora(Long id, Map<String, Object> bloqueHoraData) {
        BloqueHoraEntity bloqueHoraExistente= bloqueHoraRepository.findById(id).orElse(null);
        if (bloqueHoraExistente != null) {
            transformarBloqueHora(bloqueHoraExistente, bloqueHoraData);
            return bloqueHoraRepository.save(bloqueHoraExistente);
        }
        return null;
    }

    public void agendarBloqueHora(Long idBloqueHora, String motivo, UsuarioEntity usuario, MascotaEntity mascota) {
        BloqueHoraEntity bloqueHora = bloqueHoraRepository.findById(idBloqueHora).orElse(null);
        if (bloqueHora != null) {
            bloqueHora.setMotivo(motivo);
            bloqueHora.setAgendadoPorUsuario(Boolean.TRUE);
            bloqueHora.setUsuario(usuario);
            bloqueHora.setMascota(mascota);
            bloqueHoraRepository.save(bloqueHora);
        }
    }

    public void transformarBloqueHora(BloqueHoraEntity bloqueHoraExistente, Map<String, Object> bloqueHoraData) {

        if (bloqueHoraData.containsKey("idCentro")) {
            bloqueHoraExistente.setIdCentro((Integer) bloqueHoraData.get("idCentro"));
        }
        if (bloqueHoraData.containsKey("motivo")) {
            bloqueHoraExistente.setMotivo((String) bloqueHoraData.get("motivo"));
        }
        if (bloqueHoraData.containsKey("activo")) {
            bloqueHoraExistente.setActivo((Boolean) bloqueHoraData.get("activo"));
        }
        if (bloqueHoraData.containsKey("tomadoTemporal")) {
            bloqueHoraExistente.setTomadoTemporal((Boolean) bloqueHoraData.get("tomadoTemporal"));
        }
        if (bloqueHoraData.containsKey("agendadoPorUsuario")) {
            bloqueHoraExistente.setAgendadoPorUsuario((Boolean) bloqueHoraData.get("agendadoPorUsuario"));
        }
        if (bloqueHoraData.containsKey("fecha")) {
            bloqueHoraExistente.setFecha(LocalDate.parse((String) bloqueHoraData.get("fecha")));
        }
        if (bloqueHoraData.containsKey("tiempoAtencion")) {
            bloqueHoraExistente.setTiempoAtencion(LocalTime.parse((String) bloqueHoraData.get("tiempoAtencion")));
        }
        if (bloqueHoraData.containsKey("horaInicio")) {
            bloqueHoraExistente.setHoraInicio(LocalTime.parse((String) bloqueHoraData.get("horaInicio")));
        }
        if (bloqueHoraData.containsKey("bloqueoTemporal")) {
            bloqueHoraExistente.setBloqueoTemporal(LocalTime.parse((String) bloqueHoraData.get("bloqueoTemporal")));
        }
        if (bloqueHoraData.containsKey("usuario")) {
            bloqueHoraExistente.setUsuario((UsuarioEntity) bloqueHoraData.get("usuario"));
        }
        if (bloqueHoraData.containsKey("mascota")) {
            bloqueHoraExistente.setMascota((MascotaEntity) bloqueHoraData.get("mascota"));
        }
        if (bloqueHoraData.containsKey("doctor")) {
            bloqueHoraExistente.setDoctor((DoctorEntity) bloqueHoraData.get("doctor"));
        }
    }

    public void crearBloquesHoraInicial(DoctorEntity veterinario, BloqueHorarioEntity bloqueHorario) {
        Integer cantBloques = bloqueHorario.getCantidadBloquesPorDia();
        LocalTime horaInicio = bloqueHorario.getHoraInicio();
        LocalTime tiempoAtencion = bloqueHorario.getTiempoBloques();
        LocalTime tiempoPausas = bloqueHorario.getTiempoPausas();
        LocalDate fechaActual = LocalDate.now().plusDays(1);//Calculamos un dia posterior de la inicializacion de los bloques hora.


        IntStream.range(0, 28).parallel().forEach(d -> {//Calcula por un mes aprox (28 dias)
            LocalDate fechaDia = fechaActual.plusDays(d);
            LocalTime tiempoIterado = horaInicio;
            for (int x = 0; x < cantBloques; x++) {//Crea los bloques del dia
                crearBloqueHora(veterinario,fechaDia, tiempoAtencion, tiempoIterado);
                tiempoIterado = tiempoIterado.plusHours(tiempoAtencion.getHour()).plusMinutes(tiempoAtencion.getMinute());//Suma el tiempo de atencion del bloque creado.
                tiempoIterado = tiempoIterado.plusHours(tiempoPausas.getHour()).plusMinutes(tiempoPausas.getMinute());//Suma el tiempo de desncaso entre los bloques.
            }
        });
    }

    @Scheduled(cron = "0 0 0 * * ?", zone = "America/Santiago")
    public void crearBloquesHoraParaDoctores() {
        System.out.println("El método crearBloquesHoraParaDoctores se está ejecutando...");
        List<DoctorEntity> doctores = doctorRepository.findAll();
        doctores.parallelStream().forEach(doctor -> {
            BloqueHorarioEntity bloqueHorario = bloqueHorarioRepository.findByDoctor(doctor);
            //Pregunta si estan propiedades de los bloques de hora lo que significa que ya ha inicializado anteriormente.
            if (bloqueHorario != null) {
                LocalDate ultimaFecha = obtenerUltimaFechaBloqueHoraDoctor(doctor);
                LocalDate fechaHoy = LocalDate.now();
                Long diasDiferencia = Math.abs(ChronoUnit.DAYS.between(ultimaFecha, fechaHoy));

                if (diasDiferencia < 15 || bloquesHorasTomados(doctor)) {
                    Integer cantBloques = bloqueHorario.getCantidadBloquesPorDia();
                    LocalTime horaInicio = bloqueHorario.getHoraInicio();
                    LocalTime tiempoAtencion = bloqueHorario.getTiempoBloques();
                    LocalTime tiempoPausas = bloqueHorario.getTiempoPausas();

                    LocalDate nuevaFecha = ultimaFecha.plusDays(1);//Toma la última fecha de los bloques hora existentes y suma un dia para no asginar la fecha que ya tienen los bloques de la ultima fecha.

                    IntStream.range(0, 28).parallel().forEach(d -> {//Calcula por un mes aprox (28 dias)
                        LocalDate fechaDia = nuevaFecha.plusDays(d);
                        LocalTime tiempoIterado = horaInicio;

                        for (int x = 0; x < cantBloques; x++) {//Crea los bloques del dia
                            crearBloqueHora(doctor, fechaDia, tiempoAtencion, tiempoIterado);
                            tiempoIterado = tiempoIterado.plusHours(tiempoAtencion.getHour()).plusMinutes(tiempoAtencion.getMinute());//Suma el tiempo de atencion del bloque creado.
                            tiempoIterado = tiempoIterado.plusHours(tiempoPausas.getHour()).plusMinutes(tiempoPausas.getMinute());//Suma el tiempo de desncaso entre los bloques.
                        }
                    });
                }
            }
        });
    }

    public void crearBloqueHora(DoctorEntity veterinario, LocalDate fecha, LocalTime tiempoAtencion, LocalTime horaInicio) {
        BloqueHoraEntity bloqueHora = new BloqueHoraEntity();
        bloqueHora.setDoctor(veterinario);
        bloqueHora.setFecha(fecha);
        bloqueHora.setTiempoAtencion(tiempoAtencion);
        bloqueHora.setHoraInicio(horaInicio);
        bloqueHora.setActivo(false);
        bloqueHora.setAgendadoPorUsuario(false);
        bloqueHora.setTomadoTemporal(false);
        bloqueHora.setBloqueoTemporal(LocalTime.of(0,5,0));
        bloqueHora.setAgendadoPorUsuario(false);
        bloqueHora.setIdCentro(0);
        bloqueHora.setMotivo("");
        bloqueHoraRepository.save(bloqueHora);
    }

    //Metodo que es para comprobar que no les queda bloques de hora disponibles.
    public Boolean bloquesHorasTomados(DoctorEntity doctor) {
        ArrayList<BloqueHoraEntity> bloquesHora = bloqueHoraRepository.findAllByDoctor(doctor);

        for (BloqueHoraEntity bloqueHora: bloquesHora) {
            //Pregunta si el bloque de hora iterado no esta agendado.
            if (!bloqueHora.getAgendadoPorUsuario()) {
                return false;
            }
        }
        return true;
    }

    public LocalDate obtenerUltimaFechaBloqueHoraDoctor(DoctorEntity doctor) {
        ArrayList<BloqueHoraEntity> bloquesHora = bloqueHoraRepository.findAllByDoctor(doctor);
        LocalDate ultimaFecha = null;

        for (BloqueHoraEntity bloqueHora: bloquesHora) {
            if (ultimaFecha == null || bloqueHora.getFecha().isAfter(ultimaFecha)) {
                ultimaFecha = bloqueHora.getFecha();
            }
        }

        return ultimaFecha;
    }

    public void eliminarBloquehora(Long id) {
        bloqueHoraRepository.deleteById(id);
    }

}
