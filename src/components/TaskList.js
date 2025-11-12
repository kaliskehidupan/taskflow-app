import React from "react";
import { Button, Form } from "react-bootstrap";

function TaskList({ tasks, onToggleComplete, onDelete, onEdit }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-card mb-3 p-2 border rounded">
            {/* Checklist untuk selesai */}
            <Form.Check
              type="checkbox"
              label={task.title}
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />

            <p className="mb-1">Priority: {task.priority}</p>
            <p className="mb-1">Tags: {task.tags.join(", ")}</p>
            <p className="mb-1">Date: {task.date}</p>
            {task.urgent && <span className="badge bg-danger">Urgent</span>}

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <ul className="mt-2">
                {task.subtasks.map((sub, i) => (
                  <li key={i}>{sub}</li>
                ))}
              </ul>
            )}

            {/* Tombol aksi */}
            <div className="mt-2">
              <Button
                size="sm"
                variant="outline-primary"
                className="me-2"
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
