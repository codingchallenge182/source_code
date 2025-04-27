package com.coding.test.backend.unitTests;
import com.coding.test.backend.Controllers.TaskController;
import com.coding.test.backend.Controllers.Repositories.TaskRepository;
import com.coding.test.backend.models.TaskEntity;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TaskControllerTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskController taskController;

    @Test
    void getTasks_returnsAllTasks() {
        List<TaskEntity> tasks = Arrays.asList(
                new TaskEntity("Test Title", "This is a description", "01/03/2025", "Not Started"),
                new TaskEntity("Fix bug", "Fix this bug ", "25/12/2025", "Not Started")
        );
        when(taskRepository.findAll()).thenReturn(tasks);

        ResponseEntity<Iterable<TaskEntity>> result = taskController.getTasks();

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);

        assertThat(result.getBody()).isSameAs(tasks);
    }

    @Test
    void createTask_returnsCreatedTask() {
        TaskEntity task = new TaskEntity("Fix this bug 182", "This is a description", "29/04/2025", "Not Started");
        when(taskRepository.save(task)).thenReturn(task);

        ResponseEntity<TaskEntity> result = taskController.createTask(task);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody()).isEqualTo(task);
    }

    @Test
    void updateTask_returnsUpdatedTask() {
        TaskEntity existingTask = new TaskEntity("Old Title", "This is a description", "01/03/2025", "Not Started");
        TaskEntity updatedTask = new TaskEntity("New Title", "New description", "01/03/2025", "Not Started");

        when(taskRepository.findById(1)).thenReturn(Optional.of(existingTask));
        when(taskRepository.save(existingTask)).thenReturn(updatedTask);

        ResponseEntity<TaskEntity> result = taskController.updateTask(1, updatedTask);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody().getTitle()).isEqualTo(updatedTask.getTitle());
        assertThat(result.getBody().getDescription()).isEqualTo(updatedTask.getDescription());
    }

    @Test
    void updateTask_whenDoesNotExist_returnsNotFound() {
        TaskEntity updatedTask = new TaskEntity("New Title", "New description", "01/03/2025", "Not Started");
        when(taskRepository.findById(99)).thenReturn(Optional.empty());
        ResponseEntity<TaskEntity> result = taskController.updateTask(99, updatedTask);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void getTask_whenDoesNotExist_returnsNotFound() {
        when (taskRepository.findById(99)).thenReturn(Optional.empty());

        ResponseEntity<TaskEntity> result = taskController.getTask(99);

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }

    @Test
    void deleteTask_deletesTaskSuccessfully() {
        when(taskRepository.existsById(1)).thenReturn(true);
        ResponseEntity<Void> result = taskController.deleteTask(1);

        verify(taskRepository).deleteById(1);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
    }
}
