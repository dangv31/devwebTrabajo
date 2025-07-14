package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.OrderEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.RoleEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
}
