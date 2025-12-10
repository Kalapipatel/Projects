package com.HubControl.Repo;

import com.HubControl.Entity.PickStatus;
import com.HubControl.Entity.PickingTask;
import com.HubControl.Entity.PickingTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PickingTaskRepository extends JpaRepository<PickingTask, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE PickingTask p SET p.taskStatus = :status WHERE p.taskId = :taskId")
    int updateTaskStatus(@Param("taskId") int taskId, @Param("status") PickingTaskStatus status);

}
