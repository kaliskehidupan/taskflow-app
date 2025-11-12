import React from "react";
import { Card } from "react-bootstrap";

function FocusMode({ task, onBack }) {
  if (!task) return <p>Pilih tugas untuk fokus</p>;

  return (
    <div className="focus-mode">
      <div className="focus-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h2>Focus Mode</h2>
      </div>
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.subtask}</Card.Text>
          <Card.Text>
            <strong>Prioritas:</strong> {task.priority}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FocusMode;
