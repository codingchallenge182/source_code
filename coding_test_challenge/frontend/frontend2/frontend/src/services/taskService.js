import axios from "axios";

const baseUrl = "http://localhost:8080/api/task" || process.env.REACT_APP_API_URL

export const getTask = async () => {

    try {
        const result = await axios.get(baseUrl);
        console.log(result)
        return result.data;
    } catch (error) {
        console.error("Error loading tasks:", error)
        throw error;
    }
};

export const deleteTask= async  (id) => {
    try {
        const result = await axios.delete(`${baseUrl}/${id}`);
        console.log("Deleting task with id: " + id);
        return result.data;
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const result = await axios.post(baseUrl, taskData);
        console.log(result.data)
        return result;
    } catch (error) {
        console.error("Error creating task: ", error);
        throw error;
    }
};

export const updateTask = async (taskData) => {
    try {
        const result = await axios.put(`${baseUrl}/${taskData.id}`, taskData);
        return result.data;
    } catch (error) {
        console.error("Error updating task", error);
        throw error;
    }
};

export const findTaskById = async (id) => {
    try {
        const result = await axios.get(`${baseUrl}/${id}`)
        console.log("Getting taskId:" ,id);
        return result.data;
    } catch (error) {
        console.error("Unable to find taskId", id);
        throw error;
    }

};

export const loadStatus = async () => {

}