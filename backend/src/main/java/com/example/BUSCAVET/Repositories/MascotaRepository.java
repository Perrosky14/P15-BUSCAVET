package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.MascotaEntity;
import com.example.BUSCAVET.Entities.UsuarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface MascotaRepository extends  JpaRepository<MascotaEntity, Long> {

    ArrayList<MascotaEntity> findAllByUsuario(UsuarioEntity usuario);
}
