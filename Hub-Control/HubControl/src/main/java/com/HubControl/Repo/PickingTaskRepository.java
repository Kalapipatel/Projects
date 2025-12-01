package com.HubControl.Repo;

import com.HubControl.Entity.PickingTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickingTaskRepository extends JpaRepository<PickingTask, Integer> {
}
