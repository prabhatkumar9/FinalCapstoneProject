package com.capstone.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.capstone.backend.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

}
