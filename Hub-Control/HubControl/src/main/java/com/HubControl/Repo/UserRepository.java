package com.HubControl.Repo;

import com.HubControl.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    @Query("SELECT COUNT(u) FROM User u JOIN u.stores s WHERE s.storeId = :storeId AND u.role.roleId = 3")
    int countTotalPickersByStore(@Param("storeId") int storeId);

    // Count only ACTIVE users with Role ID = 3 (Picker) assigned to a specific Store
    @Query("SELECT COUNT(u) FROM User u JOIN u.stores s WHERE s.storeId = :storeId AND u.role.roleId = 3 AND u.isActive = true")
    int countActivePickersByStore(@Param("storeId") int storeId);

    @Query(value = "SELECT u.* FROM users u " +
            "JOIN user_stores us ON u.user_id = us.user_id " +
            "JOIN roles r ON u.role_id = r.role_id " +
            "WHERE us.store_id = :storeId AND r.role_name = 'PICKER'", nativeQuery = true)
    List<User> findPickersByStoreId(@Param("storeId") int storeId);

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.isActive = :isActive WHERE u.userId = :pickerId")
    int updateActiveStatus(@Param("pickerId") int pickerId, @Param("isActive") boolean isActive);
}
