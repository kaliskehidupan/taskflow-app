import React, { useState, useEffect } from "react";
import CalendarWidget from "../components/CalendarWidget";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

function MyDay() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Format tanggal yang dipilih
  const selectedISO = selectedDate.toLocaleDateString("en-CA");

  // Filter tugas sesuai tanggal yang dipilih
  const filteredTasks = tasks.filter((task) => task.date === selectedISO);

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
      <h2>My Day</h2>
      <CalendarWidget selectedDate={selectedDate} onChange={setSelectedDate} />
      <AddTaskForm
        selectedDate={selectedDate}
        onAddTask={handleAddTask}
        disableDatePicker={true} // ⛔️ Nonaktifkan input tanggal manual
      />
      <TaskList
        tasks={filteredTasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default MyDay;
