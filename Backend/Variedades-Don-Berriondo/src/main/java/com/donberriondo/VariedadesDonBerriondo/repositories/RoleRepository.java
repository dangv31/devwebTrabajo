package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.RoleEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long> {
}
