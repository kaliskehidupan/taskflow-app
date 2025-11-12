import React, { useState, useEffect } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

function Upcoming() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Ambil tanggal hari ini dalam format YYYY-MM-DD
  const todayISO = new Date().toLocaleDateString("en-CA");

  // Filter tugas yang tanggalnya lebih besar dari hari ini
  const upcomingTasks = tasks.filter((task) => task.date > todayISO);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    saveTasks(updatedTasks);
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    saveTasks(updatedTasks);
  };

  const handleEdit = (editedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === editedTask.id ? editedTask : t
    );
    saveTasks(updatedTasks);
  };

  return (
    <div className="container-fluid page-wrapper">
      <h2>Upcoming Tasks</h2>
      {/* Tetap tampilkan date picker di Upcoming */}
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={upcomingTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Upcoming;
