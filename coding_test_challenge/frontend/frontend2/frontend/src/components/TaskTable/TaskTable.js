import React, {useEffect, useState} from "react";
import {getTask, createTask, deleteTask, updateTask, findTaskById} from "../../services/taskService";




const TaskTable = () => {

    const [tasks, setTasks] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [showForm, setShowForm] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [taskToUpdate, setTaskToUpdate] = useState(null);
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: ""
    });


    const STATUS_OPTIONS = [
        { value: "Not started", label: "Not Started" },
        { value: "In Progress", label: "In Progress" },
        { value: "Blocked", label: "Blocked" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Completed", label: "Completed" }
    ];

    const EMPTY_FORM_DATA = {
        title: '',
        description: '',
        due_date: '',
        status: ''
    };


    const createForm = () => {
        setShowForm(true);
        setFormData(EMPTY_FORM_DATA);
    };

    const openUpdateForm = (task) => {
        setTaskToUpdate(task);
        setFormData({
            title: task.title,
            description: task.description,
            due_date: task.due_date,
            status: task.status
        });
    };

    const closeUpdateForm = () => {
        setTaskToUpdate(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

// CRUD Backend Actions
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks((prev) => prev.filter((task) => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedTask = { id: taskToUpdate.id, ...formData };
            await updateTask(updatedTask);
            console.log("Successfully updated task");
            closeUpdateForm();
            loadData(); // refresh table after update
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const buildTask = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Task name is required";
        if (!formData.due_date) {
            newErrors.due_date = "Due date is required";
        } else {
            const selectedDate = new Date(formData.due_date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) newErrors.due_date = "Due date cannot be in the past";
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        try {
            await createTask(formData);
            console.log("Task created successfully");
            loadData();
            setFormData(EMPTY_FORM_DATA);
            setError({});
            setShowForm(false);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleSearch = async () => {
        try {
            const result = await findTaskById(searchId);
            setTasks([result]);
        } catch (error) {
            console.error("Unable to find task with id:", error);
            setTasks([]);
        }
    };

    const handleReset = async () => {
        const allTasks = await getTask();
        setTasks(allTasks);
    };

// Load data initially
    const loadData = async () => {
        try {
            const result = await getTask();
            setTasks(result);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
            <>
                <div className="container">

                    <button className="showAllTasksBtn" onClick={handleReset}>Show all tasks</button>
                    <div className="createTaskBtnContainer">
                        <button className="createTaskBtn" onClick={createForm}>Create Task</button>

                    </div>


                    <div className="searchBarContainer">
                        <input className="searchBar"
                            type="text"
                            placeholder="Enter Task ID"
                            value={searchId}
                            onChange={(event) => setSearchId(event.target.value)}
                        />
                        <button className="searchBtn" onClick={handleSearch}>Search</button>
                    </div>

                    <div>


                        {showForm && (
                            <div className="modal-overlay">
                                <div className="modal">
                                    <h2>Create Task</h2>
                                    <form onSubmit={buildTask}>
                                        <label>
                                            Task Name:
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {error.title && <p className="errorTxt">{error.title}</p> }
                                        <label>
                                            Description:
                                            <input
                                                type="text"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        <label>
                                            Due Date:
                                            <input
                                                type="date"
                                                name="due_date"
                                                value={formData.due_date || ''}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {error.due_date && <p className="errorTxt">{error.due_date}</p>}
                                        <div className="formBtns">
                                            <button type="submit">Submit</button>
                                            <button className="cancelBtn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        )}
                    </div>


                    <table className="taskTable">
                        <thead>
                        <tr className="taskTableRow">
                            <th>ID</th>
                            <th>Task Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>

                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.due_date}</td>
                                <td>{task.status}</td>
                                <td>
                                    <button className="deleteBtn" onClick={() => handleDelete(task.id)}>
                                        Delete task</button>
                                </td>
                                <td>
                                    <button className="updateBtn" onClick={() => openUpdateForm(task)}>
                                        Update Task
                                    </button>
                                </td>
                                <td>

                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {taskToUpdate && (
                        <div className="modal-overlay">
                        <div className="modal">
                            <h2>Update task {taskToUpdate.title}</h2>
                            <form onSubmit={handleUpdate}>
                                <label>
                                    Task Name:
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Due Date:
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={formData.due_date || ''}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <label>
                                    Status:
                                    <select
                                        name="status"
                                        value={formData.status || ""}
                                        onChange={handleInputChange}
                                    >
                                        {STATUS_OPTIONS.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <button className="submitBtn" type="submit">Submit</button>
                                <button className="cancelBtn" type="button" onClick={closeUpdateForm}>Cancel</button>
                            </form>
                        </div>
                        </div>

                    )}


                </div>
            </>
        );

}
export default TaskTable;