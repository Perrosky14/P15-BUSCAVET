package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.MascotaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface MascotaRepository extends  JpaRepository<MascotaEntity, String> {
}
