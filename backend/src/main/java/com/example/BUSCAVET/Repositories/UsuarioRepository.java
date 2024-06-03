package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long>{

    @Query(value = "select e from UsuarioEntity e where e.nombre1 = nombre1", nativeQuery = true)
    UsuarioEntity findByNameCustomQuery(@Param("nombre1") String nombre1);

    Optional<UsuarioEntity> findByEmail(String email);

}
