package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.BloqueHorarioEntity;
import com.example.BUSCAVET.Entities.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloqueHorarioRepository extends JpaRepository<BloqueHorarioEntity, Long> {

    BloqueHorarioEntity findByDoctor(DoctorEntity doctor);
}
