package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends  JpaRepository<DoctorEntity, Long> {

    Optional<DoctorEntity> findByEmail(@Param("email") String email);

}
