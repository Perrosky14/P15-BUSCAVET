package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.SuperAdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuperAdminRepository extends  JpaRepository<SuperAdminEntity, Long>{

    Optional<SuperAdminEntity> findByEmail(@Param("email") String email);

}
