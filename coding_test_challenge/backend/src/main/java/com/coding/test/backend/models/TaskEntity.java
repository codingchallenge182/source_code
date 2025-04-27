package com.coding.test.backend.models;
import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name="task")
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", columnDefinition = "VARCHAR(255)")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "due_date", columnDefinition = "DATE")
    private Date due_date;

    @Column(name = "status", columnDefinition = "TEXT")
    private String status = "Not Started";

    public TaskEntity(String testTask, String testDescription, String date, String pending) {}

    public TaskEntity() {}

    public TaskEntity(String title) {
        this.title = title;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getDue_date() { return due_date; }
    public void setDue_date(Date due_date) { this.due_date = due_date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
