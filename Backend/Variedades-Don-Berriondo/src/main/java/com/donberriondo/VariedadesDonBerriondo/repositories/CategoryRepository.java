package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {
}
