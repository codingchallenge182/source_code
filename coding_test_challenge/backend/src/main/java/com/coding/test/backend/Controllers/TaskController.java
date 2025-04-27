package com.coding.test.backend.Controllers;
import com.coding.test.backend.Controllers.Repositories.TaskRepository;
import com.coding.test.backend.models.TaskEntity;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000/")
@RestController
public class TaskController {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    @GetMapping("/api/task")
    public ResponseEntity<Iterable<TaskEntity>> getTasks() {
        try {
            Iterable<TaskEntity> tasks = taskRepository.findAll();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }


    @GetMapping("/api/task/{id}")
    public ResponseEntity<TaskEntity> getTask(@PathVariable int id) {
        return taskRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/api/task")
    public ResponseEntity<TaskEntity> createTask(@Valid @RequestBody TaskEntity task) {
        {
            try {
                taskRepository.save(task);
                return ResponseEntity.ok(task);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    }


    @PutMapping("/api/task/{id}")
    public ResponseEntity<TaskEntity> updateTask(@PathVariable int id, @RequestBody TaskEntity task) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTitle(task.getTitle());
                    existingTask.setDescription(task.getDescription());
                    existingTask.setDue_date(task.getDue_date());
                    existingTask.setStatus(task.getStatus());
                    taskRepository.save(existingTask);
                    return ResponseEntity.ok(existingTask);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }


    @DeleteMapping("/api/task/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable int id) {
        if (!taskRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            taskRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

