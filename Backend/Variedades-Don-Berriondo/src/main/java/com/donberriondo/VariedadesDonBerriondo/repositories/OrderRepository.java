package com.donberriondo.VariedadesDonBerriondo.repositories;

import com.donberriondo.VariedadesDonBerriondo.models.entities.OrderEntity;
import com.donberriondo.VariedadesDonBerriondo.models.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByUser(UserEntity user);
}
