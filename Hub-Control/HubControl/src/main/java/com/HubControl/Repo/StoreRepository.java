package com.HubControl.Repo;

import com.HubControl.Entity.Store;
import com.HubControl.dto.StoreUnderManagementDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Integer> {

    // Spring Data JPA automatically generates the query based on method name
    // It traverses from Store -> users list -> userId field
    //    List<Store> findByUsers_UserId(int userId);

    @Query("SELECT new com.HubControl.dto.StoreUnderManagementDTO(s.storeId, s.storeName) " +
            "FROM Store s JOIN s.users u WHERE u.userId = :userId")
    List<StoreUnderManagementDTO> findStoreSummariesByUserId(@Param("userId") int userId);


}
