package com.HubControl.Repo;

import com.HubControl.Entity.PickStatus;
import com.HubControl.Entity.PickingTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PickingTaskRepository extends JpaRepository<PickingTask, Integer> {


}
