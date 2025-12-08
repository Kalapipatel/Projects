package com.HubControl.Repo;

import com.HubControl.Entity.PickStatus;
import com.HubControl.Entity.PickingTaskItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PickingTaskItemRepository extends JpaRepository<PickingTaskItem, Integer> {

    List<PickingTaskItem> findByPickingTask_TaskId(Integer taskId);

    @Modifying
    @Transactional
    @Query("UPDATE PickingTaskItem p SET p.pickStatus = :status WHERE p.taskItemId = :taskItemId")
    public int updatePickStatus(@Param("taskItemId") int taskItemId, @Param("status") PickStatus status);
}
