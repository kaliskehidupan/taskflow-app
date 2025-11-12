import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MyDay from "./pages/MyDay";
import Upcoming from "./pages/Upcoming";
import Projects from "./pages/Projects";
import Tags from "./pages/Tags";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MyDay />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
