package com.HubControl.Repo;

import com.HubControl.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByProductNameContainingIgnoreCaseOrSkuContainingIgnoreCase(String name, String sku);
}
