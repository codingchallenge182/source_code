import React from "react";
import TaskTable from "../components/TaskTable/TaskTable"

export default function TaskViewPage() {
    return (<div className="task-view-container">
            <h1>Your Tasks</h1>
            <TaskTable />
        </div>
    );
}