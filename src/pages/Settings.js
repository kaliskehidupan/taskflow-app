import React from "react";

function Settings() {
  const handleReset = () => {
    if (window.confirm("Yakin ingin menghapus semua tugas?")) {
      localStorage.removeItem("tasks");
      window.location.reload();
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <button className="btn btn-danger mt-3" onClick={handleReset}>
        🔄 Reset Semua Tugas
      </button>
    </div>
  );
}

export default Settings;
