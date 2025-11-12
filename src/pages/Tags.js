import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";

function Tags() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const allTags = [...new Set(tasks.flatMap((t) => t.tags))];
  const [selectedTag, setSelectedTag] = useState(allTags[0] || "");

  const filteredTasks = tasks.filter((t) => t.tags.includes(selectedTag));

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
      <h2>Tags</h2>
      {allTags.length > 0 ? (
        <>
          <select
            className="form-select mb-3"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <p className="text-muted">Belum ada tag yang tersedia.</p>
      )}
    </div>
  );
}

export default Tags;
