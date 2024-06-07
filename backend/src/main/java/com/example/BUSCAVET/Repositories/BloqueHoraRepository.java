package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.BloqueHoraEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BloqueHoraRepository extends JpaRepository<BloqueHoraEntity, Long> {

    ArrayList<BloqueHoraEntity> findAllByUsuario(UsuarioEntity usuario);

    ArrayList<BloqueHoraEntity> findAllByDoctor(DoctorEntity doctor);

    ArrayList<BloqueHoraEntity> findAllByMascota(MascotaEntity mascota);

}
