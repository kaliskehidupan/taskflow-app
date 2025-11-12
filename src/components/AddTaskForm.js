import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, FormCheck } from "react-bootstrap";

function AddTaskForm({ onAddTask, selectedDate, disableDatePicker = false }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");
  const [taskDate, setTaskDate] = useState(selectedDate || new Date());

  // Sync taskDate with selectedDate from MyDay
  useEffect(() => {
    if (selectedDate) {
      setTaskDate(selectedDate);
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      priority,
      tags: tags.split(",").map((tag) => tag.trim()),
      urgent,
      subtasks,
      date: taskDate.toLocaleDateString("en-CA"), // Format: YYYY-MM-DD
      completed: false, // ✅ Tambahkan status selesai
    };

    onAddTask(newTask);
    resetForm();
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const resetForm = () => {
    setTitle("");
    setTags("");
    setUrgent(false);
    setSubtasks([]);
    setSubtaskInput("");
    setTaskDate(selectedDate || new Date());
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form mb-4">
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Control
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mt-2">
        <FormCheck
          type="checkbox"
          label="Urgent"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
        />
      </Form.Group>

      {!disableDatePicker && (
        <Form.Group className="mt-2">
          <DatePicker
            selected={taskDate}
            onChange={setTaskDate}
            className="form-control"
          />
        </Form.Group>
      )}

      <Form.Group className="mt-2">
        <Form.Control
          type="text"
          placeholder="Add sub-task..."
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
        />
        <Button variant="secondary" className="mt-2" onClick={handleAddSubtask}>
          Add
        </Button>
      </Form.Group>

      <Button type="submit" className="mt-3">
        Add Task
      </Button>
    </Form>
  );
}

export default AddTaskForm;
