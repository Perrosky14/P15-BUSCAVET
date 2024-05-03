package com.example.BUSCAVET.Repositories;

import com.example.BUSCAVET.Entities.SuperAdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SuperAdminRepository extends  JpaRepository<SuperAdminEntity, Long>{
}
