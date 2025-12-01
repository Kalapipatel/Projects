package com.HubControl.Repo;

import com.HubControl.Entity.PickingTaskItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickingTaskItemRepository extends JpaRepository<PickingTaskItem, Integer> {
}
