import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";

function Projects() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Urutkan semua tugas berdasarkan tanggal
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Kelompokkan berdasarkan prioritas
  const groupedByPriority = {
    High: [],
    Medium: [],
    Low: [],
  };

  sortedTasks.forEach((task) => {
    if (groupedByPriority[task.priority]) {
      groupedByPriority[task.priority].push(task);
    }
  });

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updated);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveTasks(updated);
  };

  const handleEdit = (editedTask) => {
    const updated = tasks.map((t) => (t.id === editedTask.id ? editedTask : t));
    saveTasks(updated);
  };

  return (
    <div className="container-fluid page-wrapper">
      <h2>Tasks by Priority</h2>

      {["High", "Medium", "Low"].map((level) => (
        <div key={level} className="mb-4">
          <h4>{level} Priority</h4>
          {groupedByPriority[level].length > 0 ? (
            <TaskList
              tasks={groupedByPriority[level]}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Projects;
