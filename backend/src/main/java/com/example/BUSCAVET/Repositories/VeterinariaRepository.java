package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.VeterinariaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VeterinariaRepository extends  JpaRepository<VeterinariaEntity, String> {

}
