package Repositories;

import Entities.SuperAdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface SuperAdminRepository extends  JpaRepository<SuperAdminEntity, String>{
}
