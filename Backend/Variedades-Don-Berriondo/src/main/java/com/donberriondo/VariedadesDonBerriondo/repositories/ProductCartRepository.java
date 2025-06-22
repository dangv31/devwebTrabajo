package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductCartEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCartRepository extends CrudRepository<ProductCartEntity, Long> {
}
