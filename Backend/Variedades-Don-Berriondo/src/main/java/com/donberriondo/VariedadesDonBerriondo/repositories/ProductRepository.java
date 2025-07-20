package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.CategoryEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Optional<ProductEntity> findByName(String name);
    boolean existsByCategory(CategoryEntity category);
}
