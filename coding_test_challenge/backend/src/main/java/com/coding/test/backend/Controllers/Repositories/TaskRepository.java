package com.coding.test.backend.Controllers.Repositories;

import org.springframework.data.repository.CrudRepository;
import com.coding.test.backend.models.TaskEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<TaskEntity, Integer> {


}
