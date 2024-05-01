package Repositories;

import Entities.VeterinariaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface VeterinariaRepository extends  JpaRepository<VeterinariaEntity, String> {

}
